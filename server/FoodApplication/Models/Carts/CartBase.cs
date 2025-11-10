
namespace FoodApplication.Models.Carts;

public class CartBase
{
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public int ItemId { get; set; }
}