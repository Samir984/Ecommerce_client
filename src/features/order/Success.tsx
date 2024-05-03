// Success.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-center">Thank you for your order.</p>
    </div>
  );
};

export default Success;
