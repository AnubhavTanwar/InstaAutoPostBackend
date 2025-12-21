// // import fs from "fs";
// // import path from "path";
// // import { publishToInstagram } from "../services/instagram.service.js";
// // import {
// //   fetchFollowerActivity,
// //   calculateBestHour,
// //   buildBestPostTime,
// // } from "../utils/instagramInsights.js";

// // const DATA_DIR = path.resolve("src/data");
// // const DATA_PATH = path.join(DATA_DIR, "posts.json");

// // /**
// //  * Ensure data directory & file exist
// //  */
// // const ensureStorage = () => {
// //   if (!fs.existsSync(DATA_DIR)) {
// //     fs.mkdirSync(DATA_DIR, { recursive: true });
// //   }

// //   if (!fs.existsSync(DATA_PATH)) {
// //     fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
// //   }
// // };

// // /**
// //  * GET all posts
// //  */
// // export const getPosts = (req, res) => {
// //   try {
// //     ensureStorage();
// //     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
// //     res.json(posts);
// //   } catch (err) {
// //     console.error("❌ Get posts error:", err);
// //     res.status(500).json({ error: "Failed to read posts" });
// //   }
// // };

// // /**
// //  * SAVE scheduled post
// //  */
// // export const savePost = (req, res) => {
// //   try {
// //     ensureStorage();

// //     const { caption, imageUrl, time } = req.body;

// //     if (!caption || !imageUrl || !time) {
// //       return res.status(400).json({ error: "Missing fields" });
// //     }

// //     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

// //     posts.push({
// //       id: Date.now(),
// //       caption,
// //       imageUrl,
// //       time,
// //       published: false,
// //       createdAt: new Date().toISOString()
// //     });

// //     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("❌ Save post error:", err);
// //     res.status(500).json({ error: "Failed to save post" });
// //   }
// // };

// // /**
// //  * Publish immediately
// //  */
// // export const publishNow = async (req, res) => {
// //   try {
// //     const { caption, imageUrl } = req.body;

// //     if (!caption || !imageUrl) {
// //       return res.status(400).json({ error: "Missing fields" });
// //     }

// //     await publishToInstagram(caption, imageUrl);

// //     res.json({ success: true });
// //   } catch (err) {
// //     console.error("❌ Publish error:", err.response?.data || err.message);
// //     res.status(500).json({
// //       error: "Failed to publish",
// //       details: err.response?.data || err.message
// //     });
// //   }
// // };





// // /**
// //  * GET best time to post using Instagram Insights
// //  */
// // export const getBestTimeToPost = async (req, res) => {
// //   try {
// //     const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
// //     const instagramId = process.env.INSTAGRAM_BUSINESS_ID;

// //     if (!accessToken || !instagramId) {
// //       return res.status(400).json({
// //         error: "Instagram credentials missing",
// //       });
// //     }

// //     const activity = await fetchFollowerActivity(
// //       instagramId,
// //       accessToken
// //     );

// //     const hourlyData = activity[0].value;

// //     const bestHour = calculateBestHour(hourlyData);
// //     const bestTime = buildBestPostTime(bestHour);

// //     return res.json({
// //       bestTime,
// //       source: "instagram_insights",
// //     });
// //   } catch (err) {
// //     console.error("❌ Best time error:", err.message);
// //     return res.status(500).json({
// //       error: "Failed to calculate best time",
// //     });
// //   }
// // };





















// import fs from "fs";
// import path from "path";
// import { publishToInstagram } from "../services/instagram.service.js";
// import {
//   fetchFollowerActivity,
//   calculateBestHour,
//   buildBestPostTime,
// } from "../utils/instagramInsights.js";


// const DATA_DIR = path.resolve("src/data");
// const DATA_PATH = path.join(DATA_DIR, "posts.json");

// /* ---------------- STORAGE ---------------- */

// const ensureStorage = () => {
//   if (!fs.existsSync(DATA_DIR)) {
//     fs.mkdirSync(DATA_DIR, { recursive: true });
//   }

//   if (!fs.existsSync(DATA_PATH)) {
//     fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
//   }
// };

