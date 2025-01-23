import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-formulario-pedidos',
  standalone: true,
  imports: [PoButtonModule, PoFieldModule, FormsModule, NgFor, PoContainerModule, PoTableModule],
  templateUrl: './formulario-pedidos.component.html',
  styleUrl: './formulario-pedidos.component.css'
})
export class FormularioPedidosComponent {

  item: any = {
    id_produto: 0,
    descricao: "",
    quantidade: 0,
    preco_unitario: 0
  }

  pedido:any = {
    id: 0,
    id_cliente: 0,
    condicao_pagamento: '',
    observacao: '',
    itens: []
  }

  constructor(private router: Router, private pedidosService: PedidosService){}

  paginaListarPedidos(){
    this.router.navigate(['/listagem-pedidos'])
  }
  // {
  //   "id_produto": 4,
  //   "descricao": "mno",
  //   "quantidade": 2,
  //   "preco_unitario": 20.50
  // }

  public readonly colunasItens: Array<PoTableColumn> = [
    { property: "id_produto", label: "ID Produto" },
    { property: "descricao", label: "Descrição" },
    { property: "quantidade", label: "Quantidade" },
    { property: "preco_unitario", label: "Preço Unitário" },
  ]

  adicionarItem(){
    this.pedido.itens.push(this.item);
    this.item = {
          id_produto: 0,
          descricao: "",
          quantidade: 0,
          preco_unitario: 0
        }
  }

  // addItem(){
  //   let item = {
  //     id_produto: "",
  //     descricao: "",
  //     quantidade: 0,
  //     preco_unitario: 0
  //   }
  //   this.pedido.itens.push(item);
  // }

  salvar(){
    this.addPedido(this.pedido);

    this.router.navigate(['/listagem-pedidos']);
  }

  addPedido(pedido: any){
    this.pedidosService.postPedidosApi(pedido).subscribe({
      next: (dado) => {
        console.log(dado)  
      },
      error: (error) => console.log(error)
    })
  }

}
