import { useAccountState } from "@/context/AccountContext";
import Account from "./Account";
import Cart from "./Cart";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
  const { accountMode } = useAccountState();
  console.log("header Compoenet");
  return (
    <div className="shadow-md py-4 px-2 flex  items-center justify-between gap-10">
      <Logo />
      {accountMode !== "SELLER" && <Search />}

      <div className="flex items-center justify-between gap-12  ">
        {accountMode !== "SELLER" && <Cart />}
        <Account />
      </div>
    </div>
  );
}
