import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Account() {
  return (
    <Link to="getting-started">
      <Button variant={"secondary"} size={"default"}>
        Signup
      </Button>
    </Link>
  );
}
