import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from './products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductSearch2 as SearchProduct } from '../../models/types';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-search2',
  templateUrl: './product-search2.html',
  imports: [ReactiveFormsModule, AsyncPipe, CurrencyPipe],
})
export class ProductSearch2 {
  private readonly productsService = inject(ProductsService);

  search = new FormControl('');
  category = new FormControl<string[]>([]);
  products$!: Observable<SearchProduct[]>;
  loading = false;

  categories = ['', 'smartphones', 'mobile-accessories'];

  ngOnInit() {
    this.products$ = combineLatest([
      this.search.valueChanges.pipe(startWith(''), debounceTime(300), distinctUntilChanged()),
      this.category.valueChanges.pipe(startWith('')),
    ]).pipe(
      tap(() => (this.loading = true)),

      switchMap(([search, category]) =>
        this.productsService.searchProducts(search ?? '').pipe(
          map((response) => {
            if (!category) {
              return response.products;
            }

            return response.products.filter((p) => p.category === category);
          }),
        ),
      ),

      tap(() => (this.loading = false)),
    );
  }
}
