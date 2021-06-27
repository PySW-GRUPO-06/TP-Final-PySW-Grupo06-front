import { Component, OnInit } from '@angular/core';
import { RegistroDieta } from 'src/app/models/registro-dieta';
import { Usuario } from 'src/app/models/usuario';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { CuotaService } from 'src/app/service/cuota.service';
import { DietaService } from 'src/app/service/dieta.service';
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
  usuario: any
  dieta: any
  registroDieta: Array<any> = []

  fotoRegistroDieta:string = ''
  alturaRegistroDieta:number = 0
  pesoRegistroDieta:number = 0
  fechaRegistroDieta!:Date
  caloriasRegistroDieta:number = 0
  proteinasRegistroDieta:number = 0

  userName:string = ''
  password:string = ''

  private idUsuario:string = ''
  private idRutina:string = ''

  private token : string = ''

  tabla1:boolean=true;
  tabla2:boolean=false;
  tabla3:boolean=false;
  

  constructor(private asistenciaAlumnoService: AsistenciaService, private pagosService: CuotaService,
    private rutinaService : RutinaService, private usuarioService: UsuarioService,
    private dietaService: DietaService, private registroDietaService: RegistroDietaService) { 
      /* this.obtenerToken()
      this.obtenerIDs()
      this.obtenerRutina()
      this.obtenerAsistencia()
      this.obtenerPagos()
      this.obtenerUsuario()
      this.obtenerDietaIdeal()
      this.obtenerRegistroDieta() */
    }

  ngOnInit(): void {
  }

  obtenerToken(){

  }

  obtenerIDs(){
    this.idUsuario=''
    this.idRutina=''
  }

  obtenerAsistencia() {
    try {
      this.asistenciaAlumnoService.getAsistencia('ppppppppppp').subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.asistencia = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerPagos() {
    try {
      this.pagosService.obtenerCuota('ppppppppppppppp').subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.cuotas = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerRutina() {
    try {
      this.rutinaService.obtenerRutina(this.idRutina).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.rutinaService = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerUsuario(){
    try {
      this.usuarioService.obtenerUsuario(this.idUsuario).subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.usuario = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  modificarUsuario(){
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

  obtenerDietaIdeal(){
    try {
      this.dietaService.obtenerDieta('').subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.dieta = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }

  obtenerRegistroDieta(){
    try {
      this.registroDietaService.getAllRegistroDieta().subscribe(
        (result) => {
          /* console.log(result); */
          const resultado = result
          this.registroDieta = result
        });
    } catch (error) {
      console.error("ERROR " + error + ", NO SE PUDO OBTENER DATOS CORRECTAMENTE")
    }
  }


  guardarRegistroDieta(){
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

  variacionPest1(){
this.tabla1=true;
this.tabla2=false;
this.tabla3=false;

  }
  variacionPest2(){
    this.tabla1=false;
    this.tabla2=true;
    this.tabla3=false;
  }
  variacionPest3(){
    this.tabla1=false;
    this.tabla2=false;
    this.tabla3=true;
  }


}
