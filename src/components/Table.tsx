import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

type TableProps = {
  columns: string[];
  content: any;
  lastPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
export default function Table({
  columns,
  content,
  lastPage,
  page,
  setPage,
}: TableProps) {
  const colWidth = 100 / (columns.length - 1);

  return (
    <div className="">
      <div className="flex justify-evenly items-center mb-2 bg-gray-100  shadow-sm py-4 px-1 border-b-2 border-gray-600  ">
        {columns.map((col) => (
          <span
            className="font-semibold text-lg text-center"
            key={col}
            style={{ width: `${colWidth}%` }}
          >
            {col}
          </span>
        ))}
      </div>
      <div className={`flex flex-col  ${colWidth}`}>{content()}</div>
      <div className="flex items-center justify-end gap-6  p-4  bg-gray-100">
        <button
          className="px-4 py-2 bg-white disabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <SlArrowLeft />
        </button>
        <span>{page}</span>
        <button
          className="px-4 py-2 bg-white isabled:cursor-not-allowed"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === lastPage}
        >
          <SlArrowRight />
        </button>
      </div>
    </div>
  );
}
