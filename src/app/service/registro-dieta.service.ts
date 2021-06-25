import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroDieta } from '../models/registro-dieta';

@Injectable({
  providedIn: 'root'
})
export class RegistroDietaService {

  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllRegistroDieta():Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"registroDieta", option);
   }
   getRegistroDieta(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"registroDieta/"+id, option);

   }
   postCrearRegistroDieta(registroDieta:RegistroDieta){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(registroDieta);
    return this._http.post(this.urlBase+"registroDieta/",body,httpOptions);
   }
   putEditarRegistroDieta(registroDieta:RegistroDieta):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(registroDieta);
    return this._http.put(this.urlBase+"registroDieta/"+registroDieta._id, body, httpOption);
   }

   deleteRegistroDieta(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"registroDieta/"+id,httpOption)
     
   }
}
