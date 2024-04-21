import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAccountState } from "@/context/AccountContext";
import UserAvatar from "./UserAvatar";
import DropDownBox from "./DropDownBox";

export default function Account() {
  const { loggedIn } = useAccountState();

  console.log("Account component");
  return (
    <>
      {loggedIn ? (
        <div className="group">
          <UserAvatar className="tablet:w-12 tablet:h-12 w-9 h-9 cursor-pointer" />
          <DropDownBox />
        </div>
      ) : (
        <Link to="getting-started">
          <Button size={"default"}>signup</Button>
        </Link>
      )}
    </>
  );
}
