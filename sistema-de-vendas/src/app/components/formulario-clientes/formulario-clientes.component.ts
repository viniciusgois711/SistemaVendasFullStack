import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-formulario-clientes',
  standalone: true,
  imports: [PoButtonModule, PoFieldModule, FormsModule ],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.css'
})
export class FormularioClientesComponent {

  cliente = {
    id: 0,
    nome: '',
    cnpj: ''
  }
  
  constructor(private router: Router, private clientesService: ClientesService){

    let state: any = this.router.getCurrentNavigation()?.extras.state;

    if(state){
      this.cliente = state['clienteAlterar'];
    }
    
  }

  paginaListagemClientes(){
    this.router.navigate(['/listagem-clientes']);
  }

  salvar(){
    if(this.cliente.id != 0){
      this.putCliente(this.cliente);
    }else{
      this.postCliente();
    }
    this.router.navigate(['/listagem-clientes']);
  }

  postCliente(){
    this.clientesService.postClienteApi(this.cliente).subscribe({
      next: (dados) => {
        console.log(dados);
      },

    })
    this.router.navigate(['/listagem-clientes']);
  }

  putCliente(cliente: any){
    this.clientesService.putClienteApi(this.cliente).subscribe({
      next: (dados) => console.log(dados),
      error: (error) => console.log(error)
    })
  }
}
