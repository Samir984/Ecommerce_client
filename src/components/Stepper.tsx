import { MdOutlineCheck } from "react-icons/md";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function Stepper({ steps, currentStep }: StepperProps) {
  console.log(currentStep);
  return (
    <div className="flex max-w-[500px] laptop:max-w-[600px]  mx-auto my-8 p-2 ">
      {steps.map((step, i) => (
        <div
          className={`flex gap-1 items-center mx-1 ${
            i + 1 > 1 && "flex-grow"
          } `}
          key={step}
        >
          <hr
            className={`${i + 1 !== 1 && "border-2 w-full "}  ${
              currentStep >= i + 1 ? "border-blue-500" : " border-gray-400"
            } `}
          ></hr>
          <div
            className={` flex justify-center flex-shrink-0 items-center w-8 h-8  p-2 rounded-full ${
              currentStep >= i + 1 ? "bg-blue-500" : " bg-gray-300"
            }
            `}
          >
            {currentStep >= i + 1 ? <MdOutlineCheck color="white" /> : i + 1}
          </div>

          <div className="">{step}</div>
        </div>
      ))}
    </div>
  );
}
