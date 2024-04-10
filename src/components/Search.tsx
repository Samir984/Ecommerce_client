import { IoSearch } from "react-icons/io5";

export default function Search() {
  console.log("Search component");
  return (
    <div className="flex items-center w-44 tablet:w-64 laptop:w-[500px] relative ">
      <input
        type="text"
        className="outline-none py-2 pl-2 pr-11 w-full focus:border-cyan-500  border rounded-l-lg"
        placeholder="Search your product"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-black rounded-r-lg">
        <IoSearch size={28} />
      </div>
    </div>
  );
}
