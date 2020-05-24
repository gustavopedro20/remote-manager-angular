import { Component, OnInit, AfterViewInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import * as Chart from 'chart.js';

import { ITask } from 'src/app/models/task.model';
import { SshService } from 'src/app/shared/services/ssh.service';
import { IMen } from 'src/app/models/men.mode';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { IDiskUsage } from 'src/app/models/disk-usage.model';
import { Utils } from 'src/app/shared/utils/utils';
import { ActivatedRoute } from '@angular/router';
import { IMachine } from 'src/app/models/machine.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-machine-view',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./../machine.component.scss']
})
export class MachineViewComponent implements OnInit, AfterViewInit {
  faTrashAlt = faTrashAlt;
  myChart: Chart;
  diskChart: Chart;
  canvas: any;
  canvasDisk: any;
  ctx: any;
  ctxDisk: any;
  tasksList: ITask[] = [];
  terms: any;
  page = 1;
  pageSize = 40;
  collectionSize = 0;
  blue = 'rgba(54, 162, 235, 1)';
  green = 'rgba(48, 187, 49, 1)';
  red = 'rgba(226, 43, 16, 1)';
  orange = 'rgba(226, 80, 16, 1)';
  aqua = 'rgba(36, 238, 218, 1)';
  purple = 'rgba(208, 36, 238, 1)';
  machine: IMachine = {};
  count = 0;

  constructor(
    private sshService: SshService,
    private websocketService: WebsocketService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadTasksAndMen();
    this.machine = this.route.snapshot.data.machine;
  }

  loadCanvas(temp: IMen) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Total', 'Free', 'Used', 'Cache/buff'],
        datasets: [{
          label: 'Estatística da mémoria em GB',
          data: [temp.total, temp.free, temp.used, temp['buff/cache']],
          backgroundColor: [this.blue, this.green, this.red, this.orange],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false
      }
    });
  }

  loadCanvasDisk(disk: IDiskUsage) {
    this.canvasDisk = document.getElementById('diskChart');
    this.ctxDisk = this.canvasDisk.getContext('2d');
    this.diskChart = new Chart(this.ctxDisk, {
      type: 'bar',
      data: {
        labels: ['Total', 'Free', 'Used'],
        datasets: [{
          label: 'Estatística do disco em GB',
          data: [disk.total, disk.free, disk.usage],
          backgroundColor: [this.aqua, this.purple, this.red],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false
      }
    });
  }

  loadTasksAndMen() {
    this.websocketService.getMessages('message').subscribe(data => {
      this.getError(data);
      if (data.diskUsage && data.men && data.tasks) {
        this.sortDesc(data.tasks);
        // data.men['buff/cache'] = data.men['buff/cache'] / 100;
        // data.men.free = data.men.free / 100;
        // data.men.total = data.men.total / 100;
        // data.men.used = data.men.used / 100;
        // data.diskUsage.free = data.diskUsage.free / 1000;
        // data.diskUsage.total = data.diskUsage.total / 1000;
        // data.diskUsage.usage = data.diskUsage.usage / 1000;
        this.tasksList = [];
        this.tasksList = data.tasks;
        this.collectionSize = this.tasksList.length;
        this.loadCanvas(data.men);
        this.loadCanvasDisk(data.diskUsage);
      }
    });
    this.websocketService.emit('tasks', localStorage.getItem('machineId'));
  }

  getError(error: any) {
    this.count++;
    if (this.count === 1) {
      if (error.status || error.status === 500) {
        alert(`A conexão com ${this.machine.ip} não foi estabelecida! Verifique os dados!`);
        this.location.back();
        return;
      }
    }
  }

  onDelet(task: ITask) {
    this.sshService.deleteTask(task.PID).pipe(take(1)).subscribe(
      () => {
        this.tasksList.splice(this.tasksList.indexOf(this.tasksList.filter(x => x.PID === task.PID)[0]), 1);
      },
      () => alert('Erro ao tentar deletar task!')
    );
  }

  get tasks(): ITask[] {
    return this.tasksList
      .map((tasks, i) => ({ id: i + 1, ...tasks }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  sortDesc(tasks: ITask[]) {
    return tasks.sort((one, two) => (+one.PID > +two.PID ? 1 : -1));
  }

  taskFilter(terms?: string) {
    return Utils.isNullOrWhiteSpaces(terms) ?
      this.tasks :
      this.tasks
        .filter(x => x.COMMAND != null && x.COMMAND.toLowerCase().includes(terms.toLowerCase()));
  }
}
