import { formatNumberWithCommas } from "@/lib/utils";
import { IoCallSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function OrderRow({ row, colWidth }) {
  console.log("table row");
  return (
    <div className="flex items-center justify-evenly relative  bg-white py-4 border-b-2 border-gray-300">
      <div
        className="flex gap-1 flex-col justify-center items-center text-center"
        style={{ width: `${colWidth}%` }}
      >
        <img
          src={row.orderItem.image}
          alt="product-img"
          className="w-12 h-12 rounded-md object-cover"
        />
        <h4 className="text-lg font-medium w-32 line-clamp-2 text-gray-700 mt-2">
          {row.orderItem.name}
        </h4>
      </div>
      <div
        className="flex gap-1 flex-col justify-center items-center text-center"
        style={{ width: `${colWidth}%` }}
      >
        <img
          src={row.user_id.avatar.url}
          alt="user-avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
        <h4 className="text-lg font-semibold w-32 line-clamp-1 text-gray-700 mt-2">
          {row.user_id.fullName}
        </h4>
        <span className=" text-gray-600">{row.phoneNumber}</span>
      </div>
      <div
        className="font-medium text-lg text-center text-blue-800"
        style={{ width: `${colWidth}%` }}
      >
        {row.orderItem.quantity}
      </div>
      <div
        className="font-medium text-center w-40 truncate text-green-600"
        style={{ width: `${colWidth}%` }}
      >
        {row.shippingAddress}
      </div>
      <div
        className="font-medium text-center "
        style={{ width: `${colWidth}%` }}
      >
        <span
          className={`p-2 rounded-full ${
            row.paymentMethod !== "esewa"
              ? "bg-green-400 text-white"
              : "bg-pink-400 text-white"
          }`}
        >
          {row.paymentMethod}
        </span>
      </div>
      <div
        className="font-medium text-center text-gray-700 "
        style={{ width: `${colWidth}%` }}
      >
        <select
          defaultValue={row.status}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="on way">On way</option>
        </select>
      </div>
      <div
        className="font-medium text-center text-orange-700"
        style={{ width: `${colWidth}%` }}
      >
        Rs&nbsp;{formatNumberWithCommas(row.totalPrice)}
      </div>
      <div
        className="font-medium text-center text-gray-700"
        style={{ width: `${colWidth}%` }}
      >
        {new Date(row.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
