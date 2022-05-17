import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OverviewPage } from '../shared/interfaces';
import { AnalyticsService } from '../shared/services/analytics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialInstance
  data$: Observable<OverviewPage>
  yesterday: Date = new Date()


  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverView()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy()  
  }

  openInfo() {
    this.tapTarget.open()
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

}
