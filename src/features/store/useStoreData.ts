import { useAccountState } from "@/context/AccountContext";
import { containsJWT } from "@/lib/utils";
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
      console.log(containsJWT(err?.message), err.message,"\n\n\n\n");
      if (containsJWT(err?.message)) {
        dispatch({ type: "signout" });
      }
    },
    retry: false,
  });
  console.log("useStoreData running");
  return { isLoadingStore, store };
}
