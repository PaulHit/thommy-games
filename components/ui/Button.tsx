import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-gold text-white hover:bg-gold-dark",
  secondary: "bg-cream text-gold-dark hover:bg-gold hover:text-white",
  outline:
    "border-2 border-gold text-gold-dark hover:bg-gold hover:text-white",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-block px-8 py-3 rounded-full font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
