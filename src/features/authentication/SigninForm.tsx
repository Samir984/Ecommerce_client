import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import { UserSignin } from "@/services/authapi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { initialState, useAccountState } from "@/context/AccountContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type UserSigninType = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const [localAccountState] = useLocalStorage("AccountState", initialState);
  console.log(localAccountState);
  const { register, handleSubmit, formState, reset } = useForm<UserSigninType>({
    defaultValues: {
      email: localAccountState?.email,
    },
  });
  const { errors } = formState;

  const naviagate = useNavigate();
  const { dispatch } = useAccountState();

  const { mutate: signin, isLoading } = useMutation(UserSignin, {
    onSuccess: (res) => {
      toast.success("Customer account created successfully");
      reset();
      console.log(res);
      dispatch({ type: "signin", payload: res.data });
      naviagate("/");
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
