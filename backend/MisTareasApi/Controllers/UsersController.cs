using Microsoft.AspNetCore.Mvc;
using MisTareasApi.Data;
using MisTareasApi.Models;
using System.Linq;

namespace MisTareasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/users/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest("El correo ya está registrado.");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuario registrado exitosamente.");
        }

        // POST: api/users/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginData)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginData.Email && u.Password == loginData.Password);

            if (user == null)
                return Unauthorized("Credenciales inválidas.");

            return Ok(new { user.Id, user.Email });
        }
    }
}
