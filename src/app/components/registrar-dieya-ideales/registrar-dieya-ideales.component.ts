import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-registrar-dieya-ideales',
  templateUrl: './registrar-dieya-ideales.component.html',
  styleUrls: ['./registrar-dieya-ideales.component.css']
})
export class RegistrarDieyaIdealesComponent implements OnInit {

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

}
