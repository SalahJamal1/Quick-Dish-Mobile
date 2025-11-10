using Microsoft.AspNetCore.Identity;

namespace FoodApplication.Data;

public class ApiUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}