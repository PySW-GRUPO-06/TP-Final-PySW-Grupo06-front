import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './service/login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CuotaComponent } from './components/cuota/cuota.component';
import { PlanComponent } from './components/plan/plan.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PrincipalEntrenadorComponent } from './components/principal-entrenador/principal-entrenador.component';
import { PrincipalAlumnosComponent } from './components/principal-alumnos/principal-alumnos.component';
import { InscribirNuevoAlumnoComponent } from './components/inscribir-nuevo-alumno/inscribir-nuevo-alumno.component';
import { RegistrarCuotasComponent } from './components/registrar-cuotas/registrar-cuotas.component';
import { AdministrarRutinasComponent } from './components/administrar-rutinas/administrar-rutinas.component';
import { RegistrarAsistenciaComponent } from './components/registrar-asistencia/registrar-asistencia.component';
import { RegistrarDieyaIdealesComponent } from './components/registrar-dieya-ideales/registrar-dieya-ideales.component';
import { AdministrarAlumnosComponent } from './components/administrar-alumnos/administrar-alumnos.component';
import { AdministrarDatosDeUnAlumnoComponent } from './components/administrar-datos-de-un-alumno/administrar-datos-de-un-alumno.component';
import { AdministrarEntrenadorComponent } from './components/administrar-entrenador/administrar-entrenador.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AsistenciaComponent,
    CuotaComponent,
    PlanComponent,
    PrincipalComponent,
    PrincipalEntrenadorComponent,
    PrincipalAlumnosComponent,
    InscribirNuevoAlumnoComponent,
    RegistrarCuotasComponent,
    AdministrarRutinasComponent,
    RegistrarAsistenciaComponent,
    RegistrarDieyaIdealesComponent,
    AdministrarAlumnosComponent,
    AdministrarDatosDeUnAlumnoComponent,
    AdministrarEntrenadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AlifeFileToBase64Module,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
