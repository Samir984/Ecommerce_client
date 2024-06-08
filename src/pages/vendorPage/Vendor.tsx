import { Outlet } from "react-router-dom";
import VendorNav from "./VendorNav";

export default function Vendor() {
  console.log("Vendor Page");

  return (
    <div className="p-2 mx-auto laptop:w-[90%]">
      <div className="flex gap-2 ">
        <div className="bg-white  tablet:w-44 py-8 px-1 rounded-lg ">
          <VendorNav />
        </div>
        <div className="  flex-1  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
