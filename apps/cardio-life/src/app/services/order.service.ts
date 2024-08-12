import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {newOrder, Order} from "../models/order.model";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderApiUrl = 'http://localhost:8082/api';
  pUrl: string = "http://localhost:8083/api";

  private currentOrderProduct!: Product ;
  constructor(private http: HttpClient) {
  }

  setOrderProduct(product: Product): void {
    this.currentOrderProduct = product;
    console.log('Order product set to'+ product);
  }
  getOrderProduct(): Product | null {
    return this.currentOrderProduct;
  }
  createOrderCall(order: newOrder): Observable<Order> {

    return this.http.post<Order>(this.pUrl + "/commands/orders/add-order", order);
  }
  fetchAllOrders(): Observable<Order> {
    return this.http.get<Order>(this.orderApiUrl + "/query/orders/all-orders");
  }
  fetchOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.orderApiUrl + "/query/orders/orderById/" + orderId);
  }
}


