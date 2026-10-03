import { Resend } from "resend";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body request harus berupa JSON yang valid." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return Response.json({ error: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return Response.json({ error: "Format email tidak valid." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Layanan email belum dikonfigurasi." }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Adin Prasetya <onboarding@resend.dev>",
      to: "adinprasetya1999@gmail.com",
      replyTo: trimmedEmail,
      subject: `Pesan dari Portfolio Adin Prasetya - ${trimmedName}`,
      text: `Nama: ${trimmedName}\nEmail: ${trimmedEmail}\nPesan:\n${trimmedMessage}`,
    });

    if (error) {
      return Response.json({ error: "Pesan gagal dikirim. Silakan coba lagi nanti." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti." }, { status: 500 });
  }
}