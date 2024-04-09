import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccountState } from "@/context/AccountContext";
import { userSignup } from "@/services/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type UserSignupType = {
  fullName: string;
  email: string;
  password: string;
  avatar?: FileList;
  role:"SELLER"|"BUYER"|"ADMIN"|""
};

export default function SignupForm() {
  const { register, handleSubmit, formState, reset } = useForm<UserSignupType>({
    defaultValues: {
      fullName: "buyer_1",
      email: "buyer_1@gmail.com",
      password: "buyer__1",
    },
  });
  const { errors } = formState;

  const navigate = useNavigate();
  const { dispatch,accountMode } = useAccountState();

  const { mutate: signup, isLoading } = useMutation(userSignup, {
    onSuccess: (res) => {
      console.log(res);
      dispatch({ type: "signup", payload: res.data });
      toast.success("Customer account created successfully");
      setTimeout(() => {
        navigate("/auth/signin");
      }, 400);
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: UserSignupType) {
    data.role=accountMode
    console.log(data);
    signup(data);
  }

  return (
    <div className="px-12 pt-6 pb-16">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Full Name"
          className=""
          error={errors.fullName?.message}
          {...register("fullName", { required: "Full Name is required" })}
        />
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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <fieldset className="border-2 border-black">
          <legend>Select a user avatar</legend>

          <Input
            type="file"
            id="avatar"
            className=""
            error={errors.avatar?.message}
            accept=".png,.jpg"
            {...register("avatar")}
          />
        </fieldset>

        <Button className="w-36 ml-auto mt-6" disabled={isLoading}>
          {isLoading ? (
            <span className="loader w-5 h-5"></span>
          ) : (
            "Create an account"
          )}
        </Button>
      </form>
    </div>
  );
}
