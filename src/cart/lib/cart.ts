import {openDB} from 'idb';

import {type CartDB} from '../model/types/cart-db.type';
import {type CartItem} from '../model/types/cart-item.type';

const DB_NAME = 'cart-database';
const DB_VERSION = 1;
const STORE_NAME = 'cartItems';

const getDB = async () => {
  return openDB<CartDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'productId',
        });
        store.createIndex('by-id', 'productId');
      }
    },
  });
};

export const addOrUpdateCartItem = async (item: CartItem) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const existingItem = await store.get(item.productId);

  const now = Date.now();

  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + item.quantity,
      modifiedAt: now,
    };
    await store.put(updatedItem);
  } else {
    const newItem = {
      productId: item.productId,
      quantity: item.quantity,
      product: {
        productId: item.productId,
        name: item.name,
        price: item.price,
      },
      addedAt: now,
      modifiedAt: now,
    };
    await store.put(newItem);
  }

  await tx.done;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const db = await getDB();
  const allItems = await db.getAll(STORE_NAME);
  return allItems.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));
};

export const getCartItem = async (productId: string): Promise<CartItem | undefined> => {
  const db = await getDB();
  const item = await db.get(STORE_NAME, productId);
  if (item) {
    return {
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    };
  }
  return undefined;
}

export const clearCart = async () => {
  const db = await getDB();
  await db.clear(STORE_NAME);
};

export const removeCartItem = async (productId: string) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(productId);
  await tx.done;
};

export const updateCartItemQuantity = async (productId: string, quantity: number) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const existingItem = await store.get(productId);

  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      quantity,
      modifiedAt: Date.now(),
    };
    await store.put(updatedItem);
  }

  await tx.done;
};
