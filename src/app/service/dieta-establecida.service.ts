import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DietaEstablecida } from '../models/dieta-establecida';

@Injectable({
  providedIn: 'root'
})
export class DietaEstablecidaService {

  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllDietaEstablecida():Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"dietaEstablecida", option);
   }
   getDietaEstablecida(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"dietaEstablecida/"+id, option);

   }
   postCrearDietaEstablecida(dietaEstablecida:DietaEstablecida){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(dietaEstablecida);
    return this._http.post(this.urlBase+"dietaEstablecida/",body,httpOptions);
   }
   putEditarDietaEstablecida(dietaEstablecida:DietaEstablecida):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(dietaEstablecida);
    return this._http.put(this.urlBase+"dietaEstablecida/"+dietaEstablecida._id, body, httpOption);
   }

   deleteDietaEstablecida(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"dietaEstablecida/"+id,httpOption)
     
   }
}
