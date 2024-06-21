import { Button } from "@/components/ui/button";
import { useCheckOut } from "@/context/CheckoutContext";
import { getCookie } from "@/lib/utils";
import { URL } from "@/services/config";
import { createOrder } from "@/services/orderapi";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";

export default function Payment() {
  const { onStepChange, handleOrderStateForm, order } = useCheckOut();
  const [paymentMethod, setPaymentMethod] = useState(() => order.paymentMethod);
  const [searchParams] = useSearchParams();
  const validationParams = searchParams.get("data");
  console.log(validationParams);

  useEffect(() => {
    async function validationCheck() {
      console.log("run", validationParams);
      if (validationParams !== null) {
        const response = await fetch(
          `${URL}orders/payment/success?data=${validationParams}`
        );
        const resondData = await response.json();
        onStepChange(3);
        console.log(resondData);
      }
    }
    validationCheck();
  }, [validationParams, onStepChange]);

  const { mutate: makeOrder, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order Placed Successfully");
      if (paymentMethod === "esewa") {
        return handelPayment();
      }
      onStepChange(3);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const handelPayment = async function () {
    try {
      const token = getCookie("jwtToken");
      const response = await fetch(`${URL}orders/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          totalPrice: order.totalPrice,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        const form = document.createElement("form");
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.method = "POST";
        console.log(data.data);

        Object.entries(data.data).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("error on payment procress");
    }
  };

  const handelOrder = function () {
    console.log(paymentMethod);
    if (paymentMethod === "esewa") {
      makeOrder(order);
    } else {
      makeOrder(order);
    }
  };

  const handlePaymentMethod = function (method: "esewa" | "cashOnDelivery") {
    console.log(method);
    setPaymentMethod(method);
    handleOrderStateForm({ paymentMethod: method });
  };
  console.log(order);
  return (
    <>
      <div className={"flex justify-center gap-3"}>
        <div
          className={`  p-2 flex flex-col items-center justify-center  hover:bg-gray-50 ${
            paymentMethod === "esewa" && "shadow-lg bg-gray-100 "
          }`}
          onClick={() => handlePaymentMethod("esewa")}
        >
          <img
            src="https://laz-img-cdn.alicdn.com/tfs/TB1EdzsDuT2gK0jSZFvXXXnFXXa-160-160.png"
            alt="e-sewa"
            className="w-20"
          />
          <div>
            <h1 className=" font-bold text-gray-600">eSewa Mobile Wallet</h1>
          </div>
        </div>
        <div
          className={`  p-2 flex flex-col items-center justify-center  hover:bg-gray-50  ${
            paymentMethod === "cashOnDelivery" && "shadow-lg bg-gray-100 "
          }`}
          onClick={() => handlePaymentMethod("cashOnDelivery")}
        >
          <img
            src="https://laz-img-cdn.alicdn.com/tfs/TB1utb_r8jTBKNjSZFwXXcG4XXa-80-80.png"
            alt="e-sewa"
            className="w-20"
          />
          <div>
            <h1 className=" font-bold  text-gray-600">Cash On Delivery</h1>
          </div>
        </div>
      </div>
      {paymentMethod && (
        <div className="mt-6 flex flex-col justify-center bg-gray-100 px-6 py-4 mb-6 mx-auto max-w-[1000px]">
          {paymentMethod === "esewa" ? (
            <ol className="list-decimal">
              <li className="line-clamp-2">
                Login to your eSewa account using your eSewa ID and your
                Password
              </li>
              <li className="line-clamp-2">
                Ensure your eSewa account is active and has sufficient balance.
              </li>
              <li className="line-clamp-2">
                Enter OTP (one time password) sent to your registered mobile
                number ***Login with your eSewa mobile and PASSWORD (not MPin)
              </li>
            </ol>
          ) : (
            <div>
              <p>
                You can pay in cash to our courier when you receive the goods at
                your doorstep.
              </p>
            </div>
          )}
          <Button
            variant={"destructive"}
            className="w-32 mt-4"
            onClick={handelOrder}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loader loaderWhite  w-5 h-5"></span>
            ) : paymentMethod === "esewa" ? (
              "Pay now"
            ) : (
              "Confirm order"
            )}
          </Button>
        </div>
      )}
    </>
  );
}
