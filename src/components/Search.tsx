import { IoSearch } from "react-icons/io5";

export default function Search() {
  return (
    <div className="flex items-center w-44 tablet:w-64 laptop:w-[400px]">
      <input
        type="text"
        className="outline-none py-2 px-2 w-full"
        placeholder="Search you product"
      />
      <div className="bg-sky-700 p-[5px] w-20px">
        <IoSearch size={28} color="white" />
      </div>
    </div>
  );
}