// /* ---------------- POSTS ---------------- */

// export const getPosts = (req, res) => {
//   try {
//     ensureStorage();
//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
//     res.json(posts);
//   } catch (err) {
//     console.error("❌ Get posts error:", err);
//     res.status(500).json({ error: "Failed to read posts" });
//   }
// };

// export const savePost = (req, res) => {
//   try {
//     ensureStorage();

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const { caption, time } = req.body;

//     if (!caption || !req.file || !time) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const imageUrl = `/uploads/${req.file.filename}`;

//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

//     const newPost = {
//       id: Date.now(),
//       caption,
//       imageUrl,
//       time,
//       status: "scheduled",
//       createdAt: new Date().toISOString(),
//     };

//     posts.push(newPost);

//     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

//     res.json({ success: true, post: newPost });
//   } catch (err) {
//     console.error("❌ Save post error:", err);
//     res.status(500).json({ error: "Failed to save post" });
//   }
// };


// export const publishNow = async (req, res) => {
//   try {
//     const { caption, imageUrl } = req.body;

//     if (!caption || !imageUrl) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     await publishToInstagram(caption, imageUrl);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ Publish error:", err.message);
//     res.status(500).json({
//       error: "Failed to publish",
//       details: err.message,
//     });
//   }
// };

// /* ---------------- BEST TIME TO POST ---------------- */

// export const getBestTimeToPost = async (req, res) => {
//   try {
//     const accessToken = process.env.INSTAGRAM_TOKEN;
//     const instagramId = process.env.INSTAGRAM_ACCOUNT_ID;

//     if (!accessToken || !instagramId) {
//       return res.status(400).json({
//         error: "Instagram credentials missing",
//       });
//     }

//     /* 1️⃣ Fetch profile to check followers */
//     const profileRes = await fetch(
//       `https://graph.facebook.com/v19.0/${instagramId}?fields=followers_count&access_token=${accessToken}`
//     );

//     const profile = await profileRes.json();

//     const followers = profile.followers_count || 0;

//     /* 2️⃣ FALLBACK if Insights not allowed */
//     if (followers < 100) {
//       const fallbackTime = new Date();
//       fallbackTime.setHours(19, 0, 0, 0); // 7 PM local

//       if (fallbackTime <= new Date()) {
//         fallbackTime.setDate(fallbackTime.getDate() + 1);
//       }

//       return res.json({
//         bestTime: fallbackTime.toISOString(),
//         source: "fallback",
//         reason: "Not enough followers for Instagram Insights",
//         followers,
//       });
//     }

//     /* 3️⃣ INSIGHTS LOGIC (future-proof) */
//     const activity = await fetchFollowerActivity(
//       instagramId,
//       accessToken
//     );

//     const hourlyData = activity[0].value;
//     const bestHour = calculateBestHour(hourlyData);
//     const bestTime = buildBestPostTime(bestHour);

//     return res.json({
//       bestTime,
//       source: "instagram_insights",
//       followers,
//     });
//   } catch (err) {
//     console.error("❌ Best time error:", err.message);
//     return res.status(500).json({
//       error: "Failed to calculate best time",
//     });
//   }
// };






















// import fs from "fs";
// import path from "path";
// import { publishToInstagram } from "../services/instagram.service.js";

// const DATA_DIR = path.resolve("src/data");
// const DATA_PATH = path.join(DATA_DIR, "posts.json");
// const UPLOADS_DIR = "uploads";

// // Ensure storage folder and JSON file exists
// const ensureStorage = () => {
//   if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
//   if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
// };

// /* ---------------- POSTS ---------------- */

// // Get all posts
// export const getPosts = (req, res) => {
//   try {
//     ensureStorage();
//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
//     res.json(posts);
//   } catch (err) {
//     console.error("❌ Get posts error:", err);
//     res.status(500).json({ error: "Failed to read posts" });
//   }
// };

// // Save / schedule a post
// export const savePost = (req, res) => {
//   try {
//     ensureStorage();
//     const { caption, time } = req.body;

//     if (!caption || !req.file || !time) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

