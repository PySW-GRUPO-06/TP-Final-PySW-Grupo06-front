import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from 'src/app/service/entrenador.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-administrar-entrenador',
  templateUrl: './administrar-entrenador.component.html',
  styleUrls: ['./administrar-entrenador.component.css']
})
export class AdministrarEntrenadorComponent implements OnInit {

  listaEntrenadores: Array<any> = []
  listaIdEntrenador: Array<string> = []
  idEntrenador: string = ''

  constructor(private entrenadorService: EntrenadorService, private personaService: PersonaService) {
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
          result.forEach((element: { _id: string; persona: string}) => {
            try {
              this.listaIdEntrenador.push(element._id)
              console.log(element.persona)
              this.personaService.obtenerPersona(element.persona).subscribe(
                (result1) => {
                  /* console.log(result1);
                  console.log(element._id) */
                  this.listaEntrenadores.push(result1)

                  /* console.log(this.listaEntrenadores[0]._id) */
                });
            } catch (error) {
              console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
            }
          });
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  eliminarEntrenador(numeroEntrenador:number) {
    try {
      this.entrenadorService.eliminarEntrenador(this.listaIdEntrenador[numeroEntrenador]).subscribe(
        (result) => {
          console.log(result);
          const resultado = result

          try {
            this.personaService.eliminarPersona(this.listaEntrenadores[numeroEntrenador]._id).subscribe(
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

}
