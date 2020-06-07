import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';

import { MachineEditComponent } from './edit/machine-edit.component';
import { MachineNewComponent } from './new/machine-new.component';

import { MaterialModule } from './../../shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MachineComponent } from './machine.component';
import { MachineRouterModule } from './machines-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from 'src/environments/environment';
import { MachineViewComponent } from './view/machine-view.component';

const config: SocketIoConfig = { url: environment.API_URL, options: {} };

@NgModule({
  declarations: [
    MachineEditComponent,
    MachineNewComponent,
    MachineComponent,
    MachineViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    NgbModule,
    MachineRouterModule,
    MatNativeDateModule,
    SocketIoModule.forRoot(config),
    NgxMaskModule.forRoot()
  ]
})
export class MachineModule { }
