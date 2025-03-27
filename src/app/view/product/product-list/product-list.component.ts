import { Component, signal } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/model/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    ProductDetailComponent,
    ProductFormComponent,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products$;
  selectedProduct = signal<Product | null>(null);
  showForm = signal(false);
  submitConfirm = signal(false);
  loading;

  constructor(private productService: ProductService) {
    this.loading = this.productService.loading;
    this.products$ = this.productService.products$;
    this.productService.getProducts();
  }

  openDetail(product: Product) {
    this.selectedProduct.set(product);
    this.showForm.set(false);
  }

  closeDetail() {
    this.selectedProduct.set(null);
  }

  openForm() {
    this.submitConfirm.set(false);
    this.showForm.set(true);
    this.selectedProduct.set(null);
  }

  saveProduct(partial: Omit<Product, 'id'>) {
    const id = this.productService.getNextId();
    const fullProduct: Product = { id, ...partial };
    this.submitConfirm.set(true);
    this.productService.addProduct(fullProduct);
    setTimeout(() => {
      this.showForm.set(false);
    }, 1500);
  }
}
