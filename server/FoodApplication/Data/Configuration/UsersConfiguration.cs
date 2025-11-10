using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FoodApplication.Data.Configuration;

public class UsersConfiguration : IEntityTypeConfiguration<ApiUser>
{
    public void Configure(EntityTypeBuilder<ApiUser> builder)
    {
        builder.HasIndex(u => u.Email).IsUnique();
        builder.HasIndex(u => u.PhoneNumber).IsUnique();
        
    }
}