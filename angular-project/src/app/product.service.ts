import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price?: number;
  description?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  fetchProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>('/api/products'));
  }
}
