export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // Send via Web3Forms (free tier, works immediately)
    const web3res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY || "demo",
        subject: `New message from ${name} - my-platform`,
        from_name: name,
        email: email,
        message: message,
      }),
    });

    if (!web3res.ok) {
      console.error("Web3Forms error:", await web3res.text());
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
