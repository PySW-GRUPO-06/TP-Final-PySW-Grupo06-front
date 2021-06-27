import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  pest1:boolean=true;
  pest2:boolean=false;
  pest3:boolean=false;
  pest4:boolean=false;

  constructor(private route:Router,
    private activatedRoute:ActivatedRoute) { }
  

  ngOnInit(): void {
  }

  registrarse():void{
     this.route.navigate(['login']);
  }

  variacionPest1(){
    this.pest1=true;
    this.pest2=false;
    this.pest3=false;

      }

  variacionPest2(){
    this.pest1=false;
    this.pest2=true;
    this.pest3=false;

    }

    variacionPest3(){
      this.pest1=false;
      this.pest2=false;
      this.pest3=true;
        }

}
