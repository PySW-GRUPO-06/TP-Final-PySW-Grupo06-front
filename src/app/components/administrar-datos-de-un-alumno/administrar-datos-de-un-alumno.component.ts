import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-administrar-datos-de-un-alumno',
  templateUrl: './administrar-datos-de-un-alumno.component.html',
  styleUrls: ['./administrar-datos-de-un-alumno.component.css']
})
export class AdministrarDatosDeUnAlumnoComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router) {
                
    if(this.loginService.userLoggedIn()){
      //acciones normales de componente
      //acciones normales de componente
      } else {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
      } }

  ngOnInit(): void {
  }

  volverAPrincipal(){
    this.router.navigate(['principalEntrenador']);
  }

}
