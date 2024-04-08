import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="flex items-center w-44 tablet:w-64 laptop:w-[400px] relative">
      <input
        type="text"
        className="outline-none py-2 px-2 w-full focus:border-cyan-500  border rounded-l-lg"
        placeholder="Search your product"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 bg-gray-700 text-white rounded-r-lg">
        <IoSearch size={28} />
      </div>
    </div>
  );
}
