// // // import OpenAI from "openai";

// // // export const generateContent = async (req, res) => {
// // //   try {
// // //     const { prompt } = req.body;

// // //     if (!prompt || typeof prompt !== "string") {
// // //       return res.status(400).json({
// // //         error: "Prompt is required and must be a string"
// // //       });
// // //     }

// // //     // ✅ Create client AFTER env is loaded
// // //     const openai = new OpenAI({
// // //       apiKey: process.env.OPENAI_API_KEY
// // //     });

// // //     const response = await openai.chat.completions.create({
// // //       model: "gpt-4o-mini",
// // //       messages: [
// // //         {
// // //           role: "system",
// // //           content: `
// // // You are an expert Instagram content strategist for businesses.
// // // Always prioritize brand value, conversions, and clarity.
// // // Never write casual or personal influencer-style captions unless asked.
// // // `
// // //     },
// // //         {
// // //           role: "user",
// // //           content: prompt // ✅ string only
// // //         }
// // //       ],
// // //       temperature: 0.8
// // //     });

// // //     const content = response.choices?.[0]?.message?.content;

// // //     if (!content) {
// // //       throw new Error("Empty response from OpenAI");
// // //     }

// // //     res.json({ content });
// // //   } catch (error) {
// // //     console.error("❌ AI Error:", error);

// // //     res.status(500).json({
// // //       error: "Failed to generate content"
// // //     });
// // //   }
// // // };

// // import OpenAI from "openai";

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY
// // });

// // export const generatePost = async (req, res) => {
// //   try {
// //     const { prompt } = req.body;

// //     // 1️⃣ Generate caption + hashtags
// //     const textResponse = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: [
// //         {
// //           role: "system",
// //           content: `
// // You are an expert Instagram content strategist for businesses.
// // Always prioritize brand value and clarity.
// // `
// //         },
// //         {
// //           role: "user",
// //           content: prompt
// //         }
// //       ],
// //     });

// //     const content = textResponse.choices[0].message.content;

// //     // 2️⃣ Generate IMAGE
// //     const imageResponse = await openai.images.generate({
// //       model: "gpt-image-1",
// //       prompt: prompt,
// //       size: "1024x1024"
// //     });

// //     const imageUrl = imageResponse.data[0].url;

// //     res.json({
// //       content,
// //       imageUrl // ✅ THIS is what you were missing
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "AI generation failed" });
// //   }
// // };

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generatePost = async (req, res) => {
//   try {
//     const { prompt, generateImage = false } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     /* -------------------- 1️⃣ TEXT GENERATION -------------------- */
//     const textResponse = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: `
// You are an expert Instagram content strategist for businesses.
// Always prioritize brand value, conversions, and clarity.
// Never write influencer-style captions unless explicitly asked.
// Always include relevant hashtags.
//           `,
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const content = textResponse.choices[0].message.content;

//     /* -------------------- 2️⃣ OPTIONAL IMAGE -------------------- */
//     let imageUrl = "";

//     if (generateImage === true) {
//       console.log("🖼️ Generating AI image...");

//       const imagePrompt = `
// High-quality professional product photography for Instagram.
// Context: ${prompt}
// Style: clean, premium, studio lighting, minimal background,
// Instagram-ready, realistic, sharp focus.
// `;

//       const imageResponse = await openai.images.generate({
//         model: "gpt-image-1",
//         prompt: imagePrompt,
//         size: "1024x1024",
//       });

//       imageUrl = imageResponse.data[0].url;
//     }

//     /* -------------------- 3️⃣ RESPONSE -------------------- */
//     res.json({
//       content,
//       imageUrl, // empty string if not generated
//     });

//   } catch (err) {
//     console.error("❌ AI generation error:", err);
//     res.status(500).json({ error: "AI generation failed" });
//   }
// };








import OpenAI from "openai";

/**
 * Generate Instagram caption + optional AI image
 */
export const generatePost = async (req, res) => {
  try {
    /* -------------------- ENV SAFETY CHECK -------------------- */
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not found");
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    /* -------------------- CREATE CLIENT (IMPORTANT) -------------------- */
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt } = req.body;

    // normalize generateImage
    const generateImage =
      req.body.generateImage === true || req.body.generateImage === "true";

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("🧠 Generating AI content...");
    console.log("🖼️ Generate image:", generateImage, typeof generateImage);

    /* -------------------- 1️⃣ TEXT GENERATION -------------------- */
    const textResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert Instagram content strategist for businesses.
Always prioritize brand value, conversions, and clarity.
Never write influencer-style captions unless explicitly asked.
Always include relevant hashtags.
Return clean, well-structured output.
          `.trim(),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = textResponse?.choices?.[0]?.message?.content || "";

    /* -------------------- 2️⃣ OPTIONAL IMAGE GENERATION -------------------- */
    let imageUrl = "";

    if (generateImage === true) {
      console.log("🎨 Generating AI image...");

      const imagePrompt = `
Professional Instagram-ready product photography.
Business context: ${prompt}
Style: premium, clean, studio lighting, minimal background,
high contrast, realistic, sharp focus.
`.trim();

      const imageResponse = await openai.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        size: "1024x1024",
      });

      imageUrl = imageResponse?.data?.[0]?.url || "";

      console.log("✅ Image generated");
    }

    /* -------------------- 3️⃣ RESPONSE -------------------- */
    return res.json({
      content,
      imageUrl, // empty string if not generated
    });
  } catch (err) {
    console.error("❌ AI generation error:", err.message || err);
    return res.status(500).json({
      error: "AI generation failed",
      details: err.message,
    });
  }
};
