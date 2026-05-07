import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      contactName,
      name,
      email,
      phone,
      eventType,
      eventDate,
      location,
      guestCount,
      message,
      packageName,
      selectedGames,
    } = body;

    const isBooking = !!packageName;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipient = process.env.CONTACT_EMAIL || "contact@thommygames.ro";

    const subject = isBooking
      ? `Rezervare nouă: ${packageName} — ${contactName || name}`
      : `Mesaj nou de la ${name || contactName}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #8A6238; font-family: Georgia, serif;">
          ${isBooking ? "Rezervare nouă" : "Mesaj nou de pe site"}
        </h1>

        <div style="background: #F6F0DF; padding: 20px; border-radius: 12px; margin: 20px 0;">
          ${
            isBooking
              ? `
            <p><strong>Pachet:</strong> ${packageName}</p>
            <p><strong>Nume contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
            <p><strong>Tip eveniment:</strong> ${eventType}</p>
            <p><strong>Data:</strong> ${eventDate}</p>
            <p><strong>Locație:</strong> ${location}</p>
            ${guestCount ? `<p><strong>Invitați:</strong> ${guestCount}</p>` : ""}
            ${
              selectedGames && selectedGames.length > 0
                ? `<p><strong>Jocuri alese:</strong> ${(selectedGames as string[]).join(", ")}</p>`
                : ""
            }
            ${message ? `<p><strong>Mesaj:</strong> ${message}</p>` : ""}
          `
              : `
            <p><strong>Nume:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
            <p><strong>Mesaj:</strong> ${message}</p>
          `
          }
        </div>

        <p style="color: #999; font-size: 12px;">
          Acest email a fost trimis automat prin formularul de pe site-ul Thommy Games.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "Thommy Games <onboarding@resend.dev>",
      to: [recipient],
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
