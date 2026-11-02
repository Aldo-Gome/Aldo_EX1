import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Libro {
  id: number;
  titulo: string;
  autor: string;
}

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class LibroComponent {
  libros: Libro[] = [];
  titulo = '';
  autor = '';
  indiceEditar = -1;

  constructor(private router: Router) {
    if (localStorage.getItem('sesionExamen') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('libros');
    if (datos !== null) {
      this.libros = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionExamen');
    this.router.navigate(['/login']);
  }

  guardar() {
    if ( this.titulo.trim() === '' || this.autor.trim() === '') {
      alert('Complete todos los campos obligatorios.');
      return;
    }

    if (this.indiceEditar === -1) {
      let nuevoId = 1;
      for (const libro of this.libros) {
        if (libro.id >= nuevoId) nuevoId = libro.id + 1;
      }
      
      const nuevoLibro: Libro = {
        id: nuevoId,
        titulo: this.titulo.trim(),
        autor: this.autor.trim()
      };
      this.libros.push(nuevoLibro);
    } else {
      this.libros[this.indiceEditar].titulo = this.titulo.trim();
      this.libros[this.indiceEditar].autor = this.autor.trim();
    }
    
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  editar(indice: number) {
    this.indiceEditar = indice;
    this.titulo = this.libros[indice].titulo;
    this.autor = this.libros[indice].autor;
  }

  

  guardarEnLocalStorage() {
    localStorage.setItem('libros', JSON.stringify(this.libros));
  }
  eliminar(indice: number) {
    if (confirm('¿Eliminar este libro?')) {
      this.libros.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.autor = '';
    this.indiceEditar = -1;
  }
}