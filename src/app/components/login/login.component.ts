import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute, private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['principalEntrenador'];
  }
  volver() {
    this.route.navigate(['principal']);
  }
  irAPricipalEntrenador() {
    this.route.navigate(['principalEntrenador']);
  }

  login() {
    
    this.loginService.login(this.userform.userName, this.userform.password)
      .subscribe(
        (result) => {
          var user = result;
          console.log(user)
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("perfil", user.perfil);
            sessionStorage.setItem("token", user.token);
            //redirigimos a home o a pagina que llamo
            /* this.router.navigateByUrl(this.returnUrl); */
            /* console.log('entroooooooooooooooooooo'+this.userform.userName) */
            this.irAPricipalEntrenador()
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
          
        }, error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });

  }
}
