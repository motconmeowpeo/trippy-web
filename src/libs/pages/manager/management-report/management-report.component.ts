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
            data: [
              1200, 1900, 3000, 5123, 2531, 3673, 6928, 2182, 1129, 8829, 1919,
              2201, 1092,
            ],
            borderColor: ['#9E5D36'],
            borderWidth: 2,
          },
          {
            label: '# Visit',
            data: [92, 129, 68, 328, 109, 261, 99, 212, 133, 929, 109, 142, 6],
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
