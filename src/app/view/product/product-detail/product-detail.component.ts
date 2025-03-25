import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Product } from '../../../shared/model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [CommonModule],
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.onClose();
  }
}
