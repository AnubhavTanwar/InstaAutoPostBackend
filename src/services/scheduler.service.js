import fs from "fs";
import path from "path";
import { DateTime } from "luxon";
import { publishToInstagram } from "./instagram.service.js";

const DATA_PATH = path.resolve("src/data/posts.json");

// Helper function to check and publish posts
const checkAndPublishPosts = async () => {
  try {
    if (!fs.existsSync(DATA_PATH)) return;

    const posts = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    const nowIST = DateTime.now().setZone("Asia/Kolkata");

    for (const post of posts) {
      if (post.status !== "scheduled") continue;

      // Parse time as IST, convert from UTC if Z is present
      let scheduledTimeIST;
      if (post.time.endsWith("Z")) {
        scheduledTimeIST = DateTime.fromISO(post.time, { zone: "utc" }).setZone(
          "Asia/Kolkata"
        );
      } else {
        scheduledTimeIST = DateTime.fromISO(post.time, {
          zone: "Asia/Kolkata",
        });
      }

      console.log(
        "⏱ Checking:",
        post.id,
        "status:",
        post.status,
        "scheduled time (IST):",
        scheduledTimeIST.toFormat("yyyy-MM-dd HH:mm:ss"),
        "now (IST):",
        nowIST.toFormat("yyyy-MM-dd HH:mm:ss")
      );

      // Trigger post if scheduled time <= now (with optional tolerance)
      const toleranceSeconds = 5; // trigger if within 5 seconds
      const diffSeconds = nowIST.diff(scheduledTimeIST, "seconds").seconds;

      if (diffSeconds >= 0 && diffSeconds <= toleranceSeconds) {
        // Immediately mark as published to prevent re-trigger
        post.status = "publishing"; // temporary status
        fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2)); // save immediately

        console.log(`🚀 Publishing post ${post.id}...`);

        const imageUrl = `${process.env.PUBLIC_URL}/${post.imagePath}`;

        try {
          await publishToInstagram(post.caption, imageUrl);
          post.status = "published";
          post.publishedAt = nowIST.toISO();
          console.log(`✅ Post ${post.id} published`);
        } catch (err) {
          post.status = "failed";
          post.error = err.message;
          console.error(`❌ Post ${post.id} failed:`, err.message);
        }

        // Save final status
        fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
      }
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error("❌ Scheduler crash:", err.message);
  }
};

// Start scheduler
export const startScheduler = () => {
  console.log("⏰ Scheduler started (IST)");

  // Trigger posts instantly on startup
  checkAndPublishPosts();

  // Check every second for exact timing
  setInterval(checkAndPublishPosts, 1000);
};
