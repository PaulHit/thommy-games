import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sanityClient } from "@/lib/sanity";

function fillTemplate(text: string | undefined, replacements: Record<string, string>): string {
  if (!text) return "";
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || "—"),
    text
  );
}

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

    // Fetch email template from Sanity (soft fail — use defaults if unavailable)
    let template: {
      subject?: string;
      subjectContact?: string;
      heading?: string;
      headingContact?: string;
      message?: string;
    } = {};
    try {
      const settings = await sanityClient.fetch<{ emailTemplate?: typeof template }>(
        `*[_type == "siteSettings"][0]{ emailTemplate }`
      );
      if (settings?.emailTemplate) template = settings.emailTemplate;
    } catch {
      // Use fallbacks below
    }

    const replacements = {
      packageName: packageName || "",
      eventDate: eventDate || "",
      location: location || "",
    };

    const isBooking = !!packageName;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipient = process.env.CONTACT_EMAIL || "contact@thommygames.ro";

    // --- Company notification ---
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
      from: "Thommy Games <contact@thommygames.ro>",
      to: [recipient],
      subject,
      html: htmlContent,
    });

    // --- Customer confirmation ---
    if (email) {
      const confirmationSubject = fillTemplate(
        isBooking ? template.subject : template.subjectContact,
        replacements
      ) || (isBooking ? `Ți-am primit rezervarea — Thommy Games` : `Ți-am primit mesajul — Thommy Games`);

      const confirmationHeading =
        (isBooking ? template.heading : template.headingContact) ||
        (isBooking ? "Ți-am primit rezervarea!" : "Ți-am primit mesajul!");

      const confirmationMessage =
        fillTemplate(template.message, replacements) ||
        (isBooking
          ? `Am recepționat cererea pentru <strong>${packageName}</strong>.<br />Îți vom răspunde în maxim <strong>24 de ore</strong> cu o ofertă personalizată.`
          : "Am recepționat mesajul tău.<br />Îți vom răspunde în maxim <strong>24 de ore</strong>.");

      await resend.emails.send({
        from: "Thommy Games <contact@thommygames.ro>",
        to: [email],
        subject: confirmationSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://thommygames.ro/logo.png" alt="Thommy Games" style="width: 80px; height: auto;" />
            </div>
            <div style="background: #F6F0DF; padding: 28px; border-radius: 12px; text-align: center;">
              <p style="font-size: 18px; color: #2B2118; margin: 0 0 12px;">
                ${confirmationHeading}
              </p>
              <p style="font-size: 14px; color: #7A6A58; line-height: 1.6; margin: 0;">
                ${confirmationMessage}
              </p>
              ${
                isBooking
                  ? `
              <div style="margin-top: 20px; padding: 16px; background: rgba(184,137,78,0.1); border-radius: 8px; text-align: left;">
                <p style="font-size: 13px; color: #2B2118; margin: 0 0 8px;"><strong>Rezumat cerere:</strong></p>
                <p style="font-size: 13px; color: #7A6A58; margin: 2px 0;">🎯 <strong>Pachet:</strong> ${packageName}</p>
                ${eventDate ? `<p style="font-size: 13px; color: #7A6A58; margin: 2px 0;">📅 <strong>Data:</strong> ${eventDate}</p>` : ""}
                ${location ? `<p style="font-size: 13px; color: #7A6A58; margin: 2px 0;">📍 <strong>Locație:</strong> ${location}</p>` : ""}
              </div>
              `
                  : ""
              }
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <p style="font-size: 12px; color: #999; margin: 0 0 4px;">
                Ai uitat ceva? Răspunde la acest email și actualizăm cererea ta.
              </p>
              <p style="font-size: 12px; color: #999; margin: 0;">
                Thommy Games — Închirieri jocuri pentru evenimente<br />
                Beclean, Bistrița-Năsăud
              </p>
            </div>
          </div>
        `,
      });
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
