import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-formulario-pedidos',
  standalone: true,
  imports: [PoButtonModule, PoFieldModule, FormsModule],
  templateUrl: './formulario-pedidos.component.html',
  styleUrl: './formulario-pedidos.component.css'
})
export class FormularioPedidosComponent {

  pedido:any = {
    id: 0,
    id_cliente: 0,
    condicao_pagamento: '',
    observacao: '',
    valor_total: 0.0
  }

  constructor(private router: Router){}

  paginaListarPedidos(){
    this.router.navigate(['/listagem-pedidos'])
  }

}
