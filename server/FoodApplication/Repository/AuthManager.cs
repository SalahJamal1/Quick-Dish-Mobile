using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Models.Orders;
using FoodApplication.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FoodApplication.Repository;

public class AuthManager : IAuthManager
{
    private readonly IConfiguration _configuration;
    private readonly FoodDBContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    private readonly UserManager<ApiUser> _userManager;

    public AuthManager(UserManager<ApiUser> userManager, IConfiguration configuration,
        IHttpContextAccessor httpContextAccessor, IMapper mapper, FoodDBContext dbContext
    )
    {
        _userManager = userManager;
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
        _dbContext = dbContext;
    }

    private HttpContext _context => _httpContextAccessor.HttpContext;

    public async Task<IEnumerable<IdentityError>> Register(AuthRegister authRegister)
    {
        var user = _mapper.Map<ApiUser>(authRegister);
        user.UserName = authRegister.Email;
        var result = await _userManager.CreateAsync(user, authRegister.Password);
        Console.WriteLine(result.Errors);

        if (result.Succeeded) await _userManager.AddToRoleAsync(user, "user");
        return result.Errors;
    }

    public async Task<AuthResponse> Login(AuthLogin authLogin)
    {
        var user = await _userManager.FindByEmailAsync(authLogin.Email);
        if (user == null) return null;
        var isValidPassword = await _userManager.CheckPasswordAsync(user, authLogin.Password);
        if (!isValidPassword) return null;
        var token = await GenerateToken(user);
        setCookie(token);
        var roles = await _userManager.GetRolesAsync(user);

        var userDto = _mapper.Map<UserDto>(user);
        userDto.Role = roles.FirstOrDefault();
        var authResponse = new AuthResponse
        {
            Token = token,
            User = userDto
        };
        return authResponse;
    }

    public Task<string> Logout()
    {
        _context.Response.Cookies.Delete("jwt");
        return Task.FromResult("You have been logged out.");
    }

    public async Task<UserDto> GetUser()
    {
        var userId = _context?.User?.Claims?.FirstOrDefault(c => c.Type == "uid")?.Value;
        var user = await _dbContext.Users.Include(u => u.Orders)
            .ThenInclude(c => c.Carts).ThenInclude(c => c.Item).FirstOrDefaultAsync(u => u.Id == userId);

        var userDto = _mapper.Map<UserDto>(user);
        if (user.Orders != null && user.Orders.Any())
        {
            foreach (var order in user.Orders)
                if (order.EstimatedDelivery < DateTime.Now)
                {
                    order.ActualDelivery = DateTime.Now;
                    order.Status = Status.Delivered;
                    _dbContext.Update(order);
                }

            await _dbContext.SaveChangesAsync();
        }


        userDto.Order = _mapper.Map<ICollection<OrderDto>>(user.Orders);
        var roles = await _userManager.GetRolesAsync(user);
        userDto.Role = roles.FirstOrDefault();

        return userDto;
    }

    public async Task<string> GenerateToken(ApiUser user)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var roles = await _userManager.GetRolesAsync(user);
        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
        var userClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("uid", user.Id)
        }.Union(roleClaims).Union(userClaims);
        var token = new JwtSecurityToken(
            expires: DateTime.UtcNow.AddDays(90),
            claims: claims,
            signingCredentials: signinCredentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public void setCookie(string token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(90),
            Path = "/",
            SameSite = SameSiteMode.None,
            Secure = true
        };
        _context.Response.Cookies.Append("jwt", token, cookieOptions);
    }
}