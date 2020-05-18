import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineComponent } from './machine.component';
import { MachineNewComponent } from './new/machine-new.component';
import { MachineResolverGuard } from '../../shared/guards/machine-resolver.guard';
import { MachineEditComponent } from './edit/machine-edit.component';
import { MachineViewComponent } from './view/machine-view.component';

export const routes: Routes = [
    {
        path: '',
        component: MachineComponent,
    },
    {
        path: 'new',
        component: MachineNewComponent,
        resolve: {
            machine: MachineResolverGuard
        }
    },
    {
        path: 'edit/:id',
        component: MachineEditComponent,
        resolve: {
            machine: MachineResolverGuard
        }
    },
    {
        path: 'view/:ip',
        component: MachineViewComponent,
        resolve: {
            machine: MachineResolverGuard
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MachineRouterModule { }
