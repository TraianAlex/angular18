export type OrderStatus = 'placed' | 'cooking' | 'delivered';

export type UserData = {
  id: number;
  name: string;
  email: string;
};

export type Book = {
  title: string;
  synopsis: string;
};
