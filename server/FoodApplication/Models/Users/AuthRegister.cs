using System.ComponentModel.DataAnnotations;

namespace FoodApplication.Models.Users;

public class AuthRegister
{
    [Required] public string FirstName { get; set; }

    [Required] public string LastName { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }
    [Required] public string Address { get; set; }
    [Required] public string PhoneNumber { get; set; }

    [Required]
    [MaxLength(16, ErrorMessage = "Password must not exceed 16 characters")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; }

    [Required]
    [MaxLength(16, ErrorMessage = "Password must not exceed 16 characters")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string PasswordConfirm { get; set; }
}