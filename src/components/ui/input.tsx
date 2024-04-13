import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string|undefined;
  labelName?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelName, id, error, ...props }, ref) => {
    return (
      <div>
        {id && (
          <label
            htmlFor={id}
            className="text-gray-800 tablet:text-lg text-base"
          >
            {labelName || props.placeholder}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
