type TableProps = {
  columns: string[];
  data: any;
};
export default function Table({ columns, data }:TableProps) {
  return (
    <div className="border-2 border-black">
      <div className="flex justify-between mb-2 bg-gray-100  shadow-sm p-1">
        {columns.map((col) => (
          <span className="font-semibold text-lg  ">{col}</span>
        ))}
      </div>
    </div>
  );
}
