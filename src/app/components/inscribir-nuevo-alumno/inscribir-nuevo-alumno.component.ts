import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Persona } from 'src/app/models/persona';
import { AlumnoService } from 'src/app/service/alumno.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-inscribir-nuevo-alumno',
  templateUrl: './inscribir-nuevo-alumno.component.html',
  styleUrls: ['./inscribir-nuevo-alumno.component.css']
})
export class InscribirNuevoAlumnoComponent implements OnInit {
  persona:Persona=new Persona();
  alumno:Alumno=new Alumno();
  personas:Array<Persona>=new Array<Persona>();

  constructor( private alumnoService:AlumnoService, private personaService:PersonaService) { }

  ngOnInit(): void {
  
  }

  agregarPersona(){
    try {
      this.personaService.guardarPersona(this.persona).subscribe(
        result=>{
          if (result.status==1) {
            alert("la persona se agrego correctamente")
          }
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR "+error+" NO SE PUDO GUARDAR DATOS")
    }

  }
  agregarAlumno(){
    try {
      this.alumno.persona=this.persona
      
      this.alumnoService.postCrearAlumno(this.alumno).subscribe(
        result=>{
          if (result.status ==1) {
            alert("la personel alumno se agrego correctamente")
            
          }
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR "+error+" NO SE PUDO GUARDAR DATOS")
    }

  }
  obtenerPersonas(){
    this.personaService.obtenerPersonas().subscribe(
      result=>{
        result.forEach((element:any) => {
          let vPersona = new Persona();
          Object.assign(vPersona, element);
          this.personas.push(vPersona);
          
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar Agentes");
      }
    )
  }

}
