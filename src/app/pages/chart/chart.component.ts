import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ["Total", "Free", "Using"],
        datasets: [{
          label: '# of Votes',
          data: [1988340, 697540, 468816],
          // backgroundColor: [
          //     'rgba(255, 99, 132, 1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)'
          // ],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(48, 187, 49, 1)',
            'rgba(226, 43, 16, 1)'
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
