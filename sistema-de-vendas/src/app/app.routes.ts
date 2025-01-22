import { Routes } from '@angular/router';
import { ListagemClientesComponent } from './components/listagem-clientes/listagem-clientes.component';
import { AppComponent } from './app.component';
import { FormularioClientesComponent } from './components/formulario-clientes/formulario-clientes.component';
import { ListagemProdutosComponent } from './components/listagem-produtos/listagem-produtos.component';
import { FormularioProdutosComponent } from './components/formulario-produtos/formulario-produtos.component';

export const routes: Routes = [
    {path: 'listagem-clientes', component: ListagemClientesComponent},
    {path: 'formulario-clientes', component: FormularioClientesComponent},
    {path: 'listagem-produtos', component: ListagemProdutosComponent},
    {path: 'formulario-produtos', component: FormularioProdutosComponent}
];
