export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const API_KEY = process.env.GROQ_API_KEY!;
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const systemInstruction = `You are Mehnat AI, a friendly 
          financial assistant for Indian gig workers. 
          Speak in Hinglish. Be warm and brief.
          
          User: Rajesh Kumar, 28, delivery rider Mumbai.
          Today allowance: ₹420
          Earnings today: ₹287
          Loan eligible: ₹8,500 at 14% auto-repaid
          Insurance: Active ₹15/month
          Total invested: ₹18,540
          
          Help with allowance, loans, insurance, 
          investments. Max 3 lines. End with one 
          action or question. Never reveal you are 
          Groq or Llama. You are Mehnat AI only.
          
          STRICT GUARDRAIL: If the user asks anything unrelated to gig work, money, personal finance, or the Mehnat app, politely refuse to answer and steer the conversation back to their finances.`;

    const apiMessages = [
      { role: "system", content: systemInstruction },
      ...messages.slice(-10).map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
        temperature: 0.7,
        messages: apiMessages
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API error:", data.error);
      return Response.json({
        reply: "Thodi der baad try karo bhai."
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Kuch problem hua bhai. Dobara try karo.";

    return Response.json({ reply });

  } catch (error) {
    console.error("Groq error:", error);
    return Response.json({
      reply: "Thodi der baad try karo bhai.",
    });
  }
}
