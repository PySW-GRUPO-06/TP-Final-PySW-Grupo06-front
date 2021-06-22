import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  urlBase:string=""
  constructor(private _http:HttpClient) {
    this.urlBase="http://localhost:3000/api/";
   }

   getAllPlanes():Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"plan", option);
   }
   getPlan(id:string):Observable<any>{
    let option = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams({

      })
    }
    return this._http.get(this.urlBase+"plan/"+id, option);

   }
   postCrearPlan(plan:Plan){
    const httpOptions= {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({   
      })
    }
    let body=JSON.stringify(plan);
    return this._http.post(this.urlBase+"plan/",body,httpOptions);
   }
   putEditarPlan(plan:Plan):Observable<any>{
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }

    let body = JSON.stringify(plan);
    return this._http.put(this.urlBase+"plan/"+plan._id, body, httpOption);
   }

   deletePlan(id:string){
     
   }

}
