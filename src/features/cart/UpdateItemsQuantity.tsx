import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { decreaseItems, deleteItem, increaseItems } from "./cartSlice";
type updateItemQuantityPropsType = {
  maxCount: number;
  count: number;
  _id: string;
};

export default function UpdateItemsQuantity({
  maxCount,
  count,
  _id,
}: updateItemQuantityPropsType) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-8">
      <div className="flex gap-3 items-center">
        <Button
          disabled={count === maxCount}
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
      <Button
        variant={"destructive"}
        onClick={() => {
          dispatch(deleteItem(_id));
        }}
      >
        Delete
      </Button>
    </div>
  );
}
