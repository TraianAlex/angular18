import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LineItem {
  product: string;
  quantity: number;
}

export interface OrderInfo {
  customerName: string;
  items: LineItem[];
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    country: string;
    city: string;
    zip: string;
  };
  cc: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  saveUserInfo(userInfo: UserInfo): Promise<unknown> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/users`, userInfo));
  }

  saveOrderInfo(orderInfo: OrderInfo): Promise<unknown> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/orders`, orderInfo));
  }
}
