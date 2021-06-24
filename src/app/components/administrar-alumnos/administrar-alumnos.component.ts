import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-alumnos',
  templateUrl: './administrar-alumnos.component.html',
  styleUrls: ['./administrar-alumnos.component.css']
})
export class AdministrarAlumnosComponent implements OnInit {

  listaAlumnosActivos:Array<any> = []
  listaAlumnosPendientes:Array<any> = []

  constructor() { }

  ngOnInit(): void {
  }

  obtenerAlumnos(){

  }
  
  buscarAlumno(){

  }

  nuevoAlumno(){

  }
  
}
