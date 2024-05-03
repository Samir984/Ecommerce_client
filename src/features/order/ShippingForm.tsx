import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderStateType, useCheckOut } from "@/context/CheckoutContext";

export type ShippingFormType = Partial<OrderStateType>;

export default function ShippingForm() {
  const { onStepChange, handleOrderStateForm, order } = useCheckOut();
  const { register, handleSubmit, formState } = useForm<ShippingFormType>({
    defaultValues: {
      shippingAddress: order.shippingAddress,
      phoneNumber: order.phoneNumber,
    },
  });
  const { errors } = formState;
  const onSubmit = (data: ShippingFormType) => {
    if (Object.keys(errors).length !== 0) return;
    handleOrderStateForm(data);
    onStepChange(2);
  };
  console.log(order);

  return (
    <div className="px-12 pt-6 pb-16">
      <form
        className="flex flex-col gap-5 max-w-[760px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Shipping Address"
          error={errors.shippingAddress?.message}
          {...register("shippingAddress", { required: "Address is required" })}
        />

        <Input
          type="text"
          placeholder="Phone Number"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber", { required: "Phone Number is required" })}
        />

        <Button className="w-36 ml-auto mt-6" type="submit">
          Move Next
        </Button>
      </form>
    </div>
  );
}
