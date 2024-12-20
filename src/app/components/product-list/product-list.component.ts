import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Array<Product> = new Array<Product>();
  productListByDescription: Array<Product> = [];
  productListByPrice: Array<Product> = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll()
      .then(response => {
        this.productList = response || [];
        this.sortProducts(); 
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.authService.token = undefined;
    this.router.navigate(['/login']);
  }

  sortProducts(): void {
    const validProducts = this.productList.filter(product => product.productCategoryId);
    
    this.productListByDescription = [...this.productList].sort((a, b) => {
      const descriptionA = a.description?.toLowerCase() || '';
      const descriptionB = b.description?.toLowerCase() || '';
      return descriptionA.localeCompare(descriptionB);
    });

    this.productListByPrice = [...this.productList].sort((a, b) => b.price - a.price);
  }
}
