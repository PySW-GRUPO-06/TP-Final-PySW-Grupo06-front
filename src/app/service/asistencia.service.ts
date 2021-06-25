import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllAsistencia():Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"asistencia", option);
   }
   getAsistencia(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"asistencia/"+id, option);

   }
   postCrearAsistencia(asistencia:Asistencia){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(asistencia);
    return this._http.post(this.urlBase+"asistencia/",body,httpOptions);
   }
   putEditarAsistencia(asistencia:Asistencia):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(asistencia);
    return this._http.put(this.urlBase+"asistencia/"+asistencia._id, body, httpOption);
   }

   deleteAsistencia(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"asistencia/"+id,httpOption)
     
   }
}
