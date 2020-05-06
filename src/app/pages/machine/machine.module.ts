import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';

import { MachineEditComponent } from './edit/machine-edit.component';
import { MachineNewComponent } from './new/machine-new.component';

import { MaterialModule } from './../../shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MachineComponent } from './machine.component';
import { MachineRouterModule } from './machines-routing.module';

@NgModule({
  declarations: [
    MachineEditComponent,
    MachineNewComponent,
    MachineComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    NgbModule,
    MachineRouterModule,
    MatNativeDateModule
  ]
})
export class MachineModule { }
