import { Component, OnInit } from '@angular/core';
import { Cuota } from 'src/app/models/cuota';
import { AlumnoService } from 'src/app/service/alumno.service';
import { CuotaService } from 'src/app/service/cuota.service';
import { PersonaService } from 'src/app/service/persona.service';
import { PlanService } from 'src/app/service/plan.service';

@Component({
  selector: 'app-registrar-cuotas',
  templateUrl: './registrar-cuotas.component.html',
  styleUrls: ['./registrar-cuotas.component.css']
})
export class RegistrarCuotasComponent implements OnInit {

  persona:any

  dni:string=''
  modoPago:string=''
  montoAPagar:number=0
  fechaPago!:Date
  mesAPagar:string=''

  private plan:any
  private cuotaGuardar!: Cuota
  private alumno: any

  constructor(private pagosService: CuotaService,private personaService: PersonaService,
    private planService: PlanService, private alumnoService: AlumnoService) { }

  ngOnInit(): void {
  }

  registrarCuota(){
    this.cuotaGuardar = new Cuota()
    this.cuotaGuardar.modoPago=this.modoPago
    this.cuotaGuardar.mesAPagar=this.mesAPagar
    this.cuotaGuardar.montoAPagar=this.montoAPagar
    this.cuotaGuardar.fechaPago=this.fechaPago

    try {
      this.pagosService.guardarCuota(this.cuotaGuardar).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result

          this.obtenerPlan()
          this.guardarEnPlan(result.id)
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerDatosPersona(){
    try {
      this.personaService.obtenerPersonaDNI(this.dni).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.persona = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }

    try {
      this.alumnoService.getAlumnoPorPersona(this.persona._id).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.alumno = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerPlan(){
    try {
      this.planService.getPlan(this.alumno.planActivo._id).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.plan = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  guardarEnPlan(idCuota:string){
    try {
      this.plan.pago.push(idCuota)
      this.planService.putEditarPlan(this.plan).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.plan = result
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
