import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

type PaginationPropsType = {
  page: number;
  lastPage: number;
  handleNextPage: (page: number) => void;
};

export default function Pagination({
  page,
  handleNextPage,
  lastPage,
}: PaginationPropsType) {
  return (
    <div className="flex text-white text-lg justify-end mt-16">
      <button
        className="flex bg-gray-700  w-[120px] items-center justify-center p-2 disabled:cursor-not-allowed"
        disabled={page == 1}
        onClick={() => handleNextPage(--page)}
      >
        <GrFormPrevious size={24} />
        Previous
      </button>
      <button className="text-black w-8">{page}</button>
      <button
        className="flex bg-gray-700 p-2 w-[120px] items-center justify-center disabled:cursor-not-allowed"
        disabled={page == lastPage}
        onClick={() => handleNextPage(++page)}
      >
        Next
        <GrFormNext size={24} />
      </button>
    </div>
  );
}
