import { formatNumberWithCommas } from "@/lib/utils";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoCallSharp } from "react-icons/io5";
import { LiaSaveSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import { useState } from "react";

export default function OrderRow({ row, colWidth }) {
  const [rowMode, setRowMode] = useState<null | string>(null);

  

  return (
    <div
      className={`flex  justify-evenly relative ${
        rowMode === "edit" ? "bg-green-100" : " bg-white"
      } py-4 border-b-2 border-gray-300`}
    >
      <div
        className="flex gap-1 flex-col justify-center items-center text-center"
        style={{ width: `${colWidth}%` }}
      >
        <img
          src={row.orderItem.image}
          alt="product-img"
          className="w-12 h-12 rounded-md object-cover"
        />
        <h4 className=" font-semibold w-32 line-clamp-2 text-gray-700 mt-2">
          {row.orderItem.name}
        </h4>
        <div className=" flex  gap-2 items-center font-medium  text-center text-gray-500">
          <MdProductionQuantityLimits color="red" />
          {row.orderItem.quantity}
        </div>
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
        <div className="flex items-center gap-2   font-medium   text-blue-600">
          <CiLocationOn size={20} />
          <span className="">{row.shippingAddress}</span>
        </div>
        <div className="flex items-center gap-2   font-medium   text-blue-600">
          <IoCallSharp />
          <span className=" text-gray-600">{row.phoneNumber}</span>
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-2 font-medium text-center "
        style={{ width: `${colWidth}%` }}
      >
        <span
          className={`p-2 w-fit  rounded-full ${
            row.paymentMethod !== "esewa"
              ? "bg-green-400 text-white"
              : "bg-pink-400 text-white"
          }`}
        >
          {row.paymentMethod}
        </span>
        <span className="text-orange-600">
          {" "}
          Rs.&nbsp;{formatNumberWithCommas(row.totalPrice)}
        </span>
      </div>
      <div
        className=" text-center   font-medium text-gray-700 "
        style={{ width: `${colWidth}%` }}
      >
        <select
          defaultValue={row.status}
          disabled={rowMode === "edit" ? false : true}
          className=" appearance-none   bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-gray-400"
        >
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="on way">On way</option>
        </select>
      </div>

      <div
        className="font-medium text-center text-gray-700"
        style={{ width: `${colWidth}%` }}
      >
        {new Date(row.updatedAt).toLocaleDateString()}
      </div>

      <div className="absolute  top-4 right-0  group">
        <div className="p-2 bg-gray-200 rounded-full">
          <BsThreeDotsVertical />
        </div>
        <div className="hidden group-hover:flex  absolute top-8 right-0 flex-col gap-1 px-1 py-2  bg-[#f7f7f7]">
          <div
            className={`flex gap-2 items-center hover:bg-white px-4 py-1 hover:text-yellow-700 ${
              rowMode === "edit" && "bg-white"
            }`}
            onClick={() =>
              setRowMode((prev) => (prev === "edit" ? null : "edit"))
            }
          >
            <LiaEdit />
            <span>Edit</span>
          </div>
          <div
            className={`flex gap-2 items-center hover:bg-white px-4 py-1 hover:text-green-700 `}
            onClick={() => setRowMode("save")}
          >
            <LiaSaveSolid />
            <span>Save</span>
          </div>
          <div
            className={`flex gap-2 items-center hover:bg-white px-4 py-1 hover:text-red-700 `}
            onClick={() => setRowMode("delete")}
          >
            <MdOutlineDelete />
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
