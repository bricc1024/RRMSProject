import { Component, HostListener, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  save = output<Omit<Product, 'id'>>();
  close = output<void>();
  submitConfirm = input.required<boolean>();

  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      price: [
        0,
        [Validators.required, Validators.min(0.01), Validators.max(100000)],
      ],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      stock: [
        0,
        [Validators.required, Validators.min(0), Validators.max(10000)],
      ],
      sku: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[A-Z0-9-_]+$/),
        ],
      ],
      image_url: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i
          ),
        ],
      ],
      rating: this.fb.group({
        rate: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
        count: [
          0,
          [Validators.required, Validators.min(0), Validators.max(100000)],
        ],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as Omit<Product, 'id'>);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.onClose();
  }
}
