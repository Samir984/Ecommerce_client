import { TbBuildingStore } from "react-icons/tb";
import { CiBoxList } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

import NavItem from "@/components/NavList";
import { useAccountState } from "@/context/AccountContext";

export default function VendorNav() {
  const { store_id } = useAccountState();
  console.log("VendorNav Page");
  return (
    <ul className="flex flex-col gap-6 font-serif sticky top-[112px] ">
      <NavItem to={`store/${store_id}`} icon={TbBuildingStore} label="Store" />
      <NavItem to={`list-product`} icon={BsBag} label="List Product" />
      <NavItem to={`order`} icon={CiBoxList} label="Order" />
      <NavItem to={`profile`} icon={CgProfile} label="Profile" />
    </ul>
  );
}
