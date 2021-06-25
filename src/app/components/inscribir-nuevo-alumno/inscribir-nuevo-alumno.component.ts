import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Cuota } from 'src/app/models/cuota';
import { Persona } from 'src/app/models/persona';
import { Plan } from 'src/app/models/plan';
import { AlumnoService } from 'src/app/service/alumno.service';
import { CuotaService } from 'src/app/service/cuota.service';
import { PersonaService } from 'src/app/service/persona.service';
import { PlanService } from 'src/app/service/plan.service';

@Component({
  selector: 'app-inscribir-nuevo-alumno',
  templateUrl: './inscribir-nuevo-alumno.component.html',
  styleUrls: ['./inscribir-nuevo-alumno.component.css']
})
export class InscribirNuevoAlumnoComponent implements OnInit {
  persona:Persona=new Persona();
  alumno:Alumno=new Alumno();
  personas:Array<Persona>=new Array<Persona>();
  plan:Plan=new Plan();
  cuota:Cuota=new Cuota();

  constructor( private alumnoService:AlumnoService, private personaService:PersonaService,
              private planService:PlanService,private cuotaService:CuotaService) { }

  ngOnInit(): void {
  
  }

  agregarPersona(){
    this.persona=new Persona();
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
    this.agregarAlumno();

  }
  agregarAlumno(){
    this.obtenerPersonaPorDNI()
    try {
      this.alumno.persona=this.persona
      
      this.alumnoService.postCrearAlumno(this.alumno).subscribe(
        result=>{
/*           if (result.status ==1) {
            alert("la personel alumno se agrego correctamente")
            
          } */
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR "+error+" NO SE PUDO GUARDAR DATOS")
    }

  }
  obtenerPersonaPorDNI(){
    try {
      this.personaService.obtenerPersonaDNI(this.persona.dni).subscribe(
      result=>{
        this.alumno.persona=result;
        console.log(result)
      }
    )
    } catch (error) {
      console.log("ERROR "+error+" NO SE PUDO OBTENER DATOS")
    }
  }
  guardarPlan(){
    try {
      this.planService.postCrearPlan(this.plan).subscribe(
        result=>{
          console.log("plan guardado"+result)
        }
      )
    } catch (error)
     {
      console.log("ERROR "+error+" No se pudo guardar PLAN");
      
    }
  }
guardarCuota(){
try {
  this.cuotaService.guardarCuota(this.cuota).subscribe(
    result=>{
      console.log("se guardo cuota"+result)
    }
  )
} catch (error) {
  console.log("ERROR al guardar cuota"+error);
  
}
}
}
