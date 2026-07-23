import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductSearch2Response } from '../../models/types';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  searchProducts(query: string) {
    return this.http
      .get<ProductSearch2Response>(`https://dummyjson.com/products/search?limit=125&q=${query}`)
      .pipe(shareReplay(1));
  }
}
