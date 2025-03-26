import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/service/cart.service';
import { UserService } from '../../../shared/service/user.service';
import { ProductService } from '../../../shared/service/product.service';
import { Cart } from '../../../shared/model/cart.model';
import { User } from '../../../shared/model/user.model';
import { Product } from '../../../shared/model/product.model';
import { combineLatest, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  imports: [CommonModule, CartCardComponent, CartDetailComponent, RouterLink],
})
export class CartListComponent implements OnInit {
  carts: Cart[] = [];
  users: User[] = [];
  products: Product[] = [];

  selectedCart: Cart | null = null;

  ngOnInit(): void {
    combineLatest([
      this.cartService.getCarts(),
      this.userService.getUsers(),
      this.productService.getProducts(),
    ]).subscribe(([carts, users, products]) => {
      this.carts = carts;
      this.users = users;
      this.products = products;
    });
  }

  getUser(userId: number): User | undefined {
    return this.users.find((u) => Number(u.id) === userId);
  }

  getProductMap(): Map<number, Product> {
    return new Map(this.products.map((p) => [Number(p.id), p]));
  }

  onSelectCart(cart: Cart) {
    this.selectedCart = this.selectedCart === cart ? null : cart;
  }

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductService
  ) {}
}
