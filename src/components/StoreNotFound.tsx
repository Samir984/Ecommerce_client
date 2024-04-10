import { Link } from "react-router-dom";

export default function StoreNotFound() {
  console.log("StoreNotFound Compoenet");
  return (
    <div className="flex h-[300px] w-full justify-center items-center">
      <div className="text-red-600 text-2xl  transition-all ">
        Store doesn't store .
        <Link
          to="/vendor/create-store"
          className="underline  text-slate-700 hover:text-blue hover:no-underline text-center"
        >
          Create store
        </Link>
      </div>
    </div>
  );
}
