export type UserData = {
  id: number;
  name: string;
  email: string;
};

export type User = {
  readonly name: string;
  readonly age: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
};

export interface ProductSearch2 {
  id: number;
  title: string;
  price: number;
  category: string;
}

export interface ProductSearch2Response {
  products: ProductSearch2[];
}