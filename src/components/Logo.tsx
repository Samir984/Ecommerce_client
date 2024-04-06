import { Link } from "react-router-dom";
import Innovex_Logo from "./../asset/innovex.png";

export default function Logo() {
  return (
    <Link to="/">
      <div className="inline-flex items-center p-1 px-2 gap-[2px] ">
        <span className="font-mono text-sky-700 font-medium text-3xl transform rotate-6">
          I
        </span>
        <span className="font-mono text-blue-500 text-2xl rotate-12">n</span>
        <span className="font-mono text-green-900 text-2xl -rotate-6 font-bold">
          n
        </span>
        <span className="font-mono text-green-500 text-2xl rotate-6">o</span>
        <span className="font-mono text-purple-500 text-2xl -rotate-6 rotating_v">
          v
        </span>
        <span className="font-mono text-indigo-500 text-2xl font-semibold">
          e
        </span>
        <span className="font-mono text-slate-500 text-2xl rotating_x">x</span>
        <img src={Innovex_Logo} alt="logo" className="w-10 inline" />
      </div>
    </Link>
  );
}
