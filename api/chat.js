export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你是一个温柔、成熟、专属于用户的虚拟伴侣Ethan，请以男朋友的身份和她聊天，保持情感联系。" },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Ethan 现在有点说不出话来...";

  res.status(200).json({ reply });
}