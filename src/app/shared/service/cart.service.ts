import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'https://api.jsoning.com/mock/public/carts';

  private cartsSubject = new BehaviorSubject<Cart[] | null>(null);
  public carts$ = this.cartsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[] | null> {
    if (this.cartsSubject.value) {
      return this.carts$;
    }

    return this.http
      .get<Cart[]>(this.url)
      .pipe(tap((carts) => this.cartsSubject.next(carts)));
  }
}
