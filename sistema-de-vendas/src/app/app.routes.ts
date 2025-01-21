import { Routes } from '@angular/router';
import { ListagemClientesComponent } from './components/listagem-clientes/listagem-clientes.component';
import { AppComponent } from './app.component';
import { FormularioClientesComponent } from './components/formulario-clientes/formulario-clientes.component';

export const routes: Routes = [
    {path: 'listagem-clientes', component: ListagemClientesComponent},
    {path: 'formulario-clientes', component: FormularioClientesComponent}
];
