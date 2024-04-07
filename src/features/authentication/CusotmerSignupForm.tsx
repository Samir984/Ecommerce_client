import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customerSignup } from "@/services/authapi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type CustomerSignupType = {
  fullName: string;
  email: string;
  password: string;
  avatar: FileList;
};

export default function CustomerSignupForm() {
  const { register, handleSubmit, formState, reset } = useForm<CustomerSignupType>({
    defaultValues: {
      fullName: "Samir Neupane",
      email: "test@gmail.com",
      password: "samir0011",
    },
  });
  const { errors } = formState;
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation(customerSignup, {
    onSuccess: () => {
      toast.success("Customer account created successfully");
      reset();
      navigate("/auth/signin");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: CustomerSignupType) {
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
            {...register("avatar", { required: "Avatar is required" })}
          />
        </fieldset>

        <Button className="w-36 ml-auto mt-6" disabled={isLoading}>
          {isLoading ? <span className="loader"></span> : "Create an account"}
        </Button>
      </form>
    </div>
  );
}
