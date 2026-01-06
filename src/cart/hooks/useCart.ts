import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addOrUpdateCartItem,
  clearCart,
  getCartItems,
  getCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from '../lib/cart';

const CART_QUERY_KEYS = {
  all: ['cart'] as const,
  items: () => [...CART_QUERY_KEYS.all, 'items'] as const,
  count: () => [...CART_QUERY_KEYS.all, 'count'] as const,
};

export const useCartItems = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.items(),
    queryFn: getCartItems,
  });
};

export const useCartItem = (productId: string) => {
  return useQuery({
    queryKey: [...CART_QUERY_KEYS.items(), productId],
    queryFn: () => getCartItem(productId),
  });
}

export const useCartItemCount = () => {
  const cartItemsQuery = useCartItems();
  return useMemo(() => {
    if (cartItemsQuery.data) {
      return cartItemsQuery.data.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  }, [cartItemsQuery.data]);
};

export const useAddOrUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrUpdateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.items() });
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.items() });
    },
  });
};

export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      updateCartItemQuantity(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.items() });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEYS.items() });
    },
  });
};
