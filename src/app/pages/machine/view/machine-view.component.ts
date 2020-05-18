import { Component, OnInit, AfterViewInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import * as Chart from 'chart.js';

import { ITask } from 'src/app/models/task.model';
import { SshService } from 'src/app/shared/services/ssh.service';
import { IMen } from 'src/app/models/men.mode';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { ITaskMenDiskDTO } from 'src/app/models/dto/tasks-men-diskDTO';
import { IDiskUsage } from 'src/app/models/disk-usage.model';

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
  page = 1;
  pageSize = 40;
  collectionSize = 0;
  blue = 'rgba(54, 162, 235, 1)';
  green = 'rgba(48, 187, 49, 1)';
  red = 'rgba(226, 43, 16, 1)';
  orange = 'rgba(226, 80, 16, 1)';
  aqua = 'rgba(36, 238, 218, 1)';
  purple = 'rgba(208, 36, 238, 1)';

  constructor(
    private sshService: SshService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadTasksAndMen();
  }

  loadCanvas(temp: IMen) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Total', 'Free', 'Used', 'Cache/buff'],
        datasets: [{
          label: 'Estatística da mémoria em MB',
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
          label: 'Estatística do disco em MB',
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
    this.websocketService.getMessages('join_room')
      .pipe(
        tap((tm: ITaskMenDiskDTO) => {
          this.sortDesc(tm.tasks);
          tm.men['buff/cache'] = tm.men['buff/cache'] / 1000;
          tm.men.free = tm.men.free / 1000;
          tm.men.total = tm.men.total / 1000;
          tm.men.used = tm.men.used / 1000;
          tm.diskUsage.free = tm.diskUsage.free / 1000;
          tm.diskUsage.total = tm.diskUsage.total / 1000;
          tm.diskUsage.usage = tm.diskUsage.usage / 1000;
        })).subscribe((data: ITaskMenDiskDTO) => {
          console.log(data);
          this.tasksList = [];
          this.tasksList = data.tasks;
          this.collectionSize = this.tasksList.length;
          this.loadCanvas(data.men);
          this.loadCanvasDisk(data.diskUsage);
        });
    this.websocketService.emit('create', {});
    // this.sshService.getDiskUsage().subscribe(data => {
    //   console.log(data);
    //   this.loadCanvasDisk(data);
    // });
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

  sendEvent() {
    // this.websocketService.emit('create', {size: 'normal', teams: 2, dictionary: 'Simple'});
    // this.sshService.getAllTasksAndMenTest().subscribe();
    this.websocketService.emit('create', false);
  }

  sortDesc(tasks: ITask[]) {
    return tasks.sort((one, two) => (+one.PID > +two.PID ? 1 : -1));
  }
}
