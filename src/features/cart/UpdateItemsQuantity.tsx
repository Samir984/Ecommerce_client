import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { decreaseItems, increaseItems } from "./cartSlice";
type updateItemQuantityPropsType = {
  lastCount: number;
  count: number;
  _id: string;
};

export default function UpdateItemsQuantity({
  lastCount,
  count,
  _id,
}: updateItemQuantityPropsType) {
  const dispatch = useDispatch();
  console.log(count, lastCount);
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        disabled={count === lastCount}
        onClick={() => {
          dispatch(increaseItems(_id));
        }}
      >
        +
      </Button>
      <span className="text-sm font-medium">{count}</span>
      <Button
        onClick={() => {
          dispatch(decreaseItems(_id));
        }}
        disabled={count === 1}
      >
        -
      </Button>
    </div>
  );
}
