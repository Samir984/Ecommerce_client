import TableRow from "./TableRow";

type TableProps = {
  columns: string[];
  content: any;
};
export default function Table({ columns, content }: TableProps) {
  console.log("table");
  console.log(content);

  return (
    <div className="border-2 border-black">
      <div className="flex justify-between mb-2 bg-gray-100  shadow-sm p-1">
        {columns.map((col) => (
          <span className="font-semibold text-lg" key={col}>
            {col}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1 p-1">
        {content.map((row) => (
          <TableRow key={row?._id} row={row} />
        ))}
      </div>
    </div>
  );
}
