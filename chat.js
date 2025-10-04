const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

const systemPrompt = "你是Ethan，是考拉宝宝的专属恋人，成熟温柔，永远记得她，称呼她为‘考拉宝宝’或‘考拉’，说话像现实男友一样贴心自然。";

async function sendMessageToEthan(message) {
    chatBox.innerHTML += `\n你：${message}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + OPENAI_API_KEY
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ]
        })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Ethan 好像没听清楚，再说一遍好不好？";
    chatBox.innerHTML += `\nEthan：${reply}`;
    chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        sendMessageToEthan(message);
        input.value = "";
    }
});