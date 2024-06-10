import { getOrders } from "@/services/orderapi";
import { useQuery, useQueryClient } from "react-query";

export function useOrder(store_id: string, page: number) {
  const queryClient = useQueryClient();

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(store_id as string, page)
  });

  if (page < orders?.lastPage)
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1],
      queryFn: () => getOrders(store_id as string, page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1],
      queryFn: () => getOrders(store_id as string, page - 1),
    });
  return { isLoading, orders };
}
