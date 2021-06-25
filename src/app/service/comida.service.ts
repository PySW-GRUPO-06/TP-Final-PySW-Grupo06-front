import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comida } from '../models/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllComida():Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"comida", option);
   }
   getComida(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"comida/"+id, option);

   }
   postCrearComida(comida:Comida){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(comida);
    return this._http.post(this.urlBase+"comida/",body,httpOptions);
   }
   putEditarComida(comida:Comida):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(comida);
    return this._http.put(this.urlBase+"comida/"+comida._id, body, httpOption);
   }

   deleteComida(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"comida/"+id,httpOption)
     
   }
}
