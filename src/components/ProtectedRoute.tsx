import { ReactNode, useEffect } from "react";
import { useAccountState } from "@/context/AccountContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  console.log("Protected Route");
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { loggedIn, accountMode } = useAccountState();
  let route = "";

  if (!loggedIn) {
    route = "/getting-started";
  }
  if (accountMode === "BUYER" && items.length === 0) {
    route = "/";
  }

  useEffect(() => {
    navigate(route);
  }, [loggedIn, navigate, route]);

  return <>{loggedIn && children}</>;
}
