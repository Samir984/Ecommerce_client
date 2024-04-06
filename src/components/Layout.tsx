import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        main
        <Outlet />
      </main>
    </div>
  );
}
