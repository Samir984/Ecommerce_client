import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { decreaseItems, deleteItem, increaseItems } from "./cartSlice";
import { useAccountState } from "@/context/AccountContext";
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
  const { notification, dispatch: reducerDispatch } = useAccountState();

  console.log(count, maxCount);
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
          reducerDispatch({
            type: "updateNotification",
            payload: notification - 1,
          });
        }}
      >
        Delete
      </Button>
    </div>
  );
}
