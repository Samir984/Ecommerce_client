import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAccountState } from "@/context/AccountContext";
import { signoutUser } from "@/services/authApi";

export default function DropDownBox() {
  const { accountMode, dispatch } = useAccountState();

  const profileRoute =
    accountMode === "SELLER" ? "/vendor/profile" : "/profile";

  return (
    <div className="absolute top-18 right-4 min-w-36 h-50 bg-white  hidden group-hover:block border-2 shadow-lg ">
      <ul className="font-medium text-lg">
        <li className="hover:bg-gray-100 p-2 ">
          <Link
            to={`${profileRoute}`}
            className="flex justify-center gap-8 items-center"
          >
            <span>Profile</span>
            <CgProfile />
          </Link>
        </li>
        <li
          className="hover:bg-gray-100 p-2 flex justify-center gap-5 items-center"
          onClick={() => {
            dispatch({ type: "signout" });
            signoutUser();
          }}
        >
          <span>Sign out</span> <MdLogout />
        </li>
      </ul>
    </div>
  );
}
