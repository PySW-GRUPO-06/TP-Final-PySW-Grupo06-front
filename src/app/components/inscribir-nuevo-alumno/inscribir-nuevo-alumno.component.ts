import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Cuota } from 'src/app/models/cuota';
import { Usuario } from 'src/app/models/usuario';
import { Persona } from 'src/app/models/persona';
import { Plan } from 'src/app/models/plan';
import { AlumnoService } from 'src/app/service/alumno.service';
import { CuotaService } from 'src/app/service/cuota.service';
import { LoginService } from 'src/app/service/login.service';
import { PersonaService } from 'src/app/service/persona.service';
import { PlanService } from 'src/app/service/plan.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-inscribir-nuevo-alumno',
  templateUrl: './inscribir-nuevo-alumno.component.html',
  styleUrls: ['./inscribir-nuevo-alumno.component.css']
})
export class InscribirNuevoAlumnoComponent implements OnInit {
  persona: Persona = new Persona();
   alumno: Alumno = new Alumno();
  /*fechaInicio: Date=new Date(2002,3,21);
  registroPlan: Array<string>=[]
  planActivo: string="222222";
  asistencia: Array<string>=[] */
  usuario: Usuario = new Usuario();

  personas: Array<Persona> = new Array<Persona>();
  
  cuota: Cuota = new Cuota();
plan: Plan = new Plan();


  constructor(private alumnoService: AlumnoService, private personaService: PersonaService,
    private planService: PlanService, private cuotaService: CuotaService,
    public loginService: LoginService, private router: Router,
    private usuarioService: UsuarioService) {

    if (this.loginService.userLoggedIn()) {
      //acciones normales de componente
      //acciones normales de componente
    } else {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    }
    this.iniciar
  }

  ngOnInit(): void {

  }
  iniciar(){
    this.persona=new Persona()
  }
  agregarPersona() {
    //
    /* let pers:Persona=new Persona()
    pers.apellido="sss"
    pers.celular=222;
    pers.correo="ss"
    pers.dni=11222
    pers.domicilio="sssss"
    pers.fechaNac="ss"
    pers.fotoPerfil="ss"
    pers.nombre="ssss"
    pers.usuario="60c81d54ed8291047c824284"
    console.log(pers) */
    try {
      this.personaService.guardarPersona(this.persona).subscribe(
        result => {
          if (result.status == 1) {
            alert("la persona se agrego correctamente")
            this.alumno.persona=result.id
          }
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR " + error + " NO SE PUDO GUARDAR DATOS")
    }
  //  this.agregarAlumno();

  }
  agregarAlumno() {
   // this.obtenerPersonaPorDNI()
    try {
      this.alumnoService.postCrearAlumno(this.alumno).subscribe(
        result => {
          /*           if (result.status ==1) {
                      alert("la personel alumno se agrego correctamente")
                      
                    } */
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR " + error + " NO SE PUDO GUARDAR DATOS")
    }

  }
 /*  obtenerPersonaPorDNI() {
    try {
      this.personaService.obtenerPersonaDNI(String (this.persona.dni)).subscribe(
        result => {
          this.alumno.persona = result;
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR " + error + " NO SE PUDO OBTENER DATOS")
    }
  } */
  guardarPlan(){
     var id:string="";
   /* var plan:Plan=new Plan()
    plan.tipo="sss"
    plan.fechaInicioPlan="ssss"
    plan.fechaFinDelPlan="sss"
    plan.nivel="sss"
    plan.objetivo="sss"
    console.log(plan) */
    try {
      this.planService.postCrearPlan(this.plan).subscribe(
        
       ( result:any) => {
         this.alumno.planActivo=result.id
         
          console.log( result)
        }
        
      )
    } catch (error) {
      console.log("ERROR " + error + " No se pudo guardar PLAN");

    }
  }
  guardarCuota() {
    try {
      this.cuotaService.guardarCuota(this.cuota).subscribe(
        result => {
          console.log("se guardo cuota" + result)
        }
      )
    } catch (error) {
      console.log("ERROR al guardar cuota" + error);

    }
  }
  obtenerPlanes(){
    try {
    
    } catch (error) {
      
    }
  }
  crearUsuario(){
    try {
      this.usuarioService.guardarUsuario(this.usuario).subscribe(
        result=>{
          this.persona.usuario=result.id
          console.log("se guardo usuario"+result)
        }
      )
    } catch (error) {
      console.log("ERROR al guardar usuario" + error);
    }
  }
}
