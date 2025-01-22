import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrl: './listagem-produtos.component.css'
})
export class ListagemProdutosComponent implements OnInit{

  produtos:any = []

  constructor(private router: Router, private produtosService: ProdutosService){

  }

  ngOnInit(){
    this.getProdutos();
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

  getProdutos(){
    this.produtosService.getProdutosApi().subscribe({
      next: (produtos) => this.produtos = produtos,
      error: (error) => console.log(error)
    })
  }

}
