import StoreNotFound from "@/components/StoreNotFound";
import { useAccountState } from "@/context/AccountContext";
import { useQuery } from "react-query";

const fetchData = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  console.log("call");
  const data = res.json();
  return data;
};

export default function ViewOrder() {
  console.log("ListProduct Feature");
  const { store_id } = useAccountState();
  const { isLoading, data } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });
  console.log("render", data, isLoading);

  return (
    <div className="laptop:px-12 tablet:px-3  px-1 pt-6 pb-16">
      {store_id ? "order" : <StoreNotFound />}
    </div>
  );
}
