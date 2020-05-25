import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMachine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';

import { SystemType } from 'src/app/models/machine.model';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './machine-edit.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineEditComponent implements OnInit {

  machine: IMachine = {};
  systemType = SystemType;

  form = this.fb.group({
    id: [''],
    ip: ['', [Validators.required]],
    port: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    system: [this.systemType.UNIX, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.machine = this.route.snapshot.data.machine;
    this.form.patchValue(this.machine);
  }

  updateMachine() {
    this.machine.port = this.form.get(['port']).value;
    this.machine.hostname = this.form.get(['hostname']).value;
    this.machine.password = this.form.get(['password']).value;
    this.machine.system = this.form.get(['system']).value;
    this.machine.ip = this.form.get(['ip']).value;
  }

  onSave() {
    this.updateMachine();
    this.machineService.update(this.machine).pipe(take(1)).subscribe();
    this.redirect('machine');
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

}
