import { BsCart3 } from "react-icons/bs";
import Notification from "./Notification";
export default function Cart() {
  return (
    <div className="relative ">
      <Notification message={2}/>
      <BsCart3 color="white" size={30} />
    </div>
  );
}
