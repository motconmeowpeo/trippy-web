import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-management-report',
  templateUrl: './management-report.component.html',
})
export class ManagementReportComponent implements OnInit, AfterViewInit {
  chart: any;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Otc',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: '# Revenue',
            data: [12, 19, 3, 5, 2, 3, 6, 2, 1, 8, 19, 2, 10],
            borderColor: ['#9E5D36'],
            borderWidth: 2,
          },
          {
            label: '# Visit',
            data: [7, 1, 6, 3, 10, 26, 9, 21, 13, 10, 9, 12, 6],
            borderColor: ['#121D39'],
            borderWidth: 2,
          },
        ],
      },

      options: {
        animations: {
          tension: {
            duration: 300,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
