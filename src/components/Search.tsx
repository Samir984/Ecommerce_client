import { useState } from "react";
import { IoSearch } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

export default function Search() {
  console.log("Search component");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`results?query=${query}`);
    }
  };

  return (
    <div className="flex items-center w-44 tablet:w-64 laptop:w-[500px] relative">
      <input
        type="text"
        className="outline-none py-2 pl-2 pr-8 w-full focus:border-cyan-500  border rounded-l-lg"
        placeholder="Search your product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="absolute inset-y-0 -right-2 flex items-center px-2 text-black rounded-r-lg bg-slate-200 cursor-pointer h-11"
        onClick={() => navigate(`results?query=${query}`)}
      >
        <IoSearch size={20} />
      </div>
    </div>
  );
}
