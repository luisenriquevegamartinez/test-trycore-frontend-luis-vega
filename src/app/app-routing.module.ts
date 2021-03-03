import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'personas',
    loadChildren: () => import('./modules/personas/personas.module').then(m => m.PersonasModule)
  },
  {
    path: 'planetas',
    loadChildren: () => import('./modules/planetas/planetas.module').then(m => m.PlanetasModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
