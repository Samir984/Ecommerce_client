import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { userSignin } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAccountState } from "@/context/AccountContext";

export type UserSigninType = {
  email: string;
  password: string;
};

export default function SigninForm() {
  console.log("SigninForm feature");
  const naviagate = useNavigate();
  const { dispatch, email, accountMode, store_id } = useAccountState();
  console.log("SigninForm->   sellerState:", store_id);

  const { register, handleSubmit, formState, reset } = useForm<UserSigninType>({
    defaultValues: {
      email: email,
    },
  });
  const { errors } = formState;

  const { mutate: signin, isLoading } = useMutation({
    mutationFn: userSignin,
    onSuccess: (res) => {
      toast.success("Customer account created successfully");
      reset();
      console.log(
        "------------------------\n\n\n\n",
        typeof res.data.store_id,
        "\n\n\n\n------------------"
      );
      dispatch({ type: "signin", payload: res.data });
      const nextRoute =
        accountMode === "BUYER"
          ? "/"
          : accountMode === "SELLER" && res.data.store_id === null
          ? "/vendor/create-store"
          : `/vendor/store/${store_id}`;

      console.log(nextRoute, accountMode);
      naviagate(nextRoute);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: UserSigninType) {
    console.log(data);
    signin(data);
  }

  return (
    <div className="px-12 pt-6 pb-16">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="Email"
          className=""
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please provide a valid email address",
            },
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          className=""
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            validate: (fieldValue) => {
              return fieldValue.length < 8
                ? "Password must be at least 8 characters long"
                : true;
            },
          })}
        />

        <Button className="w-36 ml-auto mt-6" disabled={isLoading}>
          {isLoading ? <span className="loader w-5 h-5"></span> : "sign in"}
        </Button>
      </form>
    </div>
  );
}
