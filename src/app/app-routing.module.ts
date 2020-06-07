import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'machine'
  },
  {
    path: 'machine',
    loadChildren: () => import('./pages/machine/machine.module').then(m => m.MachineModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
