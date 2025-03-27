import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
  select = output<Product>();

  onSelect() {
    this.select.emit(this.product());
  }
}
