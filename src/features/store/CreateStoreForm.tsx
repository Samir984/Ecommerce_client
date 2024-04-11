import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccountState } from "@/context/AccountContext";
import { createStore } from "@/services/storeApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type CreateStoreType = {
  storeName: string;
  number: number;
  address: string;
  seller_id: string;
};

export default function CreateStoreForm() {
  const { dispatch } = useAccountState();
  console.log("CreateStoreForm Feature");
  const { _id } = useAccountState();
  const navigate = useNavigate();

  const { handleSubmit, formState, register } = useForm<CreateStoreType>();
  const { errors } = formState;

  const { mutate: create, isLoading } = useMutation(createStore, {
    onSuccess: (res) => {
      toast.success("store created successFully");
      dispatch({ type: "storeCreated", payload: res.data._id });
      console.log(
        "data create store form--------------------------------------------------------------------------",
        res.data._id
      );
      setTimeout(() => {
        navigate(`/vendor/store/${res.data._id}`);
      }, 300);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: CreateStoreType) {
    console.log(data);
    data.seller_id = _id;
    create(data);
  }
  return (
    <div className="p-2 ">
      <h2 className="font-medium text-center text-xl">Create you Store</h2>
      <form
        className="mt-12 p-4 flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Store Name"
          error={errors.storeName?.message}
          {...register("storeName", { required: "Store Name is required" })}
        />
        <Input
          type="number"
          placeholder="Number"
          error={errors.number?.message}
          {...register("number", { required: "Number is required" })}
        />
        <Input
          type="text"
          placeholder="Full-Address"
          error={errors.address?.message}
          {...register("address", { required: "Address is required" })}
        />

        <Button disabled={isLoading} className="items-center w-28  ml-auto">
          {isLoading ? (
            <span className="loader w-5 h-5 "></span>
          ) : (
            "create store"
          )}
        </Button>
      </form>
    </div>
  );
}
