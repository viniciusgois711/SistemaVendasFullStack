import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlApi = "localhost:3000/clientes";

  constructor(private http: HttpClient) { }

  getClientesApi(): Observable<any>{
    return this.http.get<any>(this.urlApi);
  }

}
