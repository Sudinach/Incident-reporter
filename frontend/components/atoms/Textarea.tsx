import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      {...props}
      className={`block w-full rounded-md border-0 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:bg-slate-50 disabled:text-slate-500 aria-invalid:ring-red-500 aria-invalid:focus:ring-red-500 ${className}`}
    />
  ),
);
Textarea.displayName = "Textarea";
