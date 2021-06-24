import { Component, OnInit } from '@angular/core';
import { Cuota } from 'src/app/models/cuota';
import { CuotaService } from 'src/app/service/cuota.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-registrar-cuotas',
  templateUrl: './registrar-cuotas.component.html',
  styleUrls: ['./registrar-cuotas.component.css']
})
export class RegistrarCuotasComponent implements OnInit {

  persona:any

  modoPago:string=''
  montoAPagar:number=0
  fechaPago!:Date
  mesAPagar:string=''

  constructor(private pagosService: CuotaService,private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  registrarCuota(){
    var cuotaGuardar: Cuota
    cuotaGuardar = new Cuota()


    try {
      this.pagosService.guardarCuota(cuotaGuardar).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerDatosPersona(){
    try {
      this.personaService.obtenerPersona(' ppppp ').subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.persona = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  comprobarDebeCuota(){

  }

  generarComprobante(){

  }
}
