import { Outlet } from "react-router-dom";
import VendorNav from "./VendorNav";

export default function Vendor() {
  console.log("Vendor Page");

  return (
    <div className="p-2 mx-auto tablet:w-[90%]">
      <div className="flex gap-2 max-h-[80vh] ">
        <div className="bg-white w-12 tablet:w-44 py-8 px-1 rounded-lg min-h-[80vh]  ">
          <VendorNav />
        </div>
        <div className="p-2 bg-slate-200 flex-1 overflow-x-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
