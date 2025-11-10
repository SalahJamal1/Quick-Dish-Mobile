using FoodApplication.Contracts;
using FoodApplication.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodApplication.Repository;

public class ItemRepository : GenericRepository<Item>, IItemRepository
{
    private readonly FoodDBContext _context;

    public ItemRepository(FoodDBContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IList<Item>> GetItemByCatagory(string catagory)
    {
        var items = await _context.Set<Item>()
            .Where(i => i.Catagory.Equals(catagory)).ToListAsync();
        return items;
    }
}