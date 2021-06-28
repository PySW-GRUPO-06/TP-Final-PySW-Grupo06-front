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

  listaRutinas: Array<Rutina> = new Array<Rutina>();
  listaDias: Array<Dia> = new Array<Dia>();
  listaEjercicios: Array<Ejercicio> = new Array<Ejercicio>();

  private idRutina = '0'
  private idDia = '0'
  private idEjercicio = '0'
  private modificarEjercicioB: boolean = false

  constructor(private rutinaService: RutinaService,
    private diaService: DiaEjercicioService,
    private ejercicioService: EjercicioService,
    public loginService: LoginService, private router: Router) {

    if (this.loginService.userLoggedIn()) {
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
    this.rutina.dias.push(this.dia)
    try {
      this.rutinaService.modificarRutina(this.rutina).subscribe(
        (result: any) => {
          console.log(result)
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }

  private obtenerDia() {
    try {
      this.diaService.getDiaEjercicio(this.idDia).subscribe(
        (result: any) => {
          console.log("se guardo el dia")
          console.log(result);
          this.dia = result

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
    this.dia.ejercicios.push(this.ejercicio)

    try {
      this.diaService.putEditarDiaEjercicio(this.dia).subscribe(
        (result: any) => {
          console.log(" ")
          console.log(result);
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }
  agregarDia() {

    this.modificarEjercicioB = false

    try {
      this.diaService.postDiaEjercicio(this.dia).subscribe(
        (result: any) => {
          console.log("se guardo el dia")
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
          result.forEach((element: any[]) => {
            this.listaRutinas = element;
            console.log(this.listaRutinas)
          });
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
        (result: any) => {
          result.forEach((element: any) => {
            this.listaEjercicios = element.ejercicios;
            console.log(this.listaEjercicios)
          });
        }
      )
    } catch (error) {
      console.log("" + error);
    }
  }
}
