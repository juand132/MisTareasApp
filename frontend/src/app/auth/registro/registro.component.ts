import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, User } from '../../services/api.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router) { }

  goLogin() {
    this.router.navigate(['/login']);
  }

  registrar() {
    if (!this.user.email || !this.user.password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this.api.register(this.user).subscribe({
      next: (res: string) => {
        alert(res);  // aquí 'res' es el string que envía el backend, ejemplo: "Usuario registrado exitosamente."
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        // En err.error tienes el string que envía el backend en caso de BadRequest
        alert(err.error || 'Error desconocido');
      }
    });

  }
}
