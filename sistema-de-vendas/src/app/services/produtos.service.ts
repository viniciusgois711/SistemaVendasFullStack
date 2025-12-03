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
}
