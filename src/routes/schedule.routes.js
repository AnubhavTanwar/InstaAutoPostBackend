import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("src/data/scheduledPosts.json");

router.post("/schedule", (req, res) => {
  const { caption, imageUrl, time } = req.body;

  const posts = JSON.parse(fs.readFileSync(filePath));

  posts.push({
    id: Date.now(),
    caption,
    imageUrl,
    time,
    published: false
  });

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  res.json({ message: "Post scheduled successfully" });
});

export default router;
