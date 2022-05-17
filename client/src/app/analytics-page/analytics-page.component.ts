import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsPage, Position } from '../shared/interfaces';
import { Chart, ChartType, ChartTypeRegistry, registerables }from 'chart.js'
import { AnalyticsService } from '../shared/services/analytics.service';


@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef


  aSub: Subscription
  average: number
  pending = true
  chart: any = []

  constructor(private service: AnalyticsService) {
    Chart.register(...registerables)
   }

  ngAfterViewInit() {
    
    // const gainConfig: any = {
    //   label: 'Выручка',
    //   color: 'rgb(255, 99, 132)'
    // }

    // const orderConfig: any = {
    //   label: 'Заказы',
    //   color: 'rgb(54, 162, 255)'
    // }

   this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: data.chart.map(item => item.label),
        datasets: [
          {
            label: 'Выручка',
            data: data.chart.map(item => item.gain),
            borderColor: 'red',
            fill: false
          }
        ]
      },
    })
    this.chart = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: data.chart.map(item => item.label),
        datasets: [
          {
            label: 'Продано билетов',
            data: data.chart.map(item => item.order),
            
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)'
          ],
          borderWidth: 1
          }
        ]
      },
      // options: {
      //   legend: { display: false },
      //   title: {
      //     display: true,
      //     text: 'Predicted world population (millions) in 2050'
      //   }
      // }
    })

      this.average = data.average

      // orderConfig.labels = data.chart.map(item => item.label)
      // orderConfig.data = data.chart.map(item => item.order)

      // const gainCtx = this.gainRef.nativeElement.getContext('2d')

      // const orderCtx = this.orderRef.nativeElement.getContext('2d')

      // gainCtx.canvas.height = '300px'
      // orderCtx.canvas.height = '300px'
      // type gainConfig = keyof typeof gainConfig;
     // new Chart(gainCtx, createChartConfig(gainConfig))
      // new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
    this.aSub.unsubscribe()
    }
  }

}
// function createChartConfig({labels = '', data = '', label = '', color = ''}) {
//   return {
//     type: 'line',
//     options: {
//       responsive: true
//     },
//     data: {
//       labels,
//       datasets: [
//         {
//           labels,
//           data, 
//           borderColor: color,
//           steppedLine: false,
//           fill: false
//         }
//       ]
//     }
//   }
// }

