import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Product } from '../../models/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = `${environment.apiUrl}/products`;

  /** Loads all products from the API (json-server: GET /api/products). */
  getProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(this.productsUrl));
  }
}
