import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export default function Textarea({ label, error, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gold-dark">{label}</label>
      <textarea
        className="border border-text-light/40 rounded-lg px-4 py-2.5 text-text bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none"
        rows={4}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
