import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useAccountState } from "@/context/AccountContext";
import { useEffect } from "react";

export default function Layout() {
  const { accountMode, store_id } = useAccountState();
  const navigate = useNavigate();

  useEffect(() => {
    if (accountMode === "SELLER") {
      navigate(`/vendor/store/${store_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-[280px]">
      <Header />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
