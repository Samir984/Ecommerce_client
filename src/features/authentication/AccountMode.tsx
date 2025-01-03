import { FcBusinessman } from "react-icons/fc";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { GiLaptop } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

import { Link } from "react-router-dom";
import { useAccountState } from "@/context/AccountContext";

export default function AccountMode() {
  const { accountMode, dispatch } = useAccountState();

  return (
    <div className="flex flex-col laptop:px-28  px-8 mt-16 ">
      <div className="py-6">
        <Logo className="scale-[1.4] ml-5" />
      </div>

      <h1 className="text-[60px] leading-[50px] font-extrabold mt-12">
        How do you want to sign up in Innovex
      </h1>

      <h2 className="text-xl font-light mt-6">
        We’ll personalize your setup experience accordingly.
      </h2>
      <div className="mt-14 max-w-[500px] ">
        <div
          className={`flex items-center gap-8 px-6 py-3 bg-gray-100 hover:bg-gray-200  border ${
            accountMode === "SELLER"
              ? "border-gray-900"
              : "hover:border-gray-700 "
          } `}
          onClick={() => dispatch({ type: "accountMode", payload: "SELLER" })}
        >
          <FcBusinessman size={40} />
          <span className="font-medium text-xl line-clamp-2">
            Be a Vendor on our platform. Create your own store.
            <MdOutlineBusinessCenter size={24} className="inline ml-2" />
          </span>
        </div>
        <div
          className={`flex items-center gap-8 px-6 py-3 bg-gray-100 hover:bg-gray-200  border mt-8 ${
            accountMode === "BUYER"
              ? "border-gray-900"
              : "hover:border-gray-700 "
          } `}
          onClick={() => dispatch({ type: "accountMode", payload: "BUYER" })}
        >
          <PiShoppingCartSimpleLight size={40} />
          <span className="font-medium text-xl line-clamp-2  ">
            Become a Consumer. Explore our products.
            <GiLaptop size={24} className="inline ml-2" />
          </span>
        </div>
      </div>

      <Link
        to={`${
          accountMode === "BUYER" ? "/auth/signup" : "/auth/become-vendor"
        }`}
        className={`mt-12 `}
      >
        <Button variant={"default"}>
          <span>Create account</span>
        </Button>
      </Link>
    </div>
  );
}
