import { Component, inject, signal, computed, effect } from '@angular/core';
import { ProductService } from './product-service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.html',
})
export class ProductSearchComponent {
  private productService = inject(ProductService);
  // Base state
  searchQuery = signal('');
  selectedCategories = signal<string[]>([]);
  allProducts = signal<Product[]>([]);
  categories = ['Electronics', 'Clothing', 'Books'];
  // Derived state updates automatically
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const categories = this.selectedCategories();

    return this.allProducts().filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  });

  constructor() {
    // Load initial data
    effect(() => {
      this.productService.getProducts().then((products) => {
        this.allProducts.set(products);
      });
    });
  }

  toggleCategory(category: string) {
    const current = this.selectedCategories();
    if (current.includes(category)) {
      this.selectedCategories.set(current.filter((c) => c !== category));
    } else {
      this.selectedCategories.set([...current, category]);
    }
  }
}
