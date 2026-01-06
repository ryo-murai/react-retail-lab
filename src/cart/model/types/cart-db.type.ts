import {type DBSchema} from "idb";

export interface CartDB extends DBSchema {
  cartItems: {
    key: string; // product ID
    value: {
      productId: string;
      quantity: number;

      product: {
        productId: string;
        name: string;
        price: number;
      };

      addedAt: number;
      modifiedAt: number;
    };
    indexes: { 'by-id': string };
  };
}