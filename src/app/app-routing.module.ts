import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './pages/chart/chart.component';
import { MachineComponent } from './pages/machine/machine.component';


const routes: Routes = [
  { path: 'machine', component: MachineComponent },
  { path: 'chart', component: ChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
