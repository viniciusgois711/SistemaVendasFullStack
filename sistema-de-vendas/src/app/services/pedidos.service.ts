import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  urlPedidosApi = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  getPedidosApi() {
    return this.http.get(this.urlPedidosApi);
  }

  postPedidosApi(pedido: any) {
    return this.http.post(this.urlPedidosApi, pedido);
  }

  deletePedidosApi(pedido: any) {
    return this.http.delete(`${this.urlPedidosApi}/${pedido.id}`);
  }

  editPedidosApi(pedido: any) {
    return this.http.put(`${this.urlPedidosApi}/${pedido.id}`, pedido);
  }

  getItensPedidoApi(pedido: any) {
    return this.http.get(`${this.urlPedidosApi}/${pedido.id}`);
  }
}
