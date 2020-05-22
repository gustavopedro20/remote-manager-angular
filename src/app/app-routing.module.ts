import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './pages/chart/chart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'machine'},
  {
    path: 'machine',
    loadChildren: () => import('./pages/machine/machine.module').then(m => m.MachineModule)
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: '**',
    redirectTo: 'machine'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
