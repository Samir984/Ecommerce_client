export default function TableRow({ row }) {
  console.log("table row");
  return (
    <div className="flex justify-between  items-center">
      <div className="flex gap-1 flex-col justify-center items-center ">
        <img
          src={row.orderItem.image}
          alt="product-img"
          className="w-32 h-32"
        />
        <h4 className="text-lg font-medium w-32 line-clamp-2 text-gray-700">{row.orderItem.name}</h4>
      </div>
      <div className="font-medium">{row.user_id.fullName}</div>
      <div className="">{row.phoneNumber}</div>
      <div className="font-medium text-lg">{row.orderItem.quantity}</div>
      <div className="font-medium">{row.shippingAddress}</div>
      <div className="font-medium">{row.paymentMethod}</div>
      <div className="font-medium">{row.status}</div>
      <div className="font-medium">{row.totalPrice}</div>
      <div className="font-medium">{new Date(row.updatedAt).toLocaleDateString()}</div>
    </div>
  );
}
