export function sendEmail(payload: {
  subject: string;
  html: string;
  to: string;
  replyTo?: string;
}) {
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.CONTACT_EMAIL!;

  return fetch("https://api.brevo.com/v3/smtp/email", {
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
      to: [{ email: payload.to }],
      replyTo: payload.replyTo ? { email: payload.replyTo } : undefined,
      subject: payload.subject,
      htmlContent: payload.html,
    }),
  });
}
