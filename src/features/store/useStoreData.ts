import { fetchStoreData } from "@/services/storeApi";
import { useQuery } from "react-query";

export function useStoreData(store_id: string) {
  const { isLoading: isLoadingStore, data: store } = useQuery({
    queryKey: ["store"],
    queryFn: () => fetchStoreData(store_id),
    
  });
  console.log("useStoreData running");
  return [isLoadingStore, store];
}
