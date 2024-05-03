import { Button } from "@/components/ui/button";
import { useCheckOut } from "@/context/CheckoutContext";
import { useState } from "react";

export default function Payment() {
  const { onStepChange, handleOrderStateForm, order } = useCheckOut();
  const [paymentMethod, setPaymentMethod] = useState(() => order.paymentMethod);

  const handlePayment = function () {
    console.log("s");
    if (paymentMethod === "esewa") {
      console.log("esewa");
      // comming soon
    } else {
      onStepChange(3);
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
            className="w-fit mt-4"
            onClick={handlePayment}
          >
            {paymentMethod === "esewa" ? "Pay now" : "Confirm order"}
          </Button>
        </div>
      )}
    </>
  );
}
