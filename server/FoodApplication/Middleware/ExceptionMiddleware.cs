using System.Net;
using FoodApplication.Exceptions;
using Newtonsoft.Json;

namespace FoodApplication.Middleware;

public class ExceptionMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Something went wrong: {context.Request.Path}");
            await HandleException(context, e);
        }
    }

    private async Task HandleException(HttpContext context, Exception e)
    {
        context.Response.ContentType = "application/json";
        var statusCode = HttpStatusCode.InternalServerError;
        var errorDetails = new ErrorDetails
        {
            ErrorType = "failure",
            ErrorMessage = e.Message
        };
        switch (e)
        {
            case AppErrorResponse appErrorResponse:
                statusCode = HttpStatusCode.BadRequest;
                errorDetails.ErrorMessage = appErrorResponse.Message;
                break;
        }

        var errors = JsonConvert.SerializeObject(errorDetails);
        context.Response.StatusCode = (int)statusCode;
        await context.Response.WriteAsync(errors);
    }
}