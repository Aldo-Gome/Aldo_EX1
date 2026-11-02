import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'admin' && this.clave === '123') { 
      localStorage.setItem('sesionBiblioteca', 'si');
      this.router.navigate(['/libro']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}