import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {
  isOpen = false;
  product!: Product;
  editProductForm!: FormGroup;
  categories: Category[]=[];

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      postedBy: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  open(product: Product) {
    this.product = product;
    this.editProductForm.patchValue({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category_id.id,
      postedBy: product.user_id.firstname
    });
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  submit() {
    console.log(this.editProductForm.value, 'FOOORMS')
    if (this.editProductForm.valid) {
      const updatedProduct = {
        ...this.product,
        name: this.editProductForm.get('name')?.value,
        price: this.editProductForm.get('price')?.value,
        quantity: this.editProductForm.get('quantity')?.value,
        category_id:  this.editProductForm.get('category')?.value ,
      };
      this.productService.updateProduct(updatedProduct).subscribe(
        () => {
          this.close();
          alert('Produit mis à jour avec succès!');
          location.reload()
        },
        error => {
          console.error('Erreur lors de la mise à jour du produit', error);
        }
      );
    }
  }

}
