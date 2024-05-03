import Stepper from "@/components/Stepper";
import { Button } from "@/components/ui/button";
import { useCheckOut } from "@/context/CheckoutContext";
import { Outlet } from "react-router-dom";
// import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

export default function Checkout() {
  const { steps, currentStep, onStepChange } = useCheckOut();
  return (
    <div className="p-2 ">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="min-h-[280px] ">
        <Outlet />
      </div>
      <div className="w-full text-center">
        <Button
          className={`  ${currentStep === 1 && "hidden"}`}
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 1}
        >
          <GoArrowLeft />&nbsp;
          Go Back
        </Button>
      </div>
    </div>
  );
}
