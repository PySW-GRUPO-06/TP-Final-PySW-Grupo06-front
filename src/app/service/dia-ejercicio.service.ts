import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dia } from '../models/dia';

@Injectable({
  providedIn: 'root'
})
export class DiaEjercicioService {

  urlBase:string=""
  constructor(private _http:HttpClient) { 
    this.urlBase="http://localhost:3000/api/";
  }
  getAllDiaEjercicio():Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"dia", option);
   }
   getDiaEjercicio(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"dia/"+id, option);

   }
   postDiaEjercicio(dia:Dia){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(dia);
    return this._http.post(this.urlBase+"dia/",body,httpOptions);
   }
   putEditarDiaEjercicio(dia:Dia):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(dia);
    return this._http.put(this.urlBase+"dia/"+dia._id, body, httpOption);
   }

   deleteDiaEjercicio(id:string):Observable<any>{
     const httpOption={
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
     }
     return this._http.delete(this.urlBase+"dia/"+id,httpOption)
     
   }
}
