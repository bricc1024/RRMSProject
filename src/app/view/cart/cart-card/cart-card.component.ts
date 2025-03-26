import {
  Component,
  computed,
  input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Cart } from '../../../shared/model/cart.model';
import { User } from '../../../shared/model/user.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  imports: [CommonModule, DatePipe],
})
export class CartCardComponent {
  cart = input<Cart>();
  user = input<User>();

  @Output() select = new EventEmitter<Cart>();

  readonly fullName = computed(() => {
    const u = this.user();
    return `${u?.firstname} ${u?.lastname}`;
  });

  readonly itemCount = computed(() => {
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  onSelect() {
    this.select.emit(this.cart());
  }
}
