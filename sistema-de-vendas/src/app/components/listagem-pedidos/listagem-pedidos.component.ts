import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule, PoTableAction, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-listagem-pedidos',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css'
})
export class ListagemPedidosComponent implements OnInit{

  pedidos:any = []

  ngOnInit(): void {
    this.getPedidos();
  }

  constructor(private router: Router, private pedidosService: PedidosService){}

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

  public readonly acoes: Array<PoTableAction> = [
    {label: "Excluir", action: this.excluirPedido.bind(this)},
    {label: "Editar", action: this.editarPedido.bind(this)}
  ]

  getPedidos(){
    this.pedidosService.getPedidosApi().subscribe({
      next: (pedidos) => {this.pedidos = pedidos},
      error: (error) => console.log(error)
    })
  }

  excluirPedido(pedido: any){
    this.pedidosService.deletePedidosApi(pedido).subscribe({
      next: () => this.getPedidos(),
      error: (error) => console.log(error)
    });
  }

  editarPedido(pedido:any){
    console.log(pedido)
    this.router.navigate(['formulario-pedidos'], {state: {pedidoAlterar: pedido}});
  }



}
