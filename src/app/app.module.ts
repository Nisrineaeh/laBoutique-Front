import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    MyProductsComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
