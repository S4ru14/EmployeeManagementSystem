using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EmployeesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/employees
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    // GET: api/employees/1
    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return employee;
    }

    // POST: api/employees
    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
    {
        // Check if EmployeeCode already exists (case-insensitive match)
        var existingEmployee = await _context.Employees
            .AnyAsync(e => e.EmployeeCode.ToLower() == employee.EmployeeCode.ToLower());

        if (existingEmployee)
        {
            return Conflict(new
            {
                message = "Employee code already exists."
            });
        }

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetEmployee),
            new { id = employee.Id },
            employee);
    }

    // PUT: api/employees/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(
        int id,
        Employee employee)
    {
        if (id != employee.Id)
        {
            return BadRequest();
        }

        var existingEmployee = await _context.Employees.FindAsync(id);

        if (existingEmployee == null)
        {
            return NotFound();
        }

        // Check if EmployeeCode is already used by another employee (case-insensitive match)
        var duplicateEmployeeCode = await _context.Employees
            .AnyAsync(e =>
                e.EmployeeCode.ToLower() == employee.EmployeeCode.ToLower() &&
                e.Id != id);

        if (duplicateEmployeeCode)
        {
            return Conflict(new
            {
                message = "Employee code already exists."
            });
        }

        existingEmployee.EmployeeCode = employee.EmployeeCode;
        existingEmployee.FirstName = employee.FirstName;
        existingEmployee.LastName = employee.LastName;
        existingEmployee.Email = employee.Email;
        existingEmployee.Department = employee.Department;
        existingEmployee.Position = employee.Position;
        existingEmployee.Salary = employee.Salary;
        existingEmployee.DateHired = employee.DateHired;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/employees/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}