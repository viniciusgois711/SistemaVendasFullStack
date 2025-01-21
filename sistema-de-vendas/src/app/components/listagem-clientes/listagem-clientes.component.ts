import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { 
  PoButtonModule,
  PoTableModule,
  PoTableColumn
} from '@po-ui/ng-components';

@Component({
  selector: 'app-listagem-clientes',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-clientes.component.html',
  styleUrl: './listagem-clientes.component.css'
})
export class ListagemClientesComponent {

  constructor(private router: Router){

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

}
