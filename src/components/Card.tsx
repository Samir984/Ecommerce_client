import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useAccountState } from "@/context/AccountContext";
import { useMutation, useQueryClient } from "react-query";
import { deleteProductListing } from "@/services/productApi";
import toast from "react-hot-toast";

type CardPropsType = {
  title: string;
  price: number;
  url: string;
  _id: string;
  store_id: string;
};
export default function Card({
  title,
  price,
  url,
  store_id,
  _id,
}: CardPropsType) {
  const account = useAccountState();

  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProductListing,
    onSuccess: () => {
      toast.success("Proudct deleted succesfully");
      queryClient.invalidateQueries("products");
    },
  });

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-md flex flex-col hover:shadow-xl max-h-full bg-[#f7f7f7]">
      <div className="">
        <img
          src={url}
          className="w-full h-full object-cover transition-transform  hover:scale-[1.02] "
        />
      </div>
      <div className="flex-1 px-2 py-3 flex flex-col justify-center">
        <div className="font-medium text-base laptop:text-lg  mb-2 line-clamp-3">
          {title}
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 text-xl">Price: </span>
          <span className="text-green-500 font-bold text-lg">Rs {price}</span>
        </div>
        <div className="">
          {account.store_id === store_id ? (
            <div className="flex gap-6 items-center justify-end">
              <Link to={`/vendor/edit-product/${_id}`}>
                <MdOutlineEdit size={24} className="hover:text-green-600 " />
              </Link>

              <MdOutlineDelete
                size={24}
                className={`hover:text-red-600 ${
                  isDeleting && "rotate text-red-500 cursor-not-allowed"
                }`}
                onClick={() => deleteProduct(_id)}
              />
            </div>
          ) : (
            <BsCart3 size={24} className="ml-auto" />
          )}
        </div>
      </div>
    </div>
  );
}
