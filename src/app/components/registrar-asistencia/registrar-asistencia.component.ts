import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
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

  constructor(private asistenciaService: AsistenciaService,private personaService: PersonaService) { }

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
    var asistencia:Asistencia
    asistencia=new Asistencia()

    try {
      this.asistenciaService.postCrearAsistencia(asistencia).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }
}
