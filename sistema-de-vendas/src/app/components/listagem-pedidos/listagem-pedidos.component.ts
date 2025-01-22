import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-listagem-pedidos',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css'
})
export class ListagemPedidosComponent {

  constructor(private router: Router){}

  paginaAddPedido(){
    this.router.navigate(['/formulario-pedidos']);
  }

  public readonly colunas: Array<PoTableColumn> = [
    { property: "id", label: 'ID' },
    { property: "id_cliente", label: 'ID_Cliente' },
    { property: "condicao_pagamento", label: 'Condição de Pagamento' },
    { property: "valor_total", label: 'Valor Total' },
    { property: "acoes", label: 'Ações'}
  ]

}
