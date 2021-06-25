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

  rutina:Rutina=new Rutina();
  dia:Dia=new Dia();
  ejercicio:Ejercicio=new Ejercicio;
  rutinas:Array<Rutina>=new Array<Rutina>();

  constructor(private rutinaService:RutinaService,
              private diaService:DiaEjercicioService,
              private ejercicioService:EjercicioService,
              public loginService: LoginService, private router: Router) {
                
                if(this.loginService.userLoggedIn()){
                  //acciones normales de componente
                  //acciones normales de componente
                  } else {
                  alert("Debe validarse e ingresar su usuario y clave");
                  this.router.navigate(['login']);
                  }
               }

  ngOnInit(): void {
  }
crearRutina(){
  try {
    this.rutinaService.guardarRutina(this.rutina).subscribe(
      result=>{
        console.log("se guardo rutina"+result);
      }
    )
  } catch (error) {
    console.log(error);
  }
}
agregarDia(){
  try {
    this.diaService.postDiaEjercicio(this.dia).subscribe(
      result=>{
        console.log(""+result);
      }
    )
  } catch (error) {
    console.log(""+error);
  }
}
agregarEjercicio(){
  try {
    this.ejercicioService.guardarEjercicio(this.ejercicio).subscribe(
      result=>{
        console.log(""+result);
        
      }
    )
  } catch (error) {
    console.log(""+error);
  }
}
mostrarRutinas(){
  try {
    this.rutinaService.obtenerRutinas().subscribe(
      result=>{
        result.forEach((element:any) => {
          let vRutina=new Rutina();
          Object.assign(vRutina,element);
          this.rutinas.push(vRutina);
        });
      }
    )
  } catch (error) {
    console.log(""+error);
  }
}
}
