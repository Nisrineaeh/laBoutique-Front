import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  {path: 'home', component: AccueilComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:  'products', component: ProductsComponent},
  {path: 'my-products', component: MyProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
