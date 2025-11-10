using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using FoodApplication.Models.Orders;

namespace FoodApplication.Data;

public class Order
{
    public int Id { get; set; }
    public ICollection<Cart> Carts { get; set; } = new List<Cart>();
    public float OrderPrice { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Status Status { get; set; } = Status.Pending;

    public DateTime EstimatedDelivery { get; set; } = DateTime.Now.AddMinutes(15);
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? ActualDelivery { get; set; }

    [ForeignKey(nameof(ApiUserId))] public string? ApiUserId { get; set; }
}