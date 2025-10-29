import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoButtonModule,
  PoTableModule,
  PoModalModule,
  PoFieldModule

} from '@po-ui/ng-components';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoButtonModule,
    PoTableModule,
    PoModalModule,
    PoFieldModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'sistema-de-vendas';

  constructor(private router: Router){

  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Clientes', action: this.listagemClientes.bind(this) },
    { label: 'Produtos', action: this.listagemProdutos.bind(this)},
    { label: 'Pedidos', action: this.listagemPedidos.bind(this)}
  ];

  listagemClientes(){
    this.router.navigate(['/listagem-clientes']);
  }
  listagemProdutos(){
    this.router.navigate(['/listagem-produtos']);
  }
  listagemPedidos(){
    this.router.navigate(['/listagem-pedidos']);
  }

}


/**
 * @deprecated Use novaFuncao() em vez disso.
*/

export function funcaoAntiga() {
  console.log("Essa função está depreciada");
}

export function novaFuncao() {
  console.log("Essa é a nova função");
}

// Chamando a função deprecada para testar o lint
novaFuncao();