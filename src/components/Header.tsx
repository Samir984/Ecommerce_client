import { useAccountState } from "@/context/AccountContext";
import Account from "./Account";
import Cart from "./Cart";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
  const { accountMode } = useAccountState();
  console.log("header Compoenet");
  return (
    <div className="shadow-lg py-4  px-2 tablet:px-6 flex  items-center justify-between gap-3 tablet:gap-10 sticky top-0 z-30 bg-white">
      <Logo  />
      {accountMode !== "SELLER" && <Search  />}

      <div className="flex items-center justify-between tablet:gap-12 gap-6  ">
        {accountMode !== "SELLER" && <Cart />}
        <Account />
      </div>
    </div>
  );
}
