import Logo from "@/components/Logo";
import SwitchAuthForm from "@/components/SwitchAuthForm";

export default function Auth() {
  return (
    <div className=" bg-slate-50 min-h-[100vh]">
      <div className="flex justify-center items-center flex-col gap-8 min-h-[30vh]  ">
        <Logo />
        <div className="bg-white ">
          <SwitchAuthForm />
        </div>
      </div>
    </div>
  );
}
