import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./auth/registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'tareas', loadComponent: () => import('./tareas/tareas.component').then(m => m.TareasComponent) },
];
