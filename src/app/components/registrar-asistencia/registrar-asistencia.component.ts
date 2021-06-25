import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { AlumnoService } from 'src/app/service/alumno.service';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css']
})
export class RegistrarAsistenciaComponent implements OnInit {

  dni:number=0
  dia!:Date
  tipoDeAsistencia:string=''
  persona:any
  alumno! : Alumno
  asistencia!:Asistencia

  constructor(private asistenciaService: AsistenciaService,private personaService: PersonaService,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
  }

  obtenerDatosPersona(){
    try {
      this.personaService.obtenerPersona(' ppppp ').subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.persona = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  guardarAsistencia(){
    
    this.asistencia=new Asistencia()

    try {
      this.asistenciaService.postCrearAsistencia(this.asistencia).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result

          this.guardarAsistenciaAlumno()
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private guardarAsistenciaAlumno(){
    try {
      this.alumnoService.getAlumnoPorPersona(this.persona._id).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.alumno = result
        });

        this.alumno.asistencia.push(this.asistencia._id)
        try {
          this.alumnoService.putEditarAlumno(this.alumno).subscribe(
            (result) => {
              /* console.log(result); */
              const resultado = result
            });
        } catch (error) {
          console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
        }
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }

    
  }
}
