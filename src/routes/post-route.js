const express = require("express");

const postController = require("../controllers/post-controller");
const likeController = require("../controllers/like-controller");
const commentController = require("../controllers/comment-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/",
  upload.single("postImage"),
  postController.createPost
);
router.get(
  "/friends",
  postController.getAllPostIncludeFriend
);
module.exports = router;
router.delete("/:postId", postController.deletePost);
router.post("/:postId/likes", likeController.createLike);
router.delete("/:postId/likes", likeController.unlike);
router.post(
  "/:postId/comments",
  commentController.createComment
);
