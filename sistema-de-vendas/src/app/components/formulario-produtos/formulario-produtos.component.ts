import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-formulario-produtos',
  standalone: true,
  imports: [PoButtonModule],
  templateUrl: './formulario-produtos.component.html',
  styleUrl: './formulario-produtos.component.css'
})
export class FormularioProdutosComponent {

  constructor(private router: Router){

  }

  paginaListagemProdutos(){
    this.router.navigate(['/listagem-produtos']);
  }

}
