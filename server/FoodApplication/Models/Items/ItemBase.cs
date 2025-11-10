namespace FoodApplication.Models.Items;

public class ItemBase
{
    public string name { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
    public float UnitPrice { get; set; }
    public string Catagory { get; set; }
}