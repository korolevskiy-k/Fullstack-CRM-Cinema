import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seans } from '../shared/interfaces';
import { SeansService } from '../shared/services/seans.service';

@Component({
  selector: 'app-seans-page',
  templateUrl: './seans-page.component.html',
  styleUrls: ['./seans-page.component.css']
})
export class SeansPageComponent implements OnInit {
  seanses$: Observable<Seans[]>
  constructor(private seansService: SeansService) { }

  ngOnInit(): void {
    this.seanses$ = this.seansService.fetch()
  }

}
