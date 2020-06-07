import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IMachine, SystemType } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';
import { take } from 'rxjs/operators';
import { IConfig } from 'src/app/models/config.model';

@Component({
  selector: 'app-machine-new',
  templateUrl: './machine-new.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineNewComponent implements OnInit {
  machine: IMachine = {};
  config: IConfig = {};
  systemType = SystemType;

  form = this.fb.group({
    id: [''],
    ip: ['', [Validators.required]],
    port: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    system: [this.systemType.UNIX, [Validators.required]],
    email: ['', [Validators.required]],
    maxCPUInPercent: ['', [Validators.required]],
    maxDiscInPercent: ['', [Validators.required]],
    maxMenInPercent: ['', [Validators.required]]
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
    this.config.email = this.form.get(['email']).value;
    this.config.maxCPUInPercent = this.form.get(['maxCPUInPercent']).value;
    this.config.maxDiscInPercent = this.form.get(['maxDiscInPercent']).value;
    this.config.maxMenInPercent = this.form.get(['maxMenInPercent']).value;
    this.machine.config = this.config;
  }

  onSave() {
    this.createMachine();
    this.machineService.create(this.machine).pipe(take(1)).subscribe(() => {
      this.redirect('machine');
    });
  }

  redirect(path: string) {
    this.router.navigate([path]);
  }

}
