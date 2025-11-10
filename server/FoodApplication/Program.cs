using System.Text;
using FoodApplication.Configuration;
using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using FoodApplication.Middleware;
using FoodApplication.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var connectionString = builder.Configuration.GetConnectionString("connectionStrings");
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<FoodDBContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddIdentityCore<ApiUser>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
    })
    .AddRoles<IdentityRole>().AddEntityFrameworkStores<FoodDBContext>();
builder.Services.AddCors(options => options
    .AddPolicy("AllowAll", b => b
        .AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddControllers();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = ctx =>
        {
            var auth = ctx.Request.Headers["Authorization"].FirstOrDefault();
            if (auth != null && auth.StartsWith("Bearer "))
            {
                ctx.Token = auth.Substring(7);
            }
            else
            {
                var cookie = ctx.Request.Cookies["jwt"];
                if (cookie != null) ctx.Token = cookie;
            }

            return Task.CompletedTask;
        },
        OnChallenge = ctx =>
        {
            ctx.Response.ContentType = "application/json";
            ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
            var errorDetails = new ErrorDetails
            {
                ErrorType = "Unauthorized",
                ErrorMessage = "you are not authorized to access this resource"
            };
            var errors = JsonConvert.SerializeObject(errorDetails);
            ctx.Response.WriteAsync(errors);
            return Task.CompletedTask;
        },
        OnForbidden = ctx =>
        {
            ctx.Response.ContentType = "application/json";
            ctx.Response.StatusCode = StatusCodes.Status403Forbidden;
            var errorDetails = new ErrorDetails
            {
                ErrorType = "Forbidden",
                ErrorMessage = "you are not authorized to access this resource"
            };
            var errors = JsonConvert.SerializeObject(errorDetails);
            ctx.Response.WriteAsync(errors);
            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Host.UseSerilog((ctx, lc) =>
    lc.WriteTo.Console().ReadFrom.Configuration(ctx.Configuration));

builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IICartRepository, CartRepository>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseSerilogRequestLogging();

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404 && !context.Response.HasStarted)
    {
        
    context.Response.ContentType = "application/json";
    var errorDetails = new ErrorDetails
    {
        ErrorType = "Not Found",
        ErrorMessage = $"We could not find resource {context.Request.Path}"
    };
    var errors = JsonConvert.SerializeObject(errorDetails);
    await context.Response.WriteAsync(errors);
    }
});

app.MapControllers();
app.Urls.Clear();
app.Urls.Add("http://0.0.0.0:5288");

app.Run();