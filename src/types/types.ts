export interface Food {
  id: string | number;
  title: string;
  Image: string;
  price: number;
}

export interface CartItem extends Food {
  quantity: number;
}
