import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Filter() {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    setSelectedValue("");
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != "") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortbyprice", `${e.target.value}`);
      setSearchParams(params);
    }
    setSelectedValue(e.target.value);
  };

  return (
    <div className="py-3 px-1">
      <p className="text-lg mb-4 font-medium">Filter </p>
      <select
        id="mySelect"
        className="py-2 px-3 rounded-2xl bg-white focus:outline-none border border-gray-600"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">Best Match</option>
        <option value="asc">price low to high</option>
        <option value="dec">price hight to low</option>
      </select>
    </div>
  );
}
