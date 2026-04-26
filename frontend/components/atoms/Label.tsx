import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean };

export function Label({ required, className = "", children, ...props }: Props) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-slate-900 ${className}`}
    >
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-0.5 text-red-700">*</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}
