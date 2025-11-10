using AutoMapper;
using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using FoodApplication.Models.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IAuthManager _authManager;
    private readonly IMapper _mapper;
    private readonly IOrdersRepository _repository;

    public OrdersController(IOrdersRepository repository, IMapper mapper, IAuthManager authManager)
    {
        _repository = repository;
        _mapper = mapper;
        _authManager = authManager;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrderss()
    {
        var orders = await _repository.GetAllDetails();
        var ordersDto = _mapper.Map<List<OrderDto>>(orders);
        return Ok(ordersDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrders(int id)
    {
        var orders = await _repository.GetDetails(id);
        var ordersDto = _mapper.Map<OrderDto>(orders);
        return Ok(ordersDto);
    }


    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteOrders(int id)
    {
        try
        {
            await _repository.DeleteAsync(id);
        }
        catch (Exception e)
        {
            throw new AppErrorResponse(e.Message);
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Order>> CreateOrders([FromBody] OrderBase ordersBase)
    {
        var orders = _mapper.Map<Order>(ordersBase);
        
        var user = await _authManager.GetUser();
        orders.ApiUserId = user.Id;
        try
        {
            await _repository.AddAsync(orders);
        }
        catch (Exception e)
        {
            throw new AppErrorResponse(e.Message);
        }

        return CreatedAtAction(nameof(GetOrders), new { id = orders.Id }, orders);
    }
}