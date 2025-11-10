namespace FoodApplication.Models.Users;

public class AuthResponse
{
    public string Token { get; set; }
    public UserDto User { get; set; }
}