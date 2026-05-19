import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  protected readonly products = signal<Product[] | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  private readonly productService = inject(ProductService);

  constructor() {
    this.loadProducts();
  }

  protected async loadProducts(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const result = await this.productService.fetchProducts();
      this.products.set(result);
    } catch (error) {
      this.products.set(null);
      this.error.set(error instanceof Error ? error.message : String(error));
    } finally {
      this.loading.set(false);
    }
  }
}
