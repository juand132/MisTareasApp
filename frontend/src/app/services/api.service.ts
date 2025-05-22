import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5043/api';

  constructor(private http: HttpClient) { }

  // Registro
  register(user: User): Observable<string> {
  return this.http.post(`${this.baseUrl}/users/register`, user, { responseType: 'text' });
}


  // Login
  login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, user);
  }


  // Obtener tareas por usuario
  getTasks(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/user/${userId}`);
  }

  // Crear tarea
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  // Actualizar tarea
  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`, { responseType: 'text' });
  }

}
