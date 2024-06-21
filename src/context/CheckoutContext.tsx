/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type OrderStateType = {
  shippingAddress: string;
  phoneNumber: string;
  paymentMethod: "esewa" | "cashOnDelivery";
  totalPrice: number;
  orderItems: {
    productName: string;
    quantity: number;
    url: string;
    price: number;
    store_id: string;
    product_id: string;
  }[];
};

type CheakoutContextType = {
  currentStep: number;
  onStepChange: (step: number) => void;
  steps: string[];
  handleOrderStateForm: (data: Partial<OrderStateType>) => void;
  order: OrderStateType;
};

const CheckoutContext = createContext<CheakoutContextType | undefined>(
  undefined
);

const steps = ["Shipping", "Payment", "Success"];

export default function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const [storeStep, setStoreStep] = useLocalStorage("step", 1);
  const [storeOrder, setStoreOrder] = useLocalStorage<OrderStateType>("order", {
    shippingAddress: "",
    phoneNumber: "",
    paymentMethod: "cashOnDelivery",
    totalPrice: totalPrice,
    orderItems: items.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      url: item.url,
      price: item.price,
      store_id: item.store_id,
      product_id: item.product_id,
    })),
  });

  const [currentStep, setCurrentStep] = useState(storeStep);
  const [order, setOrder] = useState<OrderStateType>(storeOrder);

  const navigate = useNavigate();

  const handleOrderStateForm = (data: Partial<OrderStateType>) => {
    console.log(data);
    setOrder((prev) => {
      setStoreOrder({ ...prev, ...data });
      return { ...prev, ...data };
    });
  };
  console.log(order);

  const onStepChange = function (step: number) {
    setStoreStep(step);
    setCurrentStep(step);
    navigate(`${steps[step - 1].toLowerCase()}`);
  };

  return (
    <CheckoutContext.Provider
      value={{ currentStep, order, onStepChange, steps, handleOrderStateForm }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckOut = function () {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckOut must be used within an CheckoutProvider");
  }
  return context;
};
