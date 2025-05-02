const express = require("express");
const router = express.Router();
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

router.get("/", getAllContent);
router.get("/:id", getContentById);
router.post("/", createContent);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;
