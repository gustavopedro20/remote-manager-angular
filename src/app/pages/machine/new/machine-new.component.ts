import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IMachine } from 'src/app/models/machine.model';
import { Route } from '@angular/compiler/src/core';
import { MachineService } from 'src/app/shared/services/machine.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-machine-new',
  templateUrl: './machine-new.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineNewComponent implements OnInit {

  machine: IMachine = {};

  form = this.fb.group({
    id: [''],
    ip: ['', [Validators.required]],
    port: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    system: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private machineService: MachineService
  ) { }

  ngOnInit(): void { }

  createMachine() {
    this.machine.port = this.form.get(['port']).value;
    this.machine.hostname = this.form.get(['hostname']).value;
    this.machine.password = this.form.get(['password']).value;
    this.machine.system = this.form.get(['system']).value;
    this.machine.ip = this.form.get(['ip']).value;
  }

  onSave() {
    this.createMachine();
    this.machineService.create(this.machine).pipe(take(1)).subscribe();
    this.redirect('machine');
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

}
