import { BsCart3 } from "react-icons/bs";
import Notification from "./Notification";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
export default function Cart() {
  const notification = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const navigate = useNavigate();

  return (
    <div className="relative " onClick={() => navigate("cart")}>
      <Notification message={notification} />
      <BsCart3 color="black" className="text-xl tablet:text-3xl" />
    </div>
  );
}
