import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

type NavListType = {
  to: string;
  icon: IconType;
  label: string;
};

function NavItem({ to, icon, label }: NavListType) {
  const Icon = icon;

  return (
    <li className=" ">
      <NavLink
        to={to}
        className="flex items-center gap-1 tablet:gap-4 flex-wrap py-2 px-1 "
      >
        <Icon size={28} className="" />
        <span className="tablet:text-xl text-sm line-clamp-1">{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;