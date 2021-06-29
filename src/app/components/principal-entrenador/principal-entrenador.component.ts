import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/service/alumno.service';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { LoginService } from 'src/app/service/login.service';
import { PersonaService } from 'src/app/service/persona.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-principal-entrenador',
  templateUrl: './principal-entrenador.component.html',
  styleUrls: ['./principal-entrenador.component.css']
})
export class PrincipalEntrenadorComponent implements OnInit {
  personas: Array<Persona> = new Array<Persona>();
  persona: Persona = new Persona();
  alumno: Alumno = new Alumno()
  alumnos!: Array<Alumno>
  usuario: Usuario = new Usuario()
  usuarios: Array<Usuario> = new Array<Usuario>()
  fechaHoy = Date()
  asistencias: Array<Asistencia> = new Array<Asistencia>()
  activos: Array<Alumno> = new Array<Alumno>()
  noActivos: Array<Alumno> = new Array<Alumno>()
  pActivas: Array<Persona> = new Array<Persona>();
  pNActivas: Array<Persona> = new Array<Persona>();
  cantInscriptos: number = 0;
  cantSolicitudes: number = 0;
  cantAsistencia:number=0;
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute, private personaService: PersonaService,
    private alumnoService: AlumnoService, private usuarioService: UsuarioService,
    private asistenciaService: AsistenciaService, private loginService: LoginService) {

    /*this.mostrarActivosYnoActivos();
     this.cargarPersonasNoActivas();
    this.cargarPersonasActivas();
    this.cantInscriptos = this.calcularCantPInscriptas();
    console.log("cantidad de inscriptos" + this.cantInscriptos)
    
    this.mostrarPersonas()
    this.mostrarUsuarios() */
    this.mostrarAlumnos()
    this.calcularAsistencia()


  }

  ngOnInit(): void {
  }

  irAInscribirNuevoAlumno(): void {
    this.route.navigate(['inscribirNuevoAlumno/', 0]);
  }

  irARegistrarPagoCuota(): void {
    this.route.navigate(['registrarCuotas']);
  }

  irARegistrarAsistencia(): void {
    this.route.navigate(['registrarAsistencia']);
  }

  irAGenerarModifRutinas(): void {
    this.route.navigate(['administrarRutinas']);
  }

  irAAdministrarEntrenador(): void {
    this.route.navigate(['administrarEntrenador']);
  }

  irADatosDelAlumno(): void {
    this.route.navigate(['administrarDatosDeUnAlumno']);
  }

  cerrarSecion() {
    this.loginService.logout();
    this.route.navigate(['registrarCuotas']);
  }
  mostrarPersonas() {
    try {
      this.personaService.obtenerPersonas().subscribe(
        result => {

          this.personas = result
          console.log("mostrarPersonas  " + this.personas.length)
        }
      )
    } catch (error) {
      console.log("error al cargar personaS" + error);
    }
  }

  private mostrarAlumnos() {
    this.alumnos = new Array<Alumno>()
    try {
      this.alumnoService.getAllAlumno().subscribe(
        result => {
          this.alumnos = result
          console.log("se cargo Alumnos al array alumnos" + this.alumnos.length)
          this.mostrarActivosYnoActivos()
          this.cantInscriptos = this.alumnos.length
          console.log("cantidad de inscriptos " + this.cantInscriptos)
        });

    } catch (error) {
      console.log("error al cargar alumnos" + error)
    }

  }
  mostrarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      result => {
        this.usuarios = result
        console.log("mostrarUS " + this.usuarios)

      }
    )
    console.log("cant US" + this.usuarios.length)
  }
  calcularCantPInscriptas(): number {
    this.mostrarUsuarios();
    let element = 0;
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].rol == "Alumno") {
        element++;
      }


    }
    console.log("cant=> " + element)
    return element;
  }

  calcularAsistencia() {
    let contador = 0
    this.asistenciaService.getAllAsistencia().subscribe(
      result => {
        this.asistencias = result
        for (let index = 0; index < this.asistencias.length; index++) {
          if (this.asistencias[index].dia.toDateString == this.fechaHoy.toString
            && this.asistencias[index].tipoAsistencia == "presente") {
            contador = +1
          }

        }
        
        console.log("Cantidad Asistencia=>"+this.fechaHoy)
        this.cantAsistencia=contador;
      }
    )


  }

  private mostrarActivosYnoActivos() {
    console.log(" mostrar Act y no act Cant Alumnos==> " + this.alumnos.length)

    let encontrado = false
    for (let index = 0; index < this.alumnos.length; index++) {
      let vPersona: any
      let vUsuario = new Usuario()
      if (encontrado == false) {

        this.personaService.obtenerPersona(this.alumnos[index].persona).subscribe(
          result => {
            vPersona = result
            console.log("Persona=>")
            console.log(vPersona)

            encontrado = true

            if (encontrado) {

              let usId = vPersona.usuario._id
              console.log("usID")
              console.log(vPersona.usuario._id)
              this.usuarioService.obtenerUsuario(usId).subscribe(
                result => {
                  vUsuario = result
                  console.log("encontrado")
                  if (vUsuario.activo == true) {
                    this.activos.push(this.alumnos[index])
                    console.log("se agrego a activos")
                    /* this.personaService.obtenerPersona(this.alumnos[index].persona).subscribe(
                      result => {
                        this.pActivas = result
                      }
                    ) */
                    this.cargarPersonasActivas(this.alumnos[index])


                  } else {
                    this.noActivos.push(this.alumnos[index])
                    console.log("se agrego a No activos")
                    /* this.personaService.obtenerPersona(this.alumnos[index].persona).subscribe(
                      result => {
                        this.pActivas = result
                      }
                    ) */
                    this.cargarPersonasNoActivas(this.alumnos[index])
                  }

                  encontrado = false
                  console.log("activos")
                  console.log(this.activos)
                  console.log(" No activos")
                  console.log(this.noActivos)

                  this.cantInscriptos = this.activos.length
                  console.log("cantidad de inscriptos" + this.cantInscriptos)
                  this.cantSolicitudes = this.noActivos.length
                }

              )



            }
          }
        )

      }


    }
    // this.cargarPersonasActivas()
    //this.cargarPersonasNoActivas()
  }

  private cargarPersonasActivas(alumno: Alumno) {
    console.log("inicio de Cargar persona activas" + this.activos.length)
    this.pActivas = []

    this.personaService.obtenerPersona(alumno.persona).subscribe(
      result => {
        this.pActivas.push(result)
        /*  console.log("XXXXXX")
         console.log(alumno.persona) */
      }
    )


    console.log("Personas Activas ==>" + this.pActivas.length)
  }

  private cargarPersonasNoActivas(alumno: Alumno) {
    console.log("inicio de Cargar persona no activas" + this.noActivos.length)
    this.pNActivas = []

    this.personaService.obtenerPersona(alumno.persona).subscribe(
      result => {
        this.pNActivas.push(result)
      }
    )


    console.log("Personas NActivas ==>" + this.pActivas.length)
  }


}
