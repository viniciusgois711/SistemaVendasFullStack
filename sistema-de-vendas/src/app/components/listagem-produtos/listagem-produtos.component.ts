import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrl: './listagem-produtos.component.css'
})
export class ListagemProdutosComponent {

  constructor(private router: Router){

  }

  paginaFormularioProduto(){
    this.router.navigate(['/formulario-produtos']);
  }

  public readonly colunas: Array<PoTableColumn> = [
    {property: "id", label: "ID"},
    {property: "nome", label: "Nome"},
    {property: "preco", label: "Preço"},
    {property: "classificacao", label: "Classificação"},
    {property: "acoes", label: "Ações"}
  ]

}