//     const newPost = {
//       id: Date.now(),
//       caption,
//       imagePath: `${UPLOADS_DIR}/${req.file.filename}`, // relative path
//       time,
//       status: "scheduled",
//       createdAt: new Date().toISOString(),
//     };

//     posts.push(newPost);
//     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

//     res.json({ success: true, post: newPost });
//   } catch (err) {
//     console.error("❌ Save post error:", err);
//     res.status(500).json({ error: "Failed to save post" });
//   }
// };

// // Publish a single post now
// export const publishNow = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const file = req.file;

//     if (!caption || !file) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const publicUrl = `${process.env.PUBLIC_URL}/uploads/${file.filename}`; // must be publicly accessible

//     const instagramId = await publishToInstagram(caption, publicUrl);

//     res.json({ success: true, instagramId });
//   } catch (err) {
//     console.error("❌ Publish error:", err.message);
//     res.status(500).json({ error: "Failed to publish", details: err.message });
//   }
// };

// // Publish all scheduled posts whose time <= now
// export const publishScheduledPosts = async (req, res) => {
//   try {
//     ensureStorage();
//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
//     const now = new Date();

//     const toPublish = posts.filter(p => p.status === "scheduled" && new Date(p.time) <= now);
//     const results = [];

//     for (const post of toPublish) {
//       const publicUrl = `${process.env.PUBLIC_URL}/${post.imagePath}`;
//       try {
//         const instagramId = await publishToInstagram(post.caption, publicUrl);
//         post.status = "published";
//         post.instagramId = instagramId;
//         results.push({ id: post.id, success: true, instagramId });
//       } catch (err) {
//         results.push({ id: post.id, success: false, error: err.message });
//       }
//     }

//     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
//     res.json({ success: true, results });
//   } catch (err) {
//     console.error("❌ Publish scheduled error:", err);
//     res.status(500).json({ error: "Failed to publish scheduled posts" });
//   }
// };



















// import fs from "fs";
// import path from "path";
// import { publishToInstagram } from "../services/instagram.service.js";

// const DATA_DIR = path.resolve("src/data");
// const DATA_PATH = path.join(DATA_DIR, "posts.json");
// const UPLOADS_DIR = "uploads";

// /* ---------------- HELPERS ---------------- */

// const ensureStorage = () => {
//   if (!fs.existsSync(DATA_DIR)) {
//     fs.mkdirSync(DATA_DIR, { recursive: true });
//   }

//   if (!fs.existsSync(DATA_PATH)) {
//     fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
//   }
// };

// /* ---------------- POSTS ---------------- */

// // Get all posts
// export const getPosts = (req, res) => {
//   try {
//     ensureStorage();
//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
//     res.json(posts);
//   } catch (err) {
//     console.error("❌ Get posts error:", err);
//     res.status(500).json({ error: "Failed to read posts" });
//   }
// };

// // Save / schedule post
// export const savePost = (req, res) => {
//   try {
//     ensureStorage();

//     const { caption, time } = req.body;

//     if (!caption || !req.file || !time) {
//       return res.status(400).json({ error: "Caption, image and time are required" });
//     }

//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

//     const newPost = {
//       id: Date.now(),
//       caption,
//       imagePath: `${UPLOADS_DIR}/${req.file.filename}`,
//       time,
//       status: "scheduled",
//       createdAt: new Date().toISOString(),
//     };

//     posts.push(newPost);
//     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

//     res.json({ success: true, post: newPost });
//   } catch (err) {
//     console.error("❌ Save post error:", err);
//     res.status(500).json({ error: "Failed to save post" });
//   }
// };

// // Publish immediately
// export const publishNow = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const file = req.file;

//     if (!caption || !file) {
//       return res.status(400).json({ error: "Caption and image required" });
//     }

//     const publicUrl = `${process.env.PUBLIC_URL}/uploads/${file.filename}`;

//     const instagramId = await publishToInstagram(caption, publicUrl);

//     res.json({ success: true, instagramId });
//   } catch (err) {
//     console.error("❌ Publish error:", err.message);
//     res.status(500).json({ error: "Failed to publish", details: err.message });
//   }
// };

