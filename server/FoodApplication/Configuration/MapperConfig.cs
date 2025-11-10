using AutoMapper;
using FoodApplication.Data;
using FoodApplication.Models.Carts;
using FoodApplication.Models.Items;
using FoodApplication.Models.Orders;
using FoodApplication.Models.Users;

namespace FoodApplication.Configuration;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<ApiUser, UserDto>().ReverseMap();
        CreateMap<ApiUser, AuthRegister>().ReverseMap();
        CreateMap<Item, ItemBase>().ReverseMap();
        CreateMap<Item, ItemDto>().ReverseMap();
        CreateMap<Cart, CartBase>().ReverseMap();
        CreateMap<Cart, CartDto>().ReverseMap();
        CreateMap<Order, OrderDto>().ReverseMap();
        CreateMap<Order, OrderBase>().ReverseMap();
    }
}