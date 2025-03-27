import {
  Component,
  computed,
  HostListener,
  input,
  output,
} from '@angular/core';
import { Cart } from '../../../shared/model/cart.model';
import { User } from '../../../shared/model/user.model';
import { Product } from '../../../shared/model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  imports: [CommonModule],
})
export class CartDetailComponent {
  cart = input<Cart>();
  user = input<User>();
  productMap = input<Map<number, Product>>();

  close = output<void>();

  cartItemsDetailed = computed(() => {
    const map = this.productMap();
    return this.cart()?.items.map((item) => ({
      ...item,
      product: map?.get(item.productId),
    }));
  });

  onClose() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.onClose();
  }
}
