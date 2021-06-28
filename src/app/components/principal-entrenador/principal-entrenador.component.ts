import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/service/alumno.service';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { PersonaService } from 'src/app/service/persona.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-principal-entrenador',
  templateUrl: './principal-entrenador.component.html',
  styleUrls: ['./principal-entrenador.component.css']
})
export class PrincipalEntrenadorComponent implements OnInit {
personas:Array<Persona>=new Array<Persona>();
persona:Persona=new Persona();
alumno:Alumno=new Alumno()
alumnos!:Array<Alumno>
usuario:Usuario=new Usuario()
usuarios:Array<Usuario>=new Array<Usuario>()
fechaHoy = Date.now()
asistencias:Array<Asistencia>=new Array<Asistencia>()
activos:Array<Alumno>=new Array<Alumno>()
noActivos:Array<Alumno>=new Array<Alumno>()
pActivas:Array<Persona>=new Array<Persona>();
pNActivas:Array<Persona>=new Array<Persona>();
cantInscriptos:number=0;

  constructor(private route:Router,
    private activatedRoute:ActivatedRoute, private personaService:PersonaService,
    private alumnoService:AlumnoService,private usuarioService:UsuarioService,
    private asistenciaService:AsistenciaService) {
      
      this.mostrarActivosYnoActivos();
      this.cargarPersonasNoActivas();
      this.cargarPersonasActivas();
      this.cantInscriptos=this.calcularCantPInscriptas();
      console.log("cantidad de inscriptos"+this.cantInscriptos)

     }

  ngOnInit(): void {
  }

  irAInscribirNuevoAlumno():void{
    this.route.navigate(['inscribirNuevoAlumno']);
 }

 irARegistrarPagoCuota():void{
  this.route.navigate(['registrarCuotas']);
}

irARegistrarAsistencia():void{
  this.route.navigate(['registrarAsistencia']);
}

irAGenerarModifRutinas():void{
  this.route.navigate(['administrarRutinas']);
}

irAAdministrarEntrenador():void{
  this.route.navigate(['administrarEntrenador']);
}

irADatosDelAlumno():void{
  this.route.navigate(['administrarDatosDeUnAlumno']);
}

mostrarPersonas(){
    try {
      this.personaService.obtenerPersonas().subscribe(
        result=>{
        
          result.forEach((element:any) => {
            let vPersona=new Persona()
            Object.assign(vPersona,element)
            this.personas.push(vPersona)
          });
        }
      )
    } catch (error) {
      console.log("error al cargar personaS"+error);
    }
    }

  mostrarAlumnos(){
    this.alumnos=new Array<Alumno>()
    try {
      this.alumnoService.getAllAlumno().subscribe(
      result=>{
        result.forEach((element:any) => {
          let vAlumno=new Alumno()
          Object.assign(vAlumno,element)
          this.alumnos.push(vAlumno)
          console.log("se cargo Alumnos al arrrray alumnos")
          
        });
      }
    )
    } catch (error) {
      console.log("error al cargar alumnos"+error)
    }
    
    console.log("mostrarAlumnos() ==>"+this.alumnos.length)
  }
  mostrarUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe(
      result=>{
        result.forEach((element:any) => {
          let vUsuario=new Usuario()
          Object.assign(vUsuario,element)
          this.usuarios.push(vUsuario)
          
        });
      }
    )
    console.log("cant US"+this.usuarios.length)
  }
  calcularCantPInscriptas():number{
    this.mostrarUsuarios();
    let element=0;
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].rol == "Alumno") {
           element ++;
      }
       
      
    }
    console.log("cant=> "+element)
    return element;
  }

  calcularAsistencia():number{
    let contador=0
    this.asistenciaService.getAllAsistencia().subscribe(
      result=>{
        result.forEach((element:any) => {
          let vAsis=new Asistencia()
          Object.assign(vAsis,element)
          this.asistencias.push(vAsis)
        });
      }
    )
    for (let index = 0; index < this.asistencias.length; index++) {
      if (this.asistencias[index].dia.toDateString == this.fechaHoy.toString
         || this.asistencias[index].tipoAsistencia=="presente") {
        contador=+1
      }
      
    }
    return contador
  
  }

  mostrarActivosYnoActivos(){
    this.mostrarAlumnos()
    console.log("Cant Alumnos==> "+this.alumnos.length)
    let encontrado=false
    for (let index = 0; index < this.alumnos.length; index++) {
      let vPersona=new Persona()
    let vUsuario=new Usuario()
      if (encontrado == false) {
        
        this.personaService.obtenerPersona(this.alumnos[index].persona).subscribe(
          result=>{
            vPersona=result
            console.log("Persona=>"+vPersona)
          }
        )
        encontrado=true
          
        if (encontrado==true) {
          let usId=vPersona.usuario
          this.usuarioService.obtenerUsuario(usId).subscribe(
            result=>{
                vUsuario=result
            }
          )
         
           
          if (vUsuario.activo==true) {
              this.activos.push(this.alumnos[index])
              
            } else{
              this.noActivos.push(this.alumnos[index])

              }

           encontrado=false
        }
      }
       

    }
   // this.cargarPersonasActivas()
    //this.cargarPersonasNoActivas()
  }

  cargarPersonasActivas(){

    for (let index = 0; index < this.activos.length; index++) {
     this.personaService.obtenerPersona(this.activos[index].persona).subscribe(
       result=>{
         this.pActivas.push(result)
       }
     )
      
    }
    console.log("Personas Activas ==>"+this.pActivas.length)
  }

  cargarPersonasNoActivas(){
    for (let index = 0; index < this.noActivos.length; index++) {
      this.personaService.obtenerPersona(this.noActivos[index].persona).subscribe(
        result=>{
          this.pNActivas.push(result)
        }
      )
       
     }
     console.log("Personas NActivas ==>"+this.pActivas.length)
  }


}
