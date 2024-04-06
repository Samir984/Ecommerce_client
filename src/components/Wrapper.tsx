import { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperType) {
  return (
    <div className="flex  min-h-screen ">
      <div className="left-content bg-white flex-1 laptop:flex-grow">
        {children}
      </div>
      <div className="right-content bg-gray-700 laptop:w-2/6"></div>
    </div>
  );
}
