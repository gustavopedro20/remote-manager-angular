import { Component, OnInit, AfterViewInit } from '@angular/core';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { take } from 'rxjs/operators';
import * as Chart from 'chart.js';

import { SshService } from 'src/app/shared/services/ssh.service';
import { StatisticsTemp } from 'src/app/models/statistics-temp.model';
import { ITask } from 'src/app/models/task.model';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  faTrashAlt = faTrashAlt;
  myChart: Chart;
  canvas: any;
  ctx: any;
  tasksList: ITask[] = [];
  page = 1;
  pageSize = 40;
  collectionSize = 0;

  constructor(private sshService: SshService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.sshService.getSwapStatistics().pipe(take(1)).subscribe(temp => {
      this.loadCanvasSwap(temp);
    });
  }

  loadCanvasSwap(temp: StatisticsTemp) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['buff', 'cache', 'free', 'swpd'],
        datasets: [{
          label: '# of Votes',
          data: [temp?.memory?.buff, temp?.memory?.cache, temp?.memory?.free, temp?.memory?.swpd],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(48, 187, 49, 1)',
            'rgba(226, 43, 16, 1)',
            'rgba(226, 80, 16, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        display: true
      }
    });
  }

  loadTasks() {
    this.sshService.getAllTasks().subscribe(data => {
      this.tasksList = data;
      this.collectionSize = this.tasksList.length;
    });
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
