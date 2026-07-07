"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import ContactInfo from "@/components/ui/ContactInfo";
import SocialLinks from "@/components/ui/SocialLinks";

const contactSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"),
  email: z.string().email("Adresă de email invalidă"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s]+$/.test(val),
      "Număr de telefon invalid"
    ),
  message: z.string().min(1, "Mesajul este obligatoriu"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="pt-8 pb-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-gold-dark">Contact</h1>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            Ai o întrebare sau vrei să verifici disponibilitatea? Scrie-ne și
            îți răspundem în maxim 24 de ore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <ContactInfo />
            <div className="bg-cream rounded-2xl p-8 border border-text-light/20">
              <h2 className="font-serif text-xl text-gold-dark mb-4">Social media</h2>
              <SocialLinks />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-text-light/20 p-6 md:p-8">
            {status === "success" ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-4">✅</p>
                <h3 className="font-serif text-xl text-green-800 mb-2">Mesaj trimis!</h3>
                <p className="text-green-700 text-sm">Îți vom răspunde în maxim 24 de ore.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <h3 className="font-serif text-xl text-gold-dark mb-2">Trimite-ne un mesaj</h3>
                <Input label="Nume *" {...register("name")} error={errors.name?.message} />
                <Input label="Email *" type="email" {...register("email")} error={errors.email?.message} />
                <Input label="Telefon" type="tel" {...register("phone")} error={errors.phone?.message} />
                <Textarea
                  label="Mesaj *"
                  placeholder="Spune-ne despre evenimentul tău..."
                  {...register("message")}
                  error={errors.message?.message}
                />
                {status === "error" && <p className="text-red-500 text-sm">A apărut o eroare. Încearcă din nou.</p>}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gold text-white py-3 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {status === "sending" ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
