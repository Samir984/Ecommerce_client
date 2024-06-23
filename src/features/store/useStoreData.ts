import { useAccountState } from "@/context/AccountContext";
import { fetchStoreData } from "@/services/storeApi";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export function useStoreData(store_id: string) {
  const { dispatch } = useAccountState();

  const { isLoading: isLoadingStore, data: store } = useQuery({
    queryKey: ["store"],
    queryFn: () => fetchStoreData(store_id),
    onError: (err: Error) => {
      toast.error(err?.message);
      if (err.message === "jwt expired, please looged in") {
        dispatch({ type: "signout" });
      }
    },
    retry: false,
  });
  console.log("useStoreData running");
  return { isLoadingStore, store };
}
