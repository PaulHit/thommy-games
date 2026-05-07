import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function Select({
  label,
  options,
  error,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gold-dark">{label}</label>
      <select
        className="border border-text-light/40 rounded-lg px-4 py-2.5 text-text bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
        {...props}
      >
        <option value="">Selectează...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
