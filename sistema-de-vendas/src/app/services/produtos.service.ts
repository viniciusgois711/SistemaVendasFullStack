import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  urlApiProdutos = "http://localhost:3000/produtos";

  constructor(private http: HttpClient) { }

  getProdutosApi(){
    return this.http.get(this.urlApiProdutos);
  }

  postProdutosApi(produto: any){
    return this.http.post(this.urlApiProdutos, produto);
  }


}
