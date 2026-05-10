import { Component, inject, signal, computed, effect } from '@angular/core';
import { ProductService } from './product-service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-product-search',
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <header class="mb-4">
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Product search</h1>
      </header>

      <section class="mb-6" aria-labelledby="search-heading">
        <div class="relative">
          <span
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
            aria-hidden="true"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 shadow-inner focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-colors"
            [value]="searchQuery()"
            (input)="searchQuery.set($any($event.target).value)"
            placeholder="Search by product name..."
            autocomplete="off"
          />
        </div>
      </section>

      <section class="mb-8" aria-labelledby="filters-heading">
        <div class="flex flex-wrap gap-3">
          @for (category of categories; track category) {
            <label
              class="inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors"
              [class.border-blue-600]="selectedCategories().includes(category)"
              [class.bg-blue-50]="selectedCategories().includes(category)"
              [class.text-blue-900]="selectedCategories().includes(category)"
              [class.border-gray-200]="!selectedCategories().includes(category)"
              [class.bg-gray-50]="!selectedCategories().includes(category)"
              [class.text-gray-700]="!selectedCategories().includes(category)"
            >
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                [checked]="selectedCategories().includes(category)"
                (change)="toggleCategory(category)"
              />
              {{ category }}
            </label>
          }
        </div>
      </section>

      <section aria-labelledby="results-heading">
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <p class="text-sm text-gray-500">
            <span class="font-medium text-gray-800">{{ filteredProducts().length }}</span>
            product{{ filteredProducts().length === 1 ? '' : 's' }} found
          </p>
        </div>

        @if (filteredProducts().length === 0) {
          <div
            class="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-6 py-16 text-center"
          >
            <p class="text-base font-medium text-gray-800">No products match</p>
            <p class="mt-1 max-w-sm text-sm text-gray-500">
              Try a different search term or adjust your category filters.
            </p>
          </div>
        } @else {
          <ul class="grid gap-4 sm:grid-cols-2" role="list">
            @for (product of filteredProducts(); track product.id) {
              <li
                class="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm ring-1 ring-gray-950/5 transition-shadow hover:shadow-md"
              >
                <div class="flex items-start justify-between gap-3">
                  <p class="font-medium text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {{ product.name }}
                  </p>
                  <span
                    class="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200/80"
                  >
                    {{ product.category }}
                  </span>
                </div>
              </li>
            }
          </ul>
        }
      </section>
    </div>
  `,
  standalone: true,
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
