export const CART_QUERY_KEYS = {
  all: ['cart'] as const,
  items: () => [...CART_QUERY_KEYS.all, 'items'] as const,
  count: () => [...CART_QUERY_KEYS.all, 'count'] as const,
};