// // Publish scheduled posts
// export const publishScheduledPosts = async (req, res) => {
//   try {
//     ensureStorage();

//     const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
//     const now = new Date();

//     const results = [];

//     for (const post of posts) {
//       if (post.status === "scheduled" && new Date(post.time) <= now) {
//         const publicUrl = `${process.env.PUBLIC_URL}/${post.imagePath}`;

//         try {
//           const instagramId = await publishToInstagram(post.caption, publicUrl);
//           post.status = "published";
//           post.instagramId = instagramId;
//           post.publishedAt = new Date().toISOString();

//           results.push({ id: post.id, success: true });
//         } catch (err) {
//           results.push({ id: post.id, success: false, error: err.message });
//         }
//       }
//     }

//     fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
//     res.json({ success: true, results });
//   } catch (err) {
//     console.error("❌ Publish scheduled error:", err);
//     res.status(500).json({ error: "Failed to publish scheduled posts" });
//   }
// };

// /* ---------------- AUTO BEST TIME ---------------- */

// // SIMPLE & SAFE (fallback logic)
// export const getBestTimeToPost = async (req, res) => {
//   try {
//     const now = new Date();
//     const best = new Date(now);

//     best.setDate(best.getDate() + 1);
//     best.setHours(19, 0, 0, 0); // 7 PM tomorrow

//     res.json({
//       bestTime: best.toISOString(),
//       source: "fallback"
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to calculate best time" });
//   }
// };




















import fs from "fs";
import path from "path";
import { publishToInstagram } from "../services/instagram.service.js";

const DATA_DIR = path.resolve("src/data");
const DATA_PATH = path.join(DATA_DIR, "posts.json");
const UPLOADS_DIR = "uploads";

/* ---------------- HELPERS ---------------- */

const ensureStorage = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
};

/* ---------------- POSTS ---------------- */

export const getPosts = (req, res) => {
  try {
    ensureStorage();
    const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to read posts" });
  }
};

export const savePost = (req, res) => {
  try {
    ensureStorage();

    const { caption, time } = req.body;

    if (!caption || !req.file || !time) {
      return res.status(400).json({ error: "Caption, image and time are required" });
    }

    const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

    const newPost = {
      id: Date.now(),
      caption,
      imagePath: `${UPLOADS_DIR}/${req.file.filename}`,
      time: new Date(time).toISOString(),
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

    res.json({ success: true, post: newPost });
  } catch {
    res.status(500).json({ error: "Failed to save post" });
  }
};

// 🔥 Manual publish (instant)
export const publishNow = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!caption || !file) {
      return res.status(400).json({ error: "Caption and image required" });
    }

    const imageUrl = `${process.env.PUBLIC_URL}/uploads/${file.filename}`;
    const instagramId = await publishToInstagram(caption, imageUrl);

    res.json({ success: true, instagramId });
  } catch (err) {
    res.status(500).json({ error: "Publish failed", details: err.message });
  }
};

// 🔁 Manual trigger scheduled posts
export const publishScheduledPosts = async (req, res) => {
  try {
    ensureStorage();

    const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    const now = new Date();
    const results = [];

    for (const post of posts) {
      if (post.status === "scheduled" && new Date(post.time) <= now) {
        const imageUrl = `${process.env.PUBLIC_URL}/${post.imagePath}`;

        try {
          await publishToInstagram(post.caption, imageUrl);
          post.status = "published";
          post.publishedAt = new Date().toISOString();
          results.push({ id: post.id, success: true });
        } catch (err) {
          post.status = "failed";
          post.error = err.message;
          results.push({ id: post.id, success: false });
        }
      }
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
    res.json({ success: true, results });
  } catch {
    res.status(500).json({ error: "Failed to publish scheduled posts" });
  }
};

export const getBestTimeToPost = async (_, res) => {
  const best = new Date();
  best.setDate(best.getDate() + 1);
  best.setHours(19, 0, 0, 0);

  res.json({ bestTime: best.toISOString(), source: "fallback" });
};
