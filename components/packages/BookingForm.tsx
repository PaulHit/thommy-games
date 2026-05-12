"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

const bookingSchema = z.object({
  contactName: z.string().min(1, "Numele este obligatoriu"),
  email: z.string().email("Adresă de email invalidă"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s]+$/.test(val),
      "Număr de telefon invalid — folosește doar cifre, spații și +"
    ),
  eventType: z.string().min(1, "Selectează tipul evenimentului"),
  eventDate: z
    .string()
    .min(1, "Data este obligatorie")
    .refine(
      (val) => new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)),
      "Data nu poate fi în trecut"
    ),
  location: z.string().min(1, "Locația este obligatorie"),
  guestCount: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const eventTypes = [
  { value: "nunta", label: "Nuntă" },
  { value: "corporate", label: "Eveniment Corporate" },
  { value: "petrecere", label: "Petrecere Privată" },
  { value: "botez", label: "Botez" },
  { value: "festival", label: "Festival" },
  { value: "aniversare", label: "Aniversare" },
  { value: "altul", label: "Altul" },
];

interface GameData {
  _id: string;
  name: string;
  level: "1" | "2";
}

interface BookingFormProps {
  packageName: string;
  level1Count: number;
  level2Count: number;
  games: GameData[];
}

export default function BookingForm({
  packageName,
  level1Count,
  level2Count,
  games,
}: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const level1Games = games.filter((g) => g.level === "1");
  const level2Games = games.filter((g) => g.level === "2");
  const selectedLevel1 = selectedGames.filter((id) =>
    level1Games.some((g) => g._id === id)
  );
  const selectedLevel2 = selectedGames.filter((id) =>
    level2Games.some((g) => g._id === id)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const toggleGame = (gameId: string, level: "1" | "2") => {
    setSelectedGames((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      }
      const currentLevel = level === "1" ? selectedLevel1 : selectedLevel2;
      const maxCount = level === "1" ? level1Count : level2Count;
      if (currentLevel.length >= maxCount) return prev;
      return [...prev, gameId];
    });
  };

  const onSubmit = async (data: BookingFormData) => {
    setStatus("sending");
    try {
      const selectedGameNames = selectedGames
        .map((id) => games.find((g) => g._id === id)?.name)
        .filter(Boolean);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          packageName,
          selectedGames: selectedGameNames,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
      setSelectedGames([]);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-3xl mb-4">✅</p>
        <h3 className="font-serif text-xl text-green-800 mb-2">
          Cererea a fost trimisă!
        </h3>
        <p className="text-green-700 text-sm">
          Îți vom răspunde în maxim 24 de ore. Mulțumim!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-text-light/20 p-6 md:p-8 space-y-5"
    >
      <h3 className="font-serif text-xl text-gold-dark mb-2">
        Rezervă {packageName}
      </h3>
      <p className="text-sm text-text-light -mt-3 mb-4">
        Completează formularul și îți trimitem oferta personalizată.
      </p>

      <Input
        label="Nume contact *"
        {...register("contactName")}
        error={errors.contactName?.message}
      />
      <Input
        label="Email *"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Telefon"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <Select
        label="Tip eveniment *"
        options={eventTypes}
        {...register("eventType")}
        error={errors.eventType?.message}
      />
      <Input
        label="Data evenimentului *"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        {...register("eventDate")}
        error={errors.eventDate?.message}
      />
      <Input
        label="Locație / Venue *"
        placeholder="Oraș, locație"
        {...register("location")}
        error={errors.location?.message}
      />
      <Input
        label="Număr estimat invitați"
        type="number"
        {...register("guestCount")}
      />
      <Textarea
        label="Mesaj / Cerințe speciale"
        placeholder="Detalii suplimentare despre eveniment..."
        {...register("message")}
      />

      {/* Game selection */}
      {level1Games.length > 0 && (
        <div className="border border-text-light/20 rounded-xl p-4">
          <h4 className="font-medium text-gold-dark text-sm mb-1">
            Jocuri Nivel 1
          </h4>
          <p className="text-xs text-text-light mb-3">
            Selectează {level1Count} {level1Count === 1 ? "joc" : "jocuri"} ({selectedLevel1.length}/{level1Count})
          </p>
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {level1Games.map((game) => {
              const isChecked = selectedGames.includes(game._id);
              const isDisabled = !isChecked && selectedLevel1.length >= level1Count;
              return (
                <label
                  key={game._id}
                  className={`flex items-center gap-2 cursor-pointer text-sm py-1 px-2 rounded-md transition-colors ${
                    isChecked
                      ? "bg-gold/10 text-gold-dark"
                      : isDisabled
                      ? "text-text/30 cursor-not-allowed"
                      : "text-text/70 hover:bg-cream"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleGame(game._id, "1")}
                    className="rounded border-text-light/40 accent-gold"
                  />
                  {game.name}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {level2Games.length > 0 && (
        <div className="border border-text-light/20 rounded-xl p-4">
          <h4 className="font-medium text-gold-dark text-sm mb-1">
            Jocuri Nivel 2
          </h4>
          <p className="text-xs text-text-light mb-3">
            Selectează {level2Count} {level2Count === 1 ? "joc" : "jocuri"} ({selectedLevel2.length}/{level2Count})
          </p>
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {level2Games.map((game) => {
              const isChecked = selectedGames.includes(game._id);
              const isDisabled = !isChecked && selectedLevel2.length >= level2Count;
              return (
                <label
                  key={game._id}
                  className={`flex items-center gap-2 cursor-pointer text-sm py-1 px-2 rounded-md transition-colors ${
                    isChecked
                      ? "bg-gold/10 text-gold-dark"
                      : isDisabled
                      ? "text-text/30 cursor-not-allowed"
                      : "text-text/70 hover:bg-cream"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleGame(game._id, "2")}
                    className="rounded border-text-light/40 accent-gold"
                  />
                  {game.name}
                </label>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-xs text-text/40 text-center">
        {selectedGames.length > 0
          ? `Ai selectat ${selectedGames.length} joc${selectedGames.length === 1 ? "" : "uri"}. Poți trimite cererea.`
          : "Selectează jocurile dorite mai jos."}
      </p>

      {status === "error" && (
        <p className="text-red-500 text-sm">
          A apărut o eroare. Te rugăm să încerci din nou.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-white py-3 rounded-full font-medium hover:bg-gold-dark hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "sending" ? "Se trimite..." : "Trimite cererea"}
      </button>

      <p className="text-xs text-text/50 text-center">
        Prin trimiterea formularului ești de acord cu termenii și condițiile.
        Datele tale sunt în siguranță.
      </p>
    </form>
  );
}
