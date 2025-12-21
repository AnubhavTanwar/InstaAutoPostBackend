import axios from "axios";

export const generateFromAI = async (niche, tone) => {
  const prompt = `
Create an Instagram caption and hashtags for:
Niche: ${niche}
Tone: ${tone}
`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return {
    content: response.data.choices[0].message.content
  };
};
