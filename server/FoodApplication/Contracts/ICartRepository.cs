using FoodApplication.Data;

namespace FoodApplication.Contracts;

public interface IICartRepository : IGenericRepository<Cart>
{
    Task<Cart> GetCartDetails(int id);
    Task<List<Cart>> GetCartsDetails();
}