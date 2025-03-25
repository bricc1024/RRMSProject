import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ProductListComponent } from './view/product/product-list/product-list.component';
import { CartListComponent } from './view/cart/cart-list/cart-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'carts', component: CartListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
