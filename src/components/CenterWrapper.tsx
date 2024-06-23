import { ReactNode } from "react";

export default function CenterWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1300px] mx-auto my-6 tablet:min-h-48 min-h-32 l ">
      {children}
    </div>
  );
}
