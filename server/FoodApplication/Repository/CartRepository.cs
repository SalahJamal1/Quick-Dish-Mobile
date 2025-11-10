using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace FoodApplication.Repository;

public class CartRepository : GenericRepository<Cart>, IICartRepository
{
    private readonly FoodDBContext _context;

    public CartRepository(FoodDBContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Cart> GetCartDetails(int id)
    {
        var cart = await _context?.Carts?.Include(c => c.Item)?.SingleOrDefaultAsync(c => c.Id == id);

        if (cart == null) throw new AppErrorResponse($"{nameof(Cart)} with ID {id} not found.");
        return cart;
    }

    public async Task<List<Cart>> GetCartsDetails()
    {
        return await _context.Carts.Include(c => c.Item).ToListAsync();
    }
}