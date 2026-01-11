import { QueryClient } from "@tanstack/react-query";
import { defaultOptions } from "@/shared/webclient/config/query-options";
import { registerCartQueryDefaults } from "@/cart/lib/query-registrar";

export const createAppQueryClient = () => {
  const qc = new QueryClient(defaultOptions);

  registerCartQueryDefaults(qc);

  return qc;
};
