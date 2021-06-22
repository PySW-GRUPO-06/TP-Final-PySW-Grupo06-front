import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalEntrenadorComponent } from './components/principal-entrenador/principal-entrenador.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principalEntrenador', component: PrincipalEntrenadorComponent },
  { path: '**', pathMatch:'full',redirectTo:'principal' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
