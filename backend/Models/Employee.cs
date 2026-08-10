using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Employee
{
    public int Id { get; set; }

    [Required]
    public string EmployeeCode { get; set; } = string.Empty;

    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public string Position { get; set; } = string.Empty;

    public decimal Salary { get; set; }

    public DateTime DateHired { get; set; }
}