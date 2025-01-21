import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-formulario-clientes',
  standalone: true,
  imports: [PoButtonModule],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.css'
})
export class FormularioClientesComponent {

  constructor(private router: Router){

  }

  paginaListagemClientes(){
    this.router.navigate(['/listagem-clientes']);
  }
}
