import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarRutinasComponent } from './components/administrar-rutinas/administrar-rutinas.component';
import { InscribirNuevoAlumnoComponent } from './components/inscribir-nuevo-alumno/inscribir-nuevo-alumno.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalEntrenadorComponent } from './components/principal-entrenador/principal-entrenador.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistrarAsistenciaComponent } from './components/registrar-asistencia/registrar-asistencia.component';
import { RegistrarCuotasComponent } from './components/registrar-cuotas/registrar-cuotas.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'principalEntrenador', component: PrincipalEntrenadorComponent },
  { path: 'inscribirNuevoAlumno', component: InscribirNuevoAlumnoComponent },
  { path: 'registrarCuotas', component: RegistrarCuotasComponent },
  { path: 'registrarAsistencia', component: RegistrarAsistenciaComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'administrarRutinas', component: AdministrarRutinasComponent },
  { path: '**', pathMatch:'full',redirectTo:'principal' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
