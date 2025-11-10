using FoodApplication.Data;

namespace FoodApplication.Contracts;

public interface IItemRepository : IGenericRepository<Item>
{
    Task<IList<Item>> GetItemByCatagory(string catagory);
}