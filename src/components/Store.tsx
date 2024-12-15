import { IoStorefrontOutline } from "react-icons/io5";

import Notification from "./Notification";
export default function Store() {
  return (
    <div className="relative ">
      <Notification message={2} />
      <IoStorefrontOutline color="black" size={30} />
    </div>
  );
}
