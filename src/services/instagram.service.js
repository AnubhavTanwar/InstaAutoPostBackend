// import axios from "axios";

// export const publishToInstagram = async (caption, imageUrl) => {
//   const createMedia = await axios.post(
//     `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media`,
//     {
//       image_url: imageUrl,
//       caption,
//       access_token: process.env.INSTAGRAM_TOKEN
//     }
//   );

//   await axios.post(
//     `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media_publish`,
//     {
//       creation_id: createMedia.data.id,
//       access_token: process.env.INSTAGRAM_TOKEN
//     }
//   );
// };













// import axios from "axios";

// export const publishToInstagram = async (caption, imageUrl) => {
//   if (!process.env.INSTAGRAM_ACCOUNT_ID) {
//     throw new Error("INSTAGRAM_ACCOUNT_ID is missing");
//   }

//   if (!process.env.INSTAGRAM_TOKEN) {
//     throw new Error("INSTAGRAM_TOKEN is missing");
//   }

//   if (!caption || !imageUrl) {
//     throw new Error("caption and imageUrl are required");
//   }

//   try {
//     // 1️⃣ Create media container
//     const createMediaRes = await axios.post(
//       `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media`,
//       {
//         image_url: imageUrl,
//         caption,
//         access_token: process.env.INSTAGRAM_TOKEN
//       },
//       {
//         timeout: 10000
//       }
//     );

//     const creationId = createMediaRes.data.id;

//     if (!creationId) {
//       throw new Error("Failed to create media container");
//     }

//     // 2️⃣ Publish media
//     const publishRes = await axios.post(
//       `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media_publish`,
//       {
//         creation_id: creationId,
//         access_token: process.env.INSTAGRAM_TOKEN
//       },
//       {
//         timeout: 10000
//       }
//     );

//     console.log("✅ Instagram post published:", publishRes.data);

//     return publishRes.data;
//   } catch (error) {
//     console.error(
//       "❌ Instagram publish error:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };














import axios from "axios";

export const publishToInstagram = async (caption, imageUrl) => {
  if (!process.env.INSTAGRAM_ACCOUNT_ID) throw new Error("INSTAGRAM_ACCOUNT_ID missing");
  if (!process.env.INSTAGRAM_TOKEN) throw new Error("INSTAGRAM_TOKEN missing");
  if (!caption || !imageUrl) throw new Error("caption and imageUrl required");

  try {
    // 1️⃣ Create media container
    const createRes = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media`,
      { image_url: imageUrl, caption, access_token: process.env.INSTAGRAM_TOKEN },
      { timeout: 10000 }
    );

    const creationId = createRes.data.id;
    if (!creationId) throw new Error("Failed to create media container");

    // 2️⃣ Publish media
    const publishRes = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media_publish`,
      { creation_id: creationId, access_token: process.env.INSTAGRAM_TOKEN },
      { timeout: 10000 }
    );

    return publishRes.data; // contains Instagram post ID
  } catch (err) {
    console.error("❌ Instagram publish error:", err.response?.data || err.message);
    throw err;
  }
};
