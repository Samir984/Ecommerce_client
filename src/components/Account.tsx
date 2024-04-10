import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAccountState } from "@/context/AccountContext";
import UserAvatar from "./UserAvatar";

export default function Account() {
  const { loggedIn } = useAccountState();

  console.log("Account component");
  return (
    <>
      {loggedIn ? (
        <UserAvatar />
      ) : (
        <Link to="getting-started">
          <Button size={"default"}>signup</Button>
        </Link>
      )}
    </>
  );
}
