using Microsoft.AspNetCore.Mvc;
using MisTareasApi.Data;
using MisTareasApi.Models;
using System.Linq;

namespace MisTareasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks/user/5  -> Obtener tareas del usuario con Id = 5
        [HttpGet("user/{userId}")]
        public IActionResult GetTasksByUser(int userId)
        {
            var tasks = _context.Tasks.Where(t => t.UserId == userId).ToList();
            return Ok(tasks);
        }

        // POST: api/tasks  -> Crear tarea nueva
        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskItem task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return Ok(task);
        }

        // PUT: api/tasks/3  -> Actualizar tarea con Id = 3
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound("Tarea no encontrada");

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.IsCompleted = updatedTask.IsCompleted;

            _context.SaveChanges();
            return Ok(task);
        }

        // DELETE: api/tasks/3  -> Eliminar tarea con Id = 3
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound("Tarea no encontrada");

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return Ok("Tarea eliminada");
        }
    }
}
