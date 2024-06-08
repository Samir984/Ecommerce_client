import TableRow from "./TableRow";

type TableProps = {
  columns: string[];
  content: any;
};
export default function Table({ columns, content }: TableProps) {
  const colWidth = 100 / (columns.length - 1);
  console.log(colWidth);

  return (
    <div className="">
      <div className="flex justify-evenly mb-2 bg-gray-100  shadow-sm py-4 px-1 border-b-2 border-gray-600  ">
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
      <div className={`flex flex-col  ${colWidth}`}>
        {content.map((row) => (
          <TableRow key={row?._id} row={row} colWidth={colWidth} />
        ))}
      </div>
    </div>
  );
}
