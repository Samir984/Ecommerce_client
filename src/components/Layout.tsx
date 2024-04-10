import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  console.log("Layout component");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-slate-100 py-10">
        <Outlet />
      </main>
    </div>
  );
}
