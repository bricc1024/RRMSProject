import { Component, Input, HostListener, output, input } from '@angular/core';
import { Product } from '../../../shared/model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [CommonModule],
})
export class ProductDetailComponent {
  product = input.required<Product>();
  close = output<void>();

  onClose() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.onClose();
  }
}
