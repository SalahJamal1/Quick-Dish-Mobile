using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using FoodApplication.Models.Orders;
using Microsoft.EntityFrameworkCore;

namespace FoodApplication.Repository;

public class OrdersRepository : GenericRepository<Order>, IOrdersRepository
{
    private readonly FoodDBContext _context;

    public OrdersRepository(FoodDBContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Order>> GetAllDetails()
    {
        var orders = await _context.Orders.Include(o => o.Carts)
            .ThenInclude(c => c.Item).ToListAsync();

        foreach (var order in orders)
            if (order.ActualDelivery == null && DateTime.UtcNow >= order.EstimatedDelivery)
            {
                order.ActualDelivery = order.EstimatedDelivery.AddMinutes(3);
                order.Status = Status.Delivered;
                _context.Update(order);
            }


        await _context.SaveChangesAsync();
        return orders;
    }

    public async Task<Order> GetDetails(int id)
    {
        var order = await _context.Orders.Include(o => o.Carts).ThenInclude(c => c.Item)
            .SingleOrDefaultAsync(o => o.Id == id);
        if (order == null) throw new AppErrorResponse($"Order with id {id} not found");
        if (order.ActualDelivery == null && DateTime.Now >= order.EstimatedDelivery)
        {
            order.ActualDelivery = order.EstimatedDelivery.AddMinutes(3);
            order.Status = Status.Delivered;
            _context.Update(order);
            await _context.SaveChangesAsync();
        }

        return order;
    }
}