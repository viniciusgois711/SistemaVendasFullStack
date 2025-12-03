import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  PoButtonModule,
  PoTableModule,
  PoTableColumn,
  PoTableAction,
} from '@po-ui/ng-components';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.css',
})
export class ListagemClientesComponent implements OnInit {
  cliente = {
    nome: '',
    cnpj: '',
  };

  clientes:Array<any> = [];

  constructor(private router: Router, private clientesService: ClientesService) {

  }

  ngOnInit() {
    this.getClientes();
  }

  readonly colunas: Array<PoTableColumn> = [
    { property: 'id', label: 'ID' },
    { property: 'nome', label: 'Nome' },
    { property: 'cnpj', label: 'CNPJ' },
    { property: 'acoes', label: 'Ações' },
  ];

  readonly acoes: Array<PoTableAction> = [
    { label: 'editar', action: this.paginaEditarCliente.bind(this) },
    { label: 'excluir', action: this.deleteCliente.bind(this) },
  ];

  paginaFormularioClientes() {
    this.router.navigate(['formulario-clientes']);
  }

  paginaEditarCliente(cliente: any) {
    this.router.navigate(['/formulario-clientes'], { state: { clienteAlterar: cliente } });
  }

  deleteCliente(cliente: any) {
    this.clientesService.deleteClienteApi(cliente).subscribe({
      next: () => this.getClientes(),
    });
  }

  getClientes() {
    this.clientesService.getClientesApi().subscribe({
      next: (dados) => {
        this.clientes = dados;
      },
      error: (error) => {
        alert('error');
      },
    });
  }
}
