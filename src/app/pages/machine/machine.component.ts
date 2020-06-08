import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { faTrashAlt, faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

import { take } from 'rxjs/operators';

import { IMachine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;
  page = 1;
  pageSize = 4;
  machineList = [];
  collectionSize = 0;

  constructor(
    private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.init();
  }

  ngOnInit(): void { }

  init() {
    this.machineService.findAll().subscribe(machines => {
      this.machineList = machines;
      this.collectionSize = this.machineList.length;
    });
  }

  get machines(): IMachine[] {
    return this.machineList
      .map((machine, i) => ({ id: i + 1, ...machine }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onEdit(machineId?: number) {
    this.router.navigate(['edit', machineId], { relativeTo: this.route });
  }

  onCreate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDelet(machine: IMachine) {
    this.machineService.delete(machine.id).pipe(take(1)).subscribe(() => {
      this.init();
    });
  }

  onView(machineId?: string) {
    localStorage.setItem('machineId', machineId);
    this.router.navigate(['view', machineId], { relativeTo: this.route });
  }

  hashPassword(password: string) {
    return '*'.repeat(password.length);
  }
}
