import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import SwitchAuthForm from "@/components/SwitchAuthForm";
import { Outlet } from "react-router-dom";

export default function Auth() {
  console.log("Auth page")
  return (
    <div className=" bg-slate-100 min-h-[100vh]">
      <div className="flex justify-center items-center flex-col gap-8   ">
        <Logo className="scale-[1.4] mt-12" />
        <Heading />
        <div className="bg-white ">
          <SwitchAuthForm>
            <Outlet />
          </SwitchAuthForm>
        </div>
      </div>
    </div>
  );
}
