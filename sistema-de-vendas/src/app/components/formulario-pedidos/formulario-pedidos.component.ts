import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-formulario-pedidos',
  standalone: true,
  imports: [PoButtonModule],
  templateUrl: './formulario-pedidos.component.html',
  styleUrl: './formulario-pedidos.component.css'
})
export class FormularioPedidosComponent {

  constructor(private router: Router){}

  paginaListarPedidos(){
    this.router.navigate(['/listagem-pedidos'])
  }

}
