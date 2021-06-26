import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from 'src/app/service/entrenador.service';

@Component({
  selector: 'app-administrar-entrenador',
  templateUrl: './administrar-entrenador.component.html',
  styleUrls: ['./administrar-entrenador.component.css']
})
export class AdministrarEntrenadorComponent implements OnInit {

  listaEntrenadores: Array<any> = []
  idEntrenador: string = ''
  numeroEntrenador: number = 0

  constructor(private entrenadorService: EntrenadorService) {
    this.obtenerEntrenador()
  }

  ngOnInit(): void {
  }

  obtenerEntrenador() {
    try {
      this.entrenadorService.obtenerEntrenadores().subscribe(
        (result) => {
          console.log(result);
          const resultado = result
          this.listaEntrenadores = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  eliminarEntrenador() {
    try {
      this.entrenadorService.eliminarEntrenador(this.listaEntrenadores[this.numeroEntrenador]._id).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.listaEntrenadores = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

}
