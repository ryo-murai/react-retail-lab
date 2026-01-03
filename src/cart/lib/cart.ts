import { type CartItem } from "../model/types/cart-item.type";

export function addToCart({ id, name, price, quantity = 1 }: CartItem) {
  // Implementation for adding product to cart
  console.log(`Added product ${id} ${name} ${price} with quantity ${quantity} to cart.`);
}
