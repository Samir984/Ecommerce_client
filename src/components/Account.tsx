import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAccountState } from "@/context/AccountContext";
import UserAvatar from "./UserAvatar";
import { getInitials } from "@/lib/utils";

export default function Account() {
  const { loggedIn, fullName, avatar } = useAccountState();
  console.log(loggedIn);

  console.log(avatar);
  return (
    <>
      {loggedIn ? (
        <UserAvatar userAvatar={avatar.url} fallBack={getInitials(fullName)} />
      ) : (
        <Link to="getting-started">
          <Button size={"default"}>signup</Button>
        </Link>
      )}
    </>
  );
}
