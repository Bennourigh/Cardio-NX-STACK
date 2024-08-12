export interface Product {
  id: string,
  description: string,
  stock: number,
  price: number
}

export interface addProduct {
  price: number,
  stock: number,
  description: string
}
export interface UpdateProductPrice {
  productId: string,
  price: number
}
export interface UpdateProductStock {
  productId: string,
  stock: number
}
