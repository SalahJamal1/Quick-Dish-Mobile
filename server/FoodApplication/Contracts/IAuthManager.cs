using FoodApplication.Models.Users;
using Microsoft.AspNetCore.Identity;

namespace FoodApplication.Contracts;

public interface IAuthManager
{
    Task<IEnumerable<IdentityError>> Register(AuthRegister authRegister);
    Task<AuthResponse> Login(AuthLogin authLogin);
    Task<string> Logout();
    Task<UserDto> GetUser();
}