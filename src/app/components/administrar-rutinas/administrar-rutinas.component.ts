import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dia } from 'src/app/models/dia';
import { Ejercicio } from 'src/app/models/ejercicio';
import { Rutina } from 'src/app/models/rutina';
import { DiaEjercicioService } from 'src/app/service/dia-ejercicio.service';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { RutinaService } from 'src/app/service/rutina.service';

@Component({
  selector: 'app-administrar-rutinas',
  templateUrl: './administrar-rutinas.component.html',
  styleUrls: ['./administrar-rutinas.component.css']
})
export class AdministrarRutinasComponent implements OnInit {

  rutina: Rutina = new Rutina();
  dia: Dia = new Dia();
  ejercicio: Ejercicio = new Ejercicio;

  listaRutinas!: Array<Rutina>;
  listaDias!: Array<Dia>;
  listaEjercicios!: Array<Ejercicio>;

  private idRutina = '1'
  private idDia = '2'
  private idEjercicio = '3'
  private modificarEjercicioB: boolean = false
  private entrarIngresarDia: boolean = false

  cuadro1: boolean = true;
  cuadro2: boolean = false;
  cuadro3: boolean = false;

  constructor(private rutinaService: RutinaService,
    private diaService: DiaEjercicioService,
    private ejercicioService: EjercicioService,
    public loginService: LoginService, private router: Router) {

    if (this.loginService.userLoggedIn()) {
      this.listaRutinas = []
      this.listaDias = []
      this.listaEjercicios = []
      this.ejercicio.img = 'Sin imagen'
      this.mostrarListaRutinas()
    } else {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }
  crearRutina() {
    try {
      this.rutinaService.guardarRutina(this.rutina).subscribe(
        (result: any) => {
          console.log("se guardo rutina");
          console.log(result)
          this.idRutina = result.id
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  private obtenerRutina() {
    try {
      console.log("obtener rutina")
      this.rutinaService.obtenerRutina(this.idRutina).subscribe(
        (result: any) => {
          console.log(result)
          this.rutina = result
          this.modificarRutina()
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  private modificarRutina() {
    this.rutina.dias.push(this.dia._id)
    try {
      this.rutinaService.modificarRutina(this.rutina).subscribe(
        (result: any) => {
          console.log(result)
          if (this.modificarEjercicioB == false) {
            this.mostrarListaEjercicios()
          }
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  private obtenerDia() {
    try {
      console.log("se obtiene el dia " + this.idDia)
      console.log(this.modificarEjercicioB)
      this.diaService.getDiaEjercicio(this.idDia).subscribe(
        (result: any) => {
          console.log("resltado de obtener dia:")
          console.log(result);
          this.dia = result
          console.log('obtener dia, modificar ejercicio B: ' + this.modificarEjercicioB)
          if (this.modificarEjercicioB) {
            this.modificarDia()
          } else {
            this.obtenerRutina()
          }
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  private modificarDia() {
    this.dia.ejercicios.push(this.idEjercicio)

    console.log("editar dia para ejercicio, con ejercicio:  " + this.idEjercicio)
    console.log(this.dia)
    try {
      this.diaService.putEditarDiaEjercicio(this.dia).subscribe(
        result => {

          console.log(result);
          this.mostrarListaEjercicios()
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }
  agregarDia() {

    this.modificarEjercicioB = false
    this.entrarIngresarDia = false
    try {
      console.log("se guardo el dia")
      console.log(this.dia)
      this.diaService.postDiaEjercicio(this.dia).subscribe(
        (result: any) => {
          console.log("se guardo el dia, con respuesta: ")
          console.log(result);
          this.idDia = result.id
          this.obtenerDia()
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }
  agregarEjercicio() {

    this.modificarEjercicioB = true

    try {
      console.log("agregar ejercicio")
      console.log(this.ejercicio)
      this.ejercicioService.guardarEjercicio(this.ejercicio).subscribe(
        (result: any) => {
          console.log("se guardo el ejercicio")
          console.log(result);
          this.idEjercicio = result.id
          this.obtenerDia()
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }


  mostrarListaRutinas() {
    try {
      this.rutinaService.obtenerRutinas().subscribe(
        (result: any) => {
          this.listaRutinas = result;

          console.log('lista de rutinas')
          console.log(this.listaRutinas)
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  mostrarListaDias() {
    try {
      this.rutinaService.obtenerRutina(this.idRutina).subscribe(
        (result: any) => {
          console.log('lista de dias')
          console.log(result)
          result.forEach((element: any) => {
            this.listaDias = element.dias;
            console.log(this.listaDias)
          });
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  mostrarListaEjercicios() {
    try {
      this.diaService.getDiaEjercicio(this.idDia).subscribe(
        (result) => {
          console.log('-------- ')
          console.log(result.ejercicios)
          this.listaEjercicios = result.ejercicios;
          console.log(this.listaEjercicios)
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  cambiarValoresIf0() {
    this.mostrarListaDias()
    this.cuadro1 = true;
    this.cuadro2 = false;
    this.cuadro3 = false;
  }

  cambiarValoresIf() {

    console.log('cambiar valores IF: ' + this.entrarIngresarDia)
    if (this.entrarIngresarDia) {
      this.mostrarListaDias()
    } else {
      this.entrarIngresarDia = true
      this.crearRutina()
      this.mostrarListaRutinas()
    }
    this.entrarIngresarDia = true
    this.cuadro1 = false;
    this.cuadro2 = true;
    this.cuadro3 = false;


  }
  cambiarValoresIf2() {
    if (this.entrarIngresarDia) {
      console.log('agrefar dia en cambiar valores if2')
      this.agregarDia()
    } else {
      console.log('mostrar lista de ejercicios en cambiar valores if2')
      this.agregarEjercicio()
    }
    this.cuadro1 = false;
    this.cuadro2 = false;
    this.cuadro3 = true;
  }

}
