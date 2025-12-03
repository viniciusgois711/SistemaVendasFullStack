import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  urlApi = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  getClientesApi(path = ''): Observable<any> {
    return this.http.get<any>(this.urlApi + path);
  }

  postClienteApi(cliente: any): Observable<any> {
    return this.http.post<any>(this.urlApi, cliente);
  }

  putClienteApi(cliente: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${cliente.id}`, cliente);
  }

  deleteClienteApi(cliente: any): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${cliente.id}`);
  }
}
