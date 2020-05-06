import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemType } from 'src/app/models/machine.model';

@Component({
  selector: 'app-edit',
  templateUrl: './machine-edit.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineEditComponent implements OnInit {
  
  form = this.fb.group({
    ip: ['', [Validators.required]],
    port: ['', [Validators.required]],
    hostname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    system: ['', [Validators.required]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const machine = this.route.snapshot.data['machine'];
    console.log(machine);
    this.form.patchValue(machine);
  }

  onSave() {
    
  }

  redirect(path) {
    this.router.navigate([path])
  }

}
