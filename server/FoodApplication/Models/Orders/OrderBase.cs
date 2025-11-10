using FoodApplication.Models.Carts;

namespace FoodApplication.Models.Orders;

public class OrderBase
{
    public ICollection<CartBase> Carts { get; set; } = new List<CartBase>();
    public float OrderPrice { get; set; }
    public DateTime EstimatedDelivery { get; set; } = DateTime.Now.AddMinutes(15);
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? ActualDelivery { get; set; }
}