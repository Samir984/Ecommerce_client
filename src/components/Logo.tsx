import { Link } from "react-router-dom";
import Innovex_Logo from "./../asset/innovex.png";

type LogoType = {
  className?: string;
};

export default function Logo({ className }: LogoType) {
  console.log("Logo component");
  return (
    <Link to="/">
      <div
        className={`inline-flex items-center   gap-[2px] text-baee ${className} block w-10 tablet:w-fit`}
      >
        <span className="hidden tablet:block font-mono text-sky-700 font-medium text-3xl transform rotate-6">
          I
        </span>
        <span className="hidden tablet:block font-mono text-blue-500 tablet:text-2xl rotate-12">
          n
        </span>
        <span className="hidden tablet:block font-mono text-green-900 tablet:text-2xl -rotate-6 font-bold">
          n
        </span>
        <span className="hidden tablet:block font-mono text-green-500 tablet:text-2xl rotate-6">
          o
        </span>
        <span className="hidden tablet:block font-mono text-purple-500 tablet:text-2xl -rotate-6 rotating_v">
          v
        </span>
        <span className="hidden tablet:block font-mono text-indigo-500 tablet:text-2xl font-semibold">
          e
        </span>
        <span className="hidden tablet:block font-mono text-slate-500 tablet:text-2xl rotating_x">
          x
        </span>
        <img src={Innovex_Logo} alt="logo" className="inline w-10 h-10" />
      </div>
    </Link>
  );
}
