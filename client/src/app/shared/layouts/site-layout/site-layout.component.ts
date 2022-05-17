import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analytics', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ]
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])

  }

}
