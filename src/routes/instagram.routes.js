// // import express from "express";
// // import {
// //   getPosts,
// //   savePost,
// //   publishNow,
// //    getBestTimeToPost,
// // } from "../controllers/instagram.controller.js";
// // import { upload } from "../middleware/upload.js";

// // const router = express.Router();

// // router.get("/posts", getPosts);
// // // router.post("/save", savePost);
// // // router.post("/publish", publishNow);
// // // ✅ NEW
// // router.get("/best-time", getBestTimeToPost);

// // router.post("/save", upload.single("image"), savePost);
// // router.post("/publish", upload.single("image"), publishNow);

// // export default router;













// import express from "express";
// import {
//   savePost,
//   publishNow,
//   getPosts,
//   getBestTimeToPost,
// } from "../controllers/instagram.controller.js";
// import { upload } from "../middlewares/upload.js";

// const router = express.Router();

// router.get("/posts", getPosts);
// router.get("/best-time", getBestTimeToPost);

// // ✅ multer MUST be here
// router.post(
//   "/save",
//   upload.single("image"),
//   savePost
// );

// router.post(
//   "/publish",
//   upload.single("image"),
//   publishNow
// );

// export default router;













import express from "express";
import {
  savePost,
  publishNow,
  getPosts,
  publishScheduledPosts,
  getBestTimeToPost,
  getInstagramProfile
} from "../controllers/instagram.controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/posts", getPosts);
router.get("/best-time", getBestTimeToPost);
router.get("/profile", getInstagramProfile);
// Save / schedule post
router.post("/save", upload.single("image"), savePost);

// Publish immediately
router.post("/publish", upload.single("image"), publishNow);

// Publish scheduled posts (manual trigger)
router.post("/publish-scheduled", publishScheduledPosts);

export default router;
