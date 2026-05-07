import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gold-dark">{label}</label>
      <input
        className="border border-text-light/40 rounded-lg px-4 py-2.5 text-text bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
