import { BsCart3 } from "react-icons/bs";
import Notification from "./Notification";
import { useAccountState } from "@/context/AccountContext";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { notification } = useAccountState();
  const navigate = useNavigate();

  return (
    <div className="relative " onClick={() => navigate("cart")}>
      <Notification message={notification} />
      <BsCart3 color="black" className="text-xl tablet:text-3xl" />
    </div>
  );
}
