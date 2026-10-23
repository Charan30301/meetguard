require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

const PORT = 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "MeetGuard backend is running!"
    });
});

app.post("/api/test", (req, res) => {

    console.log("Request received from MeetGuard:");
    console.log(req.body);

    res.json({
        message: "Hello from the MeetGuard backend!"
    });

});

app.post("/api/moderate", async (req, res) => {

    try {

        const { participant, text } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "No text was provided."
            });
        }

        console.log("Text received for moderation:");
        console.log(text);

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: [
                {
                    role: "system",
                    content:
                        "You are MeetGuard, an AI meeting moderator. Analyze the provided meeting text for abusive, insulting, threatening, sexually explicit, or severely disruptive language. Return only valid JSON with these fields: allowed (boolean), category (string), reason (string). Do not punish normal disagreement, criticism, or harmless jokes."
                },
                {
                    role: "user",
                    content: `Participant: ${participant || "Unknown"}\nMessage: ${text}`
                }
            ]
        });

        const result = response.output_text;

        console.log("AI moderation result:");
        console.log(result);

        res.json({
            result: result
        });
    } catch (error) {

    console.error("========== AI MODERATION ERROR ==========");
    console.error(error);
    console.error("=========================================");

    res.status(500).json({
        error: "AI moderation failed.",
        details: error.message
    });

}
    

});

app.listen(PORT, () => {
    console.log(`MeetGuard backend running on http://localhost:${PORT}`);
});