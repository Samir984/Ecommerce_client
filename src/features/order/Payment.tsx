import { Button } from "@/components/ui/button";
import { useCheckOut } from "@/context/CheckoutContext";
import { URL } from "@/services/config";
import { createOrder, handelPayment_Esewa } from "@/services/orderapi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";

interface PaymentData {
  totalPrice: number;
}

export default function Payment() {
  const { onStepChange, handleOrderStateForm, order } = useCheckOut();
  const [paymentMethod, setPaymentMethod] = useState(() => order.paymentMethod);
  const [searchParams] = useSearchParams();
  const validationParams = searchParams.get("data");

  const { mutate: makeOrder, isLoading: isOrdering } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order Placed Successfully");
      onStepChange(3);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { mutate: callEsewa, isLoading: isPaying } = useMutation({
    mutationFn: (data: PaymentData) => handelPayment_Esewa(data),

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });


  useEffect(() => {
    async function validationCheck() {
      if (validationParams !== null) {
        const response = await fetch(
          `${URL}orders/payment/success?data=${validationParams}`
        );
        const resondData = await response.json();
        console.log(resondData);
        makeOrder(order);
      }
    }
    validationCheck();
  }, [validationParams, order, makeOrder]);

  const handelOrder = async function () {
    if (paymentMethod === "esewa") {
      callEsewa({ totalPrice: order.totalPrice });
    } else {
      makeOrder(order);
    }
  };

  const handlePaymentMethod = function (method: "esewa" | "cashOnDelivery") {
    setPaymentMethod(method);
    handleOrderStateForm({ paymentMethod: method });
  };

  return (
    <>
      <div className={"flex justify-center gap-3"}>
        <div
          className={`p-2 flex flex-col items-center justify-center hover:bg-gray-50 ${
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
            <h1 className="font-bold text-gray-600">eSewa Mobile Wallet</h1>
          </div>
        </div>
        <div
          className={`p-2 flex flex-col items-center justify-center hover:bg-gray-50 ${
            paymentMethod === "cashOnDelivery" && "shadow-lg bg-gray-100 "
          }`}
          onClick={() => handlePaymentMethod("cashOnDelivery")}
        >
          <img
            src="https://laz-img-cdn.alicdn.com/tfs/TB1utb_r8jTBKNjSZFwXXcG4XXa-80-80.png"
            alt="cash on delivery"
            className="w-20"
          />
          <div>
            <h1 className="font-bold text-gray-600">Cash On Delivery</h1>
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
                number.
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
            disabled={isOrdering || isPaying}
          >
            {isOrdering || isPaying ? (
              <span className="loader loaderWhite w-5 h-5"></span>
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
