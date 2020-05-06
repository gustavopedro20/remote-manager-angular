import { Component, OnInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IMachine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/shared/services/machine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  faTrashAlt = faTrashAlt
  faEdit = faEdit
  faEye = faEye
  faPlus = faPlus
  page = 1;
  pageSize = 4;
  machineList = [];
  collectionSize = 0;
  form = this.fb.group({
    machines: []
  });

  constructor(
    private machineService: MachineService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.machineService.findAll().subscribe(machines => {
      this.machineList = machines;
      this.collectionSize = this.machineList.length;
    });
  }

  ngOnInit(): void {
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

}
