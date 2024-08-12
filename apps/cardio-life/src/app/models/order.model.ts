enum OrderStatus {
  "CREATED" ,
  "PENDING" ,
  "DELIVERED" ,
  "CANCELED"
}
export interface Order{
  orderId : string;
  price : number;
  qte : number;
  productId : string;
}
export interface newOrder{
  price : number;
  qte : number;
  productId : string;
}

