import { TbBuildingStore } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { BsBag } from "react-icons/bs";

import NavItem from "@/components/NavList";

export default function VendorNav() {
  console.log("VendorNav Page")
  return (
    <ul className="flex flex-col gap-6 font-serif ">
      <NavItem to={"store"} icon={TbBuildingStore} label="Store" />
      <NavItem to={"list-product"} icon={BsBag} label="List Product" />
      <NavItem to={"order"} icon={CiBoxList} label="Order" />
    </ul>
  ); 
}
