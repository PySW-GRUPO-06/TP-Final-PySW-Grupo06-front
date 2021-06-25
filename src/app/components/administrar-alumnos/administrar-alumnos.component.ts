import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/service/alumno.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-administrar-alumnos',
  templateUrl: './administrar-alumnos.component.html',
  styleUrls: ['./administrar-alumnos.component.css']
})
export class AdministrarAlumnosComponent implements OnInit {

  listaAlumnosActivos:Array<any> = []
  listaAlumnosPendientes:Array<any> = []
  dni:string = ''

  constructor(private alumnoService:AlumnoService,private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  obtenerAlumnos(){
    try {
      this.alumnoService.getAllAlumno().subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.listaAlumnosActivos = resultado
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }
  
  buscarAlumno(){

    try {
      this.personaService.obtenerPersonaDNI(this.dni).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          var persona = resultado

          try {
            this.alumnoService.getAlumnoPorPersona(persona).subscribe(
              (result) => {
                /* console.log(result); */
                const resultado = result
                this.listaAlumnosActivos = resultado
              });
          } catch (error) {
            console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
          }

        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  nuevoAlumno(){
    //ir a la pagina de nuevo alumno
  }
  
}
