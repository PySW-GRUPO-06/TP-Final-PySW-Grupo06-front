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
import { Entrenador } from 'src/app/models/entrenador';
import { EntrenadorService } from 'src/app/service/entrenador.service';

@Component({
  selector: 'app-inscribir-nuevo-alumno',
  templateUrl: './inscribir-nuevo-alumno.component.html',
  styleUrls: ['./inscribir-nuevo-alumno.component.css']
})
export class InscribirNuevoAlumnoComponent implements OnInit {
  persona: Persona = new Persona();

  alumno: Alumno = new Alumno();
  entrenador: Entrenador = new Entrenador();
  usuario: Usuario = new Usuario();

  personas: Array<Persona> = new Array<Persona>();

  cuota: Cuota = new Cuota();
  plan: Plan = new Plan();
  fotoPerfil: string = 'Sin foto aun'
  private idPlan: string = '0'
  private idAlumno: string = '0'
  private idUsuario: string = '0'

  cuadroPlan:boolean=false;
  cuadroDatosPers:boolean=true;

  constructor(private alumnoService: AlumnoService, private entrenadorService: EntrenadorService, private personaService: PersonaService,
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
  iniciar() {
    this.persona = new Persona()
  }

  agregarPersona() {
    this.crearUsuario()
    this.cuadroPlan=true;
    this.cuadroDatosPers=false;

    if (this.usuario.rol==="Entrenador") {
      this.router.navigate(['principalEntrenador']);
    } 

  }

  private crearUsuario() {
    try {
      this.usuarioService.guardarUsuario(this.usuario).subscribe(
        result => {
          this.idUsuario = result.id
          console.log("se guardo usuario")
          console.log(result)
          this.agregarNuevaPersona()
        }
      )
    } catch (error) {
      console.log("ERROR al guardar usuario" + error);
    }
  }

  agregarNuevaPersona() {
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
    console.log('persona a agregar:')
    console.log(this.persona)
    this.persona.usuario = this.idUsuario
    this.persona.fotoPerfil = this.fotoPerfil
    try {
      this.personaService.guardarPersona(this.persona).subscribe(
        result => {
          if (result.status == 1) {
            alert("la persona se agrego correctamente")
            if (this.usuario.rol == 'entrenador') {
              this.entrenador.persona = result.id
              console.log(result)
              this.agregarEntrenador()
            } else {
              this.alumno.persona = result.id
              console.log(result)
              this.agregarAlumno()
            }

          }
        }
      )
    } catch (error) {
      console.log("ERROR " + error + " NO SE PUDO GUARDAR DATOS")
    }
    //  this.agregarAlumno();

  }

  private agregarEntrenador() {
    console.log("creando entrenador")
    console.log(this.entrenador)

    try {
      this.entrenadorService.guardarEntrenador(this.entrenador).subscribe(
        (result: any) => {
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

  private agregarAlumno() {
    // this.obtenerPersonaPorDNI()
    console.log("creando alumno")
    console.log(this.alumno)
    try {
      this.alumnoService.postCrearAlumno(this.alumno).subscribe(
        (result: any) => {
          /*           if (result.status ==1) {
                      alert("la personel alumno se agrego correctamente")
                      
                    } */
          this.idAlumno = result.id
          console.log(result)
        }
      )
    } catch (error) {
      console.log("ERROR " + error + " NO SE PUDO GUARDAR DATOS")
    }
  }

  guardarPlan() {
    var id: string = "";
    /* var plan:Plan=new Plan()
     plan.tipo="sss"
     plan.fechaInicioPlan="ssss"
     plan.fechaFinDelPlan="sss"
     plan.nivel="sss"
     plan.objetivo="sss"
     console.log(plan) */
    try {
      this.planService.postCrearPlan(this.plan).subscribe(

        (result: any) => {
          this.alumno.planActivo = result.id
          this.idPlan = result.id
          console.log(result)
          this.modificarAlumno()
        }

      )
    } catch (error) {
      console.log("ERROR " + error + " No se pudo guardar PLAN");

    }
  }

  private modificarAlumno() {
    try {
      this.alumnoService.getAlumno(this.idAlumno).subscribe(
        (result: any) => {
          console.log(result);
          const resultado = result
          result.planActivo = this.idPlan
          try {
            this.alumnoService.putEditarAlumno(result).subscribe(
              (result1) => {
                console.log(result);
                const resultado1 = result1
              });
          } catch (error) {
            console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
          }
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
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




  /*   obtenerPlanes(){
      try {
      
      } catch (error) {
        
      }
    }
     */

    volverAPrincipal(){
      this.router.navigate(['principalEntrenador']);
    }
}
