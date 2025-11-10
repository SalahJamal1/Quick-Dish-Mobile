using AutoMapper;
using FoodApplication.Contracts;
using FoodApplication.Data;
using FoodApplication.Exceptions;
using FoodApplication.Models.Items;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodApplication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IItemRepository _repository;

    public ItemsController(IItemRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems([FromQuery] string? catagory)
    {
        if (!string.IsNullOrEmpty(catagory))
            return Ok(await _repository.GetItemByCatagory(catagory));
        return Ok(await _repository.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItem(int id)
    {
        return Ok(await _repository.GetAsync(id));
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateItem(int id, [FromBody] ItemBase itemBase)
    {
        var item = await _repository.GetAsync(id);
        _mapper.Map(itemBase, item);
        try
        {
            await _repository.UpdateAsync(item);
        }
        catch (Exception e)
        {
            throw new AppErrorResponse(e.Message);
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteItem(int id)
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
    public async Task<ActionResult<Item>> CreateItem([FromBody] ItemBase itemBase)
    {
        var item = _mapper.Map<Item>(itemBase);
        try
        {
            await _repository.AddAsync(item);
        }
        catch (Exception e)
        {
            throw new AppErrorResponse(e.Message);
        }

        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }
}