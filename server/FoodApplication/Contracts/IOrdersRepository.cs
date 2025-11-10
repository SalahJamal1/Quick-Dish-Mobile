using FoodApplication.Data;

namespace FoodApplication.Contracts;

public interface IOrdersRepository : IGenericRepository<Order>
{
    Task<List<Order>> GetAllDetails();
    Task<Order> GetDetails(int id);
}