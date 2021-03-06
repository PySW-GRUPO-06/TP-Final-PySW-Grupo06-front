import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroDieta } from 'src/app/models/registro-dieta';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/service/alumno.service';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { CuotaService } from 'src/app/service/cuota.service';
import { DiaEjercicioService } from 'src/app/service/dia-ejercicio.service';
import { DietaService } from 'src/app/service/dieta.service';
import { LoginService } from 'src/app/service/login.service';
import { PersonaService } from 'src/app/service/persona.service';
import { PlanService } from 'src/app/service/plan.service';
import { RegistroDietaService } from 'src/app/service/registro-dieta.service';
import { RutinaService } from 'src/app/service/rutina.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-principal-alumnos',
  templateUrl: './principal-alumnos.component.html',
  styleUrls: ['./principal-alumnos.component.css']
})
export class PrincipalAlumnosComponent implements OnInit {

  asistencia: Array<any> = []
  cuotas: Array<any> = []
  rutina: any
  plan: any
  usuario: any
  dieta: any
  registroDieta: Array<any> = []
  persona: any
  alumno: any;
  diasPorRutina: Array<any> = []
  idDiasElegido!: string
  ejercicios: Array<any> = []

  fotoRegistroDieta: string = ''
  alturaRegistroDieta: number = 0
  pesoRegistroDieta: number = 0
  fechaRegistroDieta!: Date
  caloriasRegistroDieta: number = 0
  proteinasRegistroDieta: number = 0

  userName: string = ''
  password: string = ''

  private idUsuario: string = ''
  private idPlan: string = ''
  private idRutina: string = ''
  private token: string = ''

  tabla1: boolean = true;
  tabla2: boolean = false;
  tabla3: boolean = false;




  constructor(private route: Router, private activatedRoute: ActivatedRoute, private asistenciaAlumnoService: AsistenciaService, private pagosService: CuotaService,
    private rutinaService: RutinaService, private usuarioService: UsuarioService,
    private dietaService: DietaService, private registroDietaService: RegistroDietaService,
    private personaService: PersonaService, private alumnoService: AlumnoService, private planService: PlanService,
    private diaService: DiaEjercicioService, private loginService: LoginService) {
    this.obtenerToken()
    this.obtenerIDs()
    /* this.idDiasElegido = '60da75080ca683314a71e061' */
  }

  ngOnInit(): void {
  }

  obtenerToken() {

  }

  obtenerIDs() {
    this.obtenerPersonaUsuario()


  }

  cerrarSecion() {
    this.loginService.logout();
    this.route.navigate(['principal']);
  }

  private obtenerPersonaUsuario() {
    try {
      this.idUsuario = sessionStorage.getItem("userid") || ''
      this.personaService.obtenerPersonaUsuario(this.idUsuario).subscribe(
        (result) => {
          console.log("obtener persona")
          /* console.log(result); */
          const resultado = result
          this.persona = result[0]
          this.usuario = result[0].usuario
          console.log(this.persona)
          this.obtenerAlumnoPorPersona()
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerAlumnoPorPersona() {
    try {

      this.alumnoService.getAlumnoPorPersona(this.persona._id).subscribe(
        (result) => {
          console.log("obtener alumno")
          /* console.log(result); */
          const resultado = result
          this.alumno = result[0]
          this.idPlan = this.alumno.planActivo
          console.log(this.alumno)

          this.obtenerPlan()

        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerAsistencia() {
    try {
      console.log("obtener asistencia ")
      this.alumno.asistencia.forEach((element: any) => {
        this.asistenciaAlumnoService.getAsistencia(element._id).subscribe(
          (result) => {
            /* console.log(result); */
            const resultado = result
            this.asistencia.push(result)
          });
      });
      console.log(this.asistencia)
      this.obtenerRegistroDieta()
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerEjercicios(idElejido: string) {
    try {
      this.idDiasElegido = idElejido
      if (this.idDiasElegido) {
        this.diaService.getDiaEjercicio(this.idDiasElegido).subscribe(
          (result) => {
            /* console.log("obtener ejerciciosssssssssssss")
            console.log(result); */
            const resultado = result
            this.ejercicios = result.ejercicios

            console.log("obtener ejercicios")
            console.log(this.ejercicios)
          });
      }

    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerDias() {
    try {
      console.log("obtener dias")
      this.diasPorRutina = []
      /* console.log(this.rutina.dias) */

      this.diasPorRutina = this.rutina.dias

      console.log(this.diasPorRutina)

    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerPagos() {
    try {
      console.log("obtener pagos")
      this.plan.pago.forEach((element: string) => {
        this.pagosService.obtenerCuota(element).subscribe(
          (result) => {
            if (result) {
              console.log("pagos")
              console.log(result);
              const resultado = result
              this.cuotas.push(result)
            }
          });
        console.log(this.cuotas)
        this.obtenerAsistencia()
      });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerPlan() {
    try {

      this.planService.getPlan(this.idPlan).subscribe(
        result => {
          console.log("obtener plan")
          /* console.log(result); */
          const resultado = result
          this.plan = result
          console.log(this.plan)
          this.obtenerRutina()
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerRutina() {
    try {


      this.rutinaService.obtenerRutina(this.plan.rutina).subscribe(
        result => {
          console.log("id de rutina actual: " + this.plan.rutina)
          /* console.log(result); */
          const resultado = result
          this.rutina = result
          console.log("obtener rutina")
          console.log(this.rutina)

          this.obtenerPagos()
          this.obtenerDias()
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  modificarUsuario() {
    var usuarioModificar: Usuario
    usuarioModificar = new Usuario()

    usuarioModificar._id

    try {
      this.usuarioService.modificarUsuario(usuarioModificar).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.usuario = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerDietaIdeal() {
    try {
      console.log("obtener dieta ideal")
      if (this.plan.dieta) {
        this.dietaService.obtenerDieta(this.plan.dieta).subscribe(
          (result) => {
            /* console.log(result); */
            const resultado = result
            this.dieta = result
          });
      }
      console.log(this.dieta)
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private obtenerRegistroDieta() {
    try {
      console.log("obtener registro dieta")
      if (this.plan.registroDieta) {
        this.plan.registroDieta.forEach((element: string) => {
          this.registroDietaService.getRegistroDieta(element).subscribe(
            (result) => {
              /* console.log(result); */
              const resultado = result
              this.registroDieta.push(result)
            });
        });
      }
      console.log(this.registroDieta)
      this.obtenerDietaIdeal()
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }


  guardarRegistroDieta() {
    var registroDieta: RegistroDieta
    registroDieta = new RegistroDieta()



    try {
      this.registroDietaService.postCrearRegistroDieta(registroDieta).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.dieta = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  /*   variacionPest(){
  
      if (this.tabla1===true) {
  this.tabla2=false;
  this.tabla3=false;     
      } else {
        if (this.tabla2===true) {
          this.tabla1=false;
          this.tabla3=false;  
        } else {
          if (this.tabla3===true) {
            this.tabla1=false;
            this.tabla2=false;  
          } 
          
        }
        
      }
  
    } */

  variacionPest1() {
    this.tabla1 = true;
    this.tabla2 = false;
    this.tabla3 = false;

  }
  variacionPest2() {
    this.tabla1 = false;
    this.tabla2 = true;
    this.tabla3 = false;
  }
  variacionPest3() {
    this.tabla1 = false;
    this.tabla2 = false;
    this.tabla3 = true;
  }


}
