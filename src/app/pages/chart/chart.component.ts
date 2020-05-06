import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { SshService } from 'src/app/shared/services/ssh.service';
import { StatisticsTemp } from 'src/app/models/statistics-temp.model';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  canvas: any;
  ctx: any;
  temp: StatisticsTemp = {};

  constructor(private sshService: SshService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.sshService.getStatisticsTemp().subscribe(data => {
      this.temp = data;
      this.loadCanvas();
    });
  }

  loadCanvas() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['buff', 'cache', 'free', 'swpd'],
        datasets: [{
          label: '# of Votes',
          data: [this.temp?.memory?.buff, this.temp?.memory?.cache, this.temp?.memory?.free, this.temp?.memory?.swpd],
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

}
