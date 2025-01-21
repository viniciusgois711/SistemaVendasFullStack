import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  PoButtonModule,
  PoTableModule,
  PoTableColumn
} from '@po-ui/ng-components';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.css'
})
export class ListagemClientesComponent implements OnInit {

  clientes:Array<any> = []

  constructor(private router: Router, private clientesService: ClientesService){

  }

  ngOnInit(){
    this.getClientes();
  }

  readonly colunas: Array<PoTableColumn> = [
    {property: 'id', label: 'ID'},
    {property: 'nome', label: 'Nome'},
    {property: 'cnpj', label: 'CNPJ'},
    {property: 'acoes', label: 'Ações'}
  ]

  paginaFormularioClientes(){
    this.router.navigate(['formulario-clientes']);
  }

  getClientes(): void{
    this.clientesService.getClientesApi().subscribe({
      next: (dados) => {
        console.log(dados);
        this.clientes = dados;
      },
      error: (error) => {
        alert("Algo deu errado");
      }
    })
  }

}
