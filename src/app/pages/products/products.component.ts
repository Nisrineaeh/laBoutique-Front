import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { EditProductModalComponent } from 'src/app/components/edit-product-modal/edit-product-modal.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  productToDelete!: number;

  @ViewChild('editModal') editModal!: EditProductModalComponent;
  @ViewChild(ConfirmationModalComponent) confirmationModal!: ConfirmationModalComponent;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loading(){
    alert('Le site n\'a eu que 48heures pour voir le jour ce n\'est pas dans le MVP, bientôt disponible !')
  }

  editProduct(product: Product) {
    this.editModal.open(product)
  }

  onDelete(productId: number) {
    this.productToDelete = productId
    this.confirmationModal.open()
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productToDelete).subscribe({
      next: () => {
        alert('Produit supprimé avec succès!');
        location.reload()
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du produit', error);
      }
    });
  }


  onCancelDelete() {
    console.log('Suppression annulée');
  }
}