import { Component, OnInit, AfterViewInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
import * as Chart from 'chart.js';

import { SshService } from 'src/app/shared/services/ssh.service';
import { ITask } from 'src/app/models/task.model';
import { IMen } from 'src/app/models/men.mode';

import { Utils } from 'src/app/shared/utils/utils';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  faTrashAlt = faTrashAlt;
  myChart: Chart;
  terms: any;
  canvas: any;
  ctx: any;
  tasksList: ITask[] = [];
  page = 1;
  pageSize = 40;
  collectionSize = 0;
  timer = timer(0, 15000);

  constructor(private sshService: SshService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadTasksAnMen();
  }

  loadCanvas(temp: IMen) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Total', 'Free', 'Used', 'Cache/buff'],
        datasets: [{
          label: '# of Votes',
          data: [temp.total, temp.free, temp.used, temp['buff/cache']],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(48, 187, 49, 1)',
            'rgba(226, 43, 16, 1)',
            'rgba(226, 80, 16, 1)'
          ],
          borderWidth: 1
        }]
      },
      // options: {
      //   responsive: false,
      //   display: true
      // }
    });
  }

  taskFilter(terms){
    return Utils.isNullOrWhiteSpaces(terms)?
        this.tasksList :
        this.tasksList
        .filter(x=> x.COMMAND != null && x.COMMAND.toLowerCase().includes(terms.toLowerCase()));
  }

  loadTasksAnMen() {
    // this.timer.subscribe(() => {
    //   this.sshService.getAllTasksAndMen().pipe(take(1)).subscribe(data => {
    //     this.loadCanvas(data.men);
    //     this.tasksList = [];
    //     this.tasksList = data.tasks;
    //     this.collectionSize = this.tasksList.length;
    //   });
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

}
