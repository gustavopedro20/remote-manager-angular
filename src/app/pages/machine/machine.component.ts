import { Component, OnInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


interface Machine {
  ip: string;
  hostname: string;
  password: string;
}

const MACHINES: Machine[] = [
  {
    ip: '192.168.0.2',
    hostname: 'machine2',
    password: '********'
  },
  {
    ip: '192.168.0.3',
    hostname: 'machine3',
    password: '********'
  },
  {
    ip: '192.168.0.4',
    hostname: 'machine4',
    password: '********'
  },
  {
    ip: '192.168.0.5',
    hostname: 'machine5',
    password: '********'
  },
];

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
  collectionSize = MACHINES.length;

  constructor() { }

  ngOnInit(): void {
  }

  get machines(): Machine[] {
    return MACHINES
      .map((machine, i) => ({ id: i + 1, ...machine }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
