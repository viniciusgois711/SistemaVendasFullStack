import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoButtonModule, PoTableAction, PoTableColumn, PoTableModule,
} from '@po-ui/ng-components';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [PoButtonModule, PoTableModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrl: './listagem-produtos.component.css',
})
export class ListagemProdutosComponent implements OnInit {
  produtos:any = [];

  constructor(private router: Router, private produtosService: ProdutosService) {

  }

  ngOnInit() {
    this.getProdutos();
  }

  paginaFormularioProduto() {
    this.router.navigate(['/formulario-produtos']);
  }

  public readonly colunas: Array<PoTableColumn> = [
    { property: 'id', label: 'ID' },
    { property: 'nome', label: 'Nome' },
    { property: 'preco', label: 'Preço' },
    { property: 'classificacao', label: 'Classificação' },
    { property: 'acoes', label: 'Ações' },
  ];

  public readonly acoes: Array<PoTableAction> = [
    { label: 'Excluir', action: this.deletarProduto.bind(this) },
    { label: 'Editar', action: this.editarProduto.bind(this) },
  ];

  getProdutos() {
    this.produtosService.getProdutosApi().subscribe({
      next: (produtos) => this.produtos = produtos,
      error: (error) => console.log(error),
    });
  }

  editarProduto(produto: any) {
    this.router.navigate(['/formulario-produtos'], { state: { produtoAlterar: produto } });
  }

  deletarProduto(produto: any) {
    this.produtosService.deleteProdutosApi(produto).subscribe({
      next: () => this.getProdutos(),
      error: (error) => console.log(error),
    });
  }
}
