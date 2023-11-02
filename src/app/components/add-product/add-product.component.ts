import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categoryForm!: FormGroup;
  categories: Category[] = [];
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initProductForm()
    this.initCategoryForm()
    this.loadCategories()
  }

  initProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      category_id: new FormControl(null, Validators.required),
      newCategory: new FormControl('')
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  private initCategoryForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  addProduct() {
    console.log(this.productForm.get('price')?.value);
    if (this.productForm.get('category_id')?.value === 'newCategory') {
      this.addNewCategory();
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(data => {
        alert('Produit ajouté avec succès!');
        this.productForm.reset();
        this.router.navigate(['/products']);
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  onCategoryChange(event: any): void {
    if (event.target.value === "newCategory") {
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  addNewCategory() {
    const newCategoryName = this.categoryForm.get('name')?.value

    if (newCategoryName) {
      const newCategory: Category = { name: newCategoryName }
      this.categoryService.addCategory(newCategory).subscribe({
        next: addedCategory => {
          this.categories.push(addedCategory);
          this.productForm.get('category_id')?.setValue(addedCategory.id);
          this.showModal = false;
        },
        error: error => {
          console.error('Erreur lors de l\'ajout de la nouvelle catégorie:', error);
          alert('Une erreur est survenue lors de l\'ajout de la nouvelle catégorie.');
        }
      });

    }
  }

}
