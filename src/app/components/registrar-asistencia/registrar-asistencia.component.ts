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

  dni: number = 41750208
  tipoDeAsistencia: string = 'presente'
  persona: any
  alumno!: Alumno
  asistencia!: Asistencia

  constructor(private asistenciaService: AsistenciaService, private personaService: PersonaService,
    private alumnoService: AlumnoService) {
    /* this.obtenerDatosPersona()
    this.guardarAsistencia() */

  }

  ngOnInit(): void {
  }

  obtenerDatosPersona() {
    try {
      this.personaService.obtenerPersonaDNI(String(this.dni)).subscribe(
        (result) => {
          console.log('obtener datos persona')
          console.log(result);
          const resultado = result
          this.persona = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  guardarAsistencia() {

    this.asistencia = new Asistencia()
    this.asistencia.dia = new Date()
    this.asistencia.tipoAsistencia = this.tipoDeAsistencia
    console.log('a guardar asistencia')
    console.log(this.asistencia)

    try {
      this.asistenciaService.postCrearAsistencia(this.asistencia).subscribe(
        (result: any) => {
          console.log('guardar asistencia')
          console.log(result);
          const resultado = result

          this.guardarAsistenciaAlumno(result.id)
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private guardarAsistenciaAlumno(idAsistencia: string) {
    try {
      this.alumnoService.getAlumnoPorPersona(this.persona[0]._id).subscribe(
        (result) => {
          console.log('obtener alumno por persona')
          console.log(result);
          const resultado = result
          this.alumno = result[0]

          console.log('datos alumnos obtenidooos')
          this.alumno.asistencia.push(idAsistencia)

          console.log(this.alumno)
          try {
            this.alumnoService.putEditarAlumno(this.alumno).subscribe(
              (result) => {
                console.log('guardar asistencia en alumno')
                console.log(result);
                const resultado = result
              });
          } catch (error) {
            console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
          }
        });

    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }


  }
}
