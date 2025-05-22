import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: Task[] = [];
  userId!: number;

  nuevaTarea: Partial<Task> = {
    title: '',
    description: '',
    isCompleted: false
  };

  editandoTareaId: number | null = null;

  // NUEVO: mensaje para feedback visual
  mensaje: string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = +id;
      this.cargarTareas();
    } else {
      alert('No se encontró usuario logueado');
    }
  }

  cargarTareas(): void {
    this.api.getTasks(this.userId).subscribe({
      next: (tasks) => this.tareas = tasks,
      error: (err) => console.error('Error al cargar tareas:', err)
    });
  }

  toggleCompletado(tarea: Task): void {
    tarea.isCompleted = !tarea.isCompleted;

    this.api.updateTask(tarea.id!, tarea).subscribe({
      error: err => {
        console.error('Error al actualizar tarea:', err);
        tarea.isCompleted = !tarea.isCompleted; // revertir si falla
      }
    });
  }

  empezarEdicion(tareaId: number): void {
    this.editandoTareaId = tareaId;
  }

  cancelarEdicion(): void {
    this.editandoTareaId = null;
  }

  guardarEdicion(tarea: Task): void {
    if (!tarea.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    this.api.updateTask(tarea.id!, tarea).subscribe({
      next: () => {
        this.editandoTareaId = null;
        this.mostrarMensaje('Tarea actualizada correctamente');
      },
      error: err => {
        console.error('Error al guardar cambios:', err);
        alert('Error al guardar los cambios');
      }
    });
  }

  agregarTarea(): void {
    if (!this.nuevaTarea.title?.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const tareaParaEnviar: Task = {
      ...this.nuevaTarea,
      userId: this.userId,
      isCompleted: false
    } as Task;

    this.api.createTask(tareaParaEnviar).subscribe({
      next: (tareaCreada) => {
        this.tareas.push(tareaCreada);
        this.nuevaTarea.title = '';
        this.nuevaTarea.description = '';
        this.mostrarMensaje('Tarea agregada correctamente');
      },
      error: (err) => console.error('Error al crear tarea:', err)
    });
  }

  eliminarTarea(tarea: Task): void {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

    this.api.deleteTask(tarea.id!).subscribe({
      next: () => {
        this.tareas = this.tareas.filter(t => t.id !== tarea.id);
        this.mostrarMensaje('Tarea eliminada');
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        alert('Ocurrió un error al eliminar la tarea');
      }
    });
  }


  mostrarMensaje(texto: string) {
    this.mensaje = texto;
    setTimeout(() => this.mensaje = '', 3000);
  }

   logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
