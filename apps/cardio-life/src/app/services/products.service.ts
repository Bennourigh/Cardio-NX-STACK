import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Product, addProduct, UpdateProductPrice, UpdateProductStock} from "../models/product.model";
import {Observable} from "rxjs";
import {CdkCellOutlet} from "@angular/cdk/table";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  pUrl: string = "http://localhost:8082/api/query/products";
  rUrl: string = "http://localhost:8083/api/commands"
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.pUrl + '/all-products');
  }
  getProduct(productId: String) {
    return this.http.get(this.pUrl + '/product-id/' + productId)
  }

  addProduct(product: addProduct) {
    return this.http.post(this.rUrl + '/products/add-product', product).subscribe(
      {
        next: (data) => {
          alert("request sent successfully and responded :" + data)
        }, error: (err) => {
          console.log(err)
        }
      });
  }



  updateProduct(product: Product) {
    return this.http.put(this.rUrl + 'products/update-product', product).subscribe(
      {
        next: (data) => {
          alert("request sent successfully and responded :" + data)
        }, error: (err) => {
          console.log(err)
        }
      });
  }

  updateProductPrice(info: UpdateProductPrice) {
    return this.http.post(this.rUrl + 'products/update-product-price', info).subscribe(
      {
        next: (data) => {
          alert("request sent successfully and responded :" + data)
        }, error: (err) => {
          console.log(err)
        }
      });
  }

  updateProductStock(info: UpdateProductStock) {
    return this.http.post(this.rUrl + 'products/update-product-price', info).subscribe(
      {
        next: (data) => {
          alert("request sent successfully and responded :" + data)
        }, error: (err) => {
          console.log(err)
        }
      });
  }

  deleteProduct(productId: String) {
    return this.http.delete(this.rUrl + 'products/delete-product/' + productId).subscribe(
      {
        next: (data) => {
          alert("request sent successfully and responded :" + data)
        }, error: (err) => {
          console.log(err)
        }
      });
  }
}
