import { ReactNode, useEffect } from "react";
import { useAccountState } from "@/context/AccountContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  console.log("Protected Route");
  const navigate = useNavigate();
  const { loggedIn } = useAccountState();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/getting-started");
    }
  }, [loggedIn, navigate]);

  return <>{loggedIn && children}</>;
}
