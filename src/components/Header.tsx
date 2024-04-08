import { useAccountState } from "@/context/AccountContext";
import Account from "./Account";
import Cart from "./Cart";
import Logo from "./Logo";
import Search from "./Search";
import Store from "./store";

export default function Header() {
  const { accountMode } = useAccountState();
  return (
    <div className="shadow-md py-4 px-2 flex  items-center justify-between gap-10">
      <Logo />
      <Search />
      <div className="flex items-center justify-between gap-4 w-56 ">
        {accountMode == "SELLER" ? <Store /> : <Cart />}
        <Account />
      </div>
    </div>
  );
}
