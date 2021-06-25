import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-principal-entrenador',
  templateUrl: './principal-entrenador.component.html',
  styleUrls: ['./principal-entrenador.component.css']
})
export class PrincipalEntrenadorComponent implements OnInit {

  constructor(private route:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  irAInscribirNuevoAlumno():void{
    this.route.navigate(['inscribirNuevoAlumno']);
 }

 irARegistrarPagoCuota():void{
  this.route.navigate(['registrarCuotas']);
}

irARegistrarAsistencia():void{
  this.route.navigate(['registrarAsistencia']);
}

irAGenerarModifRutinas():void{
  this.route.navigate(['administrarRutinas']);
}
}
