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
export class AppComponent {
  title = 'sistema-de-vendas';

  constructor(private router: Router){

  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Listagem de Clientes', action: this.listagemClientes.bind(this) },
    { label: 'Listagem de Produtos', action: this.listagemProdutos.bind(this)},
  ];

  listagemClientes(){
    this.router.navigate(['/listagem-clientes']);
  }
  listagemProdutos(){
    this.router.navigate(['/listagem-produtos']);
  }
}
