import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachinesComponent } from './pages/machines/machines.component';
import { ChartComponent } from './pages/chart/chart.component';


const routes: Routes = [
  { path: 'machines', component: MachinesComponent },
  { path: 'chart', component: ChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
