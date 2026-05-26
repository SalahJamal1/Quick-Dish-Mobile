using System.IO;
using FoodApplication.Data;
using Microsoft.EntityFrameworkCore;

public static class DbSeeder
{
    public static void Seed(FoodDBContext context)
    {
        var sql = File.ReadAllText("Data/seeds/Items.sql");

        context.Database.ExecuteSqlRaw(sql);
    }
}