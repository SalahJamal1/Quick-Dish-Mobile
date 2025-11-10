using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace FoodApplication.Repository;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly FoodDBContext _context;

    public GenericRepository(FoodDBContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetAsync(int id)
    {
        var entity = await _context.Set<T>().FindAsync(id);
        if (entity == null)
            throw new AppErrorResponse($"{typeof(T).Name} with ID {id} not found.");

        return entity;
    }

    public async Task<T> AddAsync(T entity)
    {
        _context.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetAsync(id);
        _context.Remove(entity);
        await _context.SaveChangesAsync();
    }
}