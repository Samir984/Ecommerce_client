export default function TableRow({ row, colWidth }) {
  console.log("table row");
  return (
    <div className="flex  items-center justify-evenly bg-slate-100 py-4 border-b-2 border-gray-300">
      <div
        className="flex gap-1 flex-col justify-center items-center text-center "
        style={{ width: `${colWidth}%` }}
      >
        <img
          src={row.orderItem.image}
          alt="product-img"
          className="w-12 h-12"
        />
        <h4 className="text-lg font-medium w-32 line-clamp-2 text-gray-700">
          {row.orderItem.name}
        </h4>
      </div>
      <div
        className="flex gap-1 flex-col justify-center items-center text-center "
        style={{ width: `${colWidth}%` }}
      >
        <img
          src={row.user_id.avatar.url}
          alt="product-img"
          className="w-8 h-8 rounded-full"
        />
        <h4 className="text-lg font-semibold w-32 line-clamp-1 text-gray-700 text-center">
          {row.user_id.fullName}
        </h4>
        <span className="font-medium">{row.phoneNumber} </span>
      </div>

      <div
        className="font-medium text-lg text-center"
        style={{ width: `${colWidth}%` }}
      >
        {row.orderItem.quantity}
      </div>
      <div
        className="font-medium text-center"
        style={{ width: `${colWidth}%` }}
      >
        {row.shippingAddress}
      </div>
      <div
        className="font-medium text-center"
        style={{ width: `${colWidth}%` }}
      >
        {row.paymentMethod}
      </div>
      <div
        className="font-medium text-center"
        style={{ width: `${colWidth}%` }}
      >
        {row.status}
      </div>
      <div
        className="font-medium text-center"
        style={{ width: `${colWidth}%` }}
      >
        {row.totalPrice}
      </div>
      <div
        className="font-medium text-center"
        style={{ width: `${colWidth}%` }}
      >
        {new Date(row.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
