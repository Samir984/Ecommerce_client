import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

import { useAccountState } from "@/context/AccountContext";
import { useMutation, useQueryClient } from "react-query";
import { deleteProductListing } from "@/services/productApi";
import toast from "react-hot-toast";
import { formatNumberWithCommas } from "@/lib/utils";

type CardPropsType = {
  title: string;
  price: number;
  stock?: number;
  url: string;
  _id: string;
  store_id?: string;
};
export default function Card({
  title,
  price,
  url,
  store_id,
  stock,
  _id,
}: CardPropsType) {
  const account = useAccountState();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProductListing,
    onSuccess: () => {
      toast.success("Proudct deleted succesfully");
      queryClient.invalidateQueries("products");
    },
  });

  return (
    <div
      className="max-w-xs rounded overflow-hidden shadow-md cursor-pointer flex flex-col hover:shadow-xl max-h-full bg-[#f7f7f7]"
      onClick={() => {
        if (account.accountMode !== "BUYER") return;
        navigate(`/product/${_id}`);
      }}
    >
      <div className="">
        <img
          src={url}
          className="w-full h-full object-cover transition-transform  hover:scale-[1.02] "
        />
      </div>
      <div className="flex-1 px-2 py-3 flex flex-col justify-center">
        <div className="font-medium text-base laptop:text-lg  mb-2 line-clamp-3 font-inter">
          {title}
        </div>
        <div className="mb-2">
          <span className="text-orange-600 font-bold text-lg">
            Rs. {formatNumberWithCommas(price)}
          </span>
        </div>
        <div className="">
          {account.store_id === store_id && (
            <div className="flex gap-6 items-center justify-between">
              <div className=" p-1 bg-green-600 rounded-lg text-white font-medium ">
                Stock: {stock}
              </div>
              <div className="flex gap-5">
                <Link to={`/vendor/edit-product/${_id}`}>
                  <MdOutlineEdit
                    size={32}
                    color="white"
                    className="hover:text-green-400  rounded-full  bg-green-300 p-1"
                  />
                </Link>

                <MdOutlineDelete
                  size={32}
                  color="white"
                  className={`hover:text-red-600 bg-red-400 rounded-full p-1  ${
                    isDeleting && "rotate text-red-500 cursor-not-allowed"
                  }`}
                  onClick={() => deleteProduct(_id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
