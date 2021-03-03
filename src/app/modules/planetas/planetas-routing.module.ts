import { FormComponent } from '../planetas/components/form/form.component';
import { ShowComponent } from '../planetas/components/show/show.component';
import { ListComponent } from '../planetas/components/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'listar',
    component: ListComponent
  },
  {
    path: 'show/:id',
    component: ShowComponent
  },
  {
    path: 'edit/:id',
    component: FormComponent
  },
  {
    path: 'create/',
    component: FormComponent
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetasRoutingModule { }
