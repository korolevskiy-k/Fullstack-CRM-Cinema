import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
