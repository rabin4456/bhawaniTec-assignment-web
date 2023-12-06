interface Cart {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    quantity: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  }
  
  interface ProductState {
    cart: Cart[];
    total: number;
    discount: number;
  }