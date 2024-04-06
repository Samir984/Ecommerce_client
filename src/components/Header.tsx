import Account from "./Account";
import Cart from "./Cart";
import Logo from "./Logo";
import Search from "./Search";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-700 to-black py-4 px-2 flex  items-center justify-between gap-4 ">
      <Logo />
      <Search />
      <Cart />
      <Account />
    </div>
  );
}
