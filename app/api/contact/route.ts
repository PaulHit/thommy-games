import { NextRequest, NextResponse } from "next/server";

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
    const recipient = process.env.CONTACT_EMAIL || "contact@thommygames.ro";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || recipient;

    const subject = isBooking
      ? `Rezervare nouă: ${packageName} — ${contactName || name}`
      : `Mesaj nou de la ${name || contactName}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #966D49; font-family: Georgia, serif;">
          ${isBooking ? "Rezervare nouă" : "Mesaj nou de pe site"}
        </h1>

        <div style="background: #F8F2E4; padding: 20px; border-radius: 12px; margin: 20px 0;">
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

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Thommy Games",
          email: senderEmail,
        },
        to: [{ email: recipient }],
        replyTo: { email },
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Brevo API error:", response.status, errorBody);
      throw new Error(`Brevo API error: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
