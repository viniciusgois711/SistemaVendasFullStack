import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-formulario-produtos',
  standalone: true,
  imports: [PoButtonModule, PoFieldModule, FormsModule],
  templateUrl: './formulario-produtos.component.html',
  styleUrl: './formulario-produtos.component.css'
})
export class FormularioProdutosComponent {

  produto = {
    id: 0,
    nome: "",
    preco: 0.0,
    classificacao: ""
  }

  constructor(private router: Router, private produtoService: ProdutosService){

  }

  paginaListagemProdutos(){
    this.router.navigate(['/listagem-produtos']);
  }

  salvar(){
    if(this.produto.id == 0){
      this.addProduto();
    }

    this.router.navigate(['/listagem-produtos']);
  }

  addProduto(){
    this.produtoService.postProdutosApi(this.produto).subscribe({
      next: (produto) => console.log(produto),
      error: (error) => console.log(error)
    })
  }

}
