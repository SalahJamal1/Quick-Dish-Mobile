using FoodApplication.Data.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodApplication.Data;

public class FoodDBContext : IdentityDbContext<ApiUser>
{
    public FoodDBContext(DbContextOptions options) : base(options)
    {
    }

    private DbSet<ApiUser> Users { get; set; }
    private DbSet<Item> Items { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new RolesConfiguration());
        builder.ApplyConfiguration(new UsersConfiguration());
        // builder.Entity<Order>().Property(o=>o.Status).HasConversion<string>();
    }
}