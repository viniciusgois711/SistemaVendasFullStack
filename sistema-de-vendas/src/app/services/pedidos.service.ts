import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlPedidosApi = "http://localhost:3000/pedidos";

  constructor(private http: HttpClient) { }

  getPedidosApi(){
    return this.http.get(this.urlPedidosApi);
  }

}
