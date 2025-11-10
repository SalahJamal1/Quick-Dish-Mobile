using System.ComponentModel.DataAnnotations;

namespace FoodApplication.Models.Users;

public class AuthLogin
{
    [Required][EmailAddress] public string Email { get; set; }
    [Required] public string Password { get; set; }
}