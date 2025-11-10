using FoodApplication.Contracts;
using FoodApplication.Exceptions;
using FoodApplication.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthManager _authManager;

    public AuthController(IAuthManager authManager)

    {
        _authManager = authManager;
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthLogin authLogin)
    {
        var response = await _authManager.Login(authLogin);
        if (response == null) throw new AppErrorResponse("The email or password is incorrect");
        return response;
    }

    [HttpPost("signup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> SignUp([FromBody] AuthRegister authRegister)
    {
        var errors = await _authManager.Register(authRegister);
        if (errors.Any())
        {

            foreach (var error in errors)
            {
            throw new AppErrorResponse(error.Description);
            
            }
        }

        return Ok("You have been registered successfully.");
    }

    [HttpGet("logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public async Task<ActionResult<string>> Logout()
    {
        var res = await _authManager.Logout();

        return Ok(res);
    }

    [HttpGet("me")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetMe()
    {
        var res = await _authManager.GetUser();
        return Ok(res);
    }
}