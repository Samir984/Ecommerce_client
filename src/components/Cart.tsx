import { BsCart3 } from "react-icons/bs";
import Notification from "./Notification";
export default function Cart() {
  console.log("Cart Component")
  return (
    <div className="relative ">
      <Notification message={2}/>
      <BsCart3 color="black" size={30} />
    </div>
  );
}
