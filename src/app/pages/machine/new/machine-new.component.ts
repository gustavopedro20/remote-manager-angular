import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { IMachine } from 'src/app/models/machine.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-machine-new',
  templateUrl: './machine-new.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineNewComponent implements OnInit {

  machine: IMachine;

  form = this.fb.group({
    ip: [null, [Validators.required]],
    port: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    system: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const machine = this.route.snapshot.data['machine'];
    this.form.patchValue(machine);
  }

  onSave() { }

  redirect(path) {
    this.router.navigate([path])
  }
  
}
