using FoodApplication.Models.Carts;

namespace FoodApplication.Models.Orders;

public class OrderDto
{
    public int Id { get; set; }
    public ICollection<CartDto> Carts { get; set; } = new List<CartDto>();
    public float OrderPrice { get; set; }
    public Status Status { get; set; }
    public DateTime EstimatedDelivery { get; set; } = DateTime.Now.AddMinutes(15);
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? ActualDelivery { get; set; }
}