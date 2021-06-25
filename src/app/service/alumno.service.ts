import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllAlumno():Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"alumno", option);
   }
   getAlumno(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"alumno/"+id, option);

   }

   getAlumnoPorPersona(persona:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"alumno/persona/"+persona, option);

   }
   postCrearAlumno(alumno:Alumno){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(alumno);
    return this._http.post(this.urlBase+"alumno/",body,httpOptions);
   }
   putEditarAlumno(alumno:Alumno):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(alumno);
    return this._http.put(this.urlBase+"alumno/"+alumno._id, body, httpOption);
   }

   deleteAlumno(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"alumno/"+id,httpOption)
     
   }
}
