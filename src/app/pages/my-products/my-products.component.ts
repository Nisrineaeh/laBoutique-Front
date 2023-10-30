import { Component, OnInit, ViewChild } from '@angular/core';
import { EditProductModalComponent } from 'src/app/components/edit-product-modal/edit-product-modal.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  userProducts: Product[] = [];

  @ViewChild('editModal') editModal!: EditProductModalComponent;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const user_Id = localStorage.getItem('user_id');
    if (user_Id) { 
      const userId = +user_Id; 
      this.productService.getProductsByUser(userId).subscribe(products => {
        console.log('LES PRODUITS DE USER', products)
        console.log('prix du premier produit', products[0].price)
        this.userProducts = products;
      });
    } else {
      console.error('user_id non trouvé dans le localStorage');
    }
  }

  editProduct(product:Product){
    this.editModal.open(product)
  }

  deleteProduct(productId:number){}
}