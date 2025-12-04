import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  urlApiProdutos = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  getProdutosApi() {
    return this.http.get(this.urlApiProdutos);
  }

  postProdutosApi(produto: any) {
    return this.http.post(this.urlApiProdutos, produto);
  }

  putProdutosApi(produto: any) {
    return this.http.put(`${this.urlApiProdutos}/${produto.id}`, produto);
  }

  deleteProdutosApi(produtos: any): Observable<any> {
    return this.http.delete(`${this.urlApiProdutos}/${produtos.id}`);
  }

  // Código duplicado de clientes.service.ts - exemplo de duplicação
  getClientesApi(path = ''): Observable<any> {
    return this.http.get<any>('http://localhost:3000/clientes' + path);
  }

  postClienteApi(cliente: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/clientes', cliente);
  }

  putClienteApi(cliente: any): Observable<any> {
    return this.http.put<any>(`${'http://localhost:3000/clientes'}/${cliente.id}`, cliente);
  }

  deleteClienteApi(cliente: any): Observable<any> {
    return this.http.delete<any>(`${'http://localhost:3000/clientes'}/${cliente.id}`);
  }
}
