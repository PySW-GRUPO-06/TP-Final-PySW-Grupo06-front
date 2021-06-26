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

  persona: any

  dni: number = 41750208
  modoPago: string = 'tarjeta'
  montoAPagar: number = 1000
  /* fechaPago!: Date */
  mesAPagar: string = 'enero'

  private plan: any
  private cuotaGuardar!: Cuota
  private alumno: any
  private registrar : boolean = false

  constructor(private pagosService: CuotaService, private personaService: PersonaService,
    private planService: PlanService, private alumnoService: AlumnoService) {
    /* this.obtenerDatosPersona() */
  }

  ngOnInit(): void {
  }

  realizarPago(){
    this.registrar=true
    this.obtenerDatosPersona()
  }

  private registrarCuota() {
    this.cuotaGuardar = new Cuota()
    this.cuotaGuardar.modoPago = this.modoPago
    this.cuotaGuardar.mesAPagar = this.mesAPagar
    this.cuotaGuardar.montoAPagar = this.montoAPagar
    this.cuotaGuardar.fechaPago = new Date()

    try {
      this.pagosService.guardarCuota(this.cuotaGuardar).subscribe(
        (result) => {
          console.log(result);
          const resultado = result

          this.guardarEnPlan(result.id)
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerDatosPersona() {
    try {
      this.personaService.obtenerPersonaDNI(String(this.dni)).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.persona = result[0]

          try {
            this.alumnoService.getAlumnoPorPersona(this.persona._id).subscribe(
              (result) => {
                /* console.log(result); */
                const resultado = result
                this.alumno = result[0]
                console.log('alumnoooooooooo')
                console.log(this.alumno)

                if (this.registrar){
                  this.registrarCuota()
                }
              });
          } catch (error) {
            console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
          }
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  private guardarEnPlan(idCuota: string) {
    try {
      console.log('guardar en plan, obtener plan')
      console.log(this.alumno)
      this.planService.getPlan(this.alumno.planActivo).subscribe(
        (result) => {
          console.log('plan')
          console.log(result);
          const resultado = result
          this.plan = result

          try {
            this.plan.pago.push(idCuota)
            this.planService.putEditarPlan(this.plan).subscribe(
              (result) => {
                console.log(result);
                const resultado = result
                this.plan = result

                this.registrar=false
              });
          } catch (error) {
            console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
          }
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }

  }

  comprobarDebeCuota() {

  }

  generarComprobante() {

  }
}
