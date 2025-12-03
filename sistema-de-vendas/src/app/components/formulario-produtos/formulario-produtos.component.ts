import { Component, OnInit } from '@angular/core';
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
export class FormularioProdutosComponent{

  produto = {
    id: 0,
    nome: "",
    preco: 0.0,
    classificacao: ""
  }

  
  constructor(private router: Router, private produtoService: ProdutosService){

    const state = router.getCurrentNavigation()?.extras.state;
    
    if(state){
      this.produto = state['produtoAlterar'];
    }
  }

  paginaListagemProdutos(){
    this.router.navigate(['/listagem-produtos']);
  }

  salvar(){
    if(this.produto.id == 0){
      this.addProduto();
    }else{
      this.alterarProduto()
    }

    this.router.navigate(['/listagem-produtos']);
  }

  addProduto(){
    this.produtoService.postProdutosApi(this.produto).subscribe({
      next: (produto) => console.log(produto),
      error: (error) => console.log(error)
    })
  }

  alterarProduto(){
    this.produtoService.putProdutosApi(this.produto).subscribe({
      next: (produto) => console.log(produto),
      error: (error) => console.log(error)
    })
  }

}
