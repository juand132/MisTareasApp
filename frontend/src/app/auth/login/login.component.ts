import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService, User } from '../../services/api.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService, private router: Router) { }

  login() {

    console.log('Enviando al backend:', this.user);

    this.api.login(this.user).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        localStorage.setItem('userId', res.id);  // Guardamos el ID del usuario para después traer tareas
        this.router.navigate(['/tareas']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Credenciales incorrectas');
      }
    });
  }

}
