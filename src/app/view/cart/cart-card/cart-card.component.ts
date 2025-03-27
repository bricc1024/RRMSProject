import {
  Component,
  computed,
  input,
  Output,
  EventEmitter,
  output,
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

  select = output<Cart | undefined>();

  fullName = computed(() => {
    const u = this.user();
    return u ? `${u.firstname} ${u.lastname}` : 'Guest';
  });

  itemCount = computed(() => {
    return this.cart()?.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  onSelect() {
    this.select.emit(this.cart());
  }
}
