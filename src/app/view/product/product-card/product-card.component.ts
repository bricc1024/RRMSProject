import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() select = new EventEmitter<Product>();

  onSelect() {
    this.select.emit(this.product);
  }
}
