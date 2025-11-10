using FoodApplication.Models.Items;

namespace FoodApplication.Models.Carts;

public class CartDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public ItemDto Item { get; set; }
}