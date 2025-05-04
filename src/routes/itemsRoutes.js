const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

//REST endpoints
router.get("/", itemsController.getAll);
router.post("/", itemsController.create);
router.put("/:id", itemsController.update);
router.delete("/:id", itemsController.delete);
router.get("/:id", itemsController.getById);
module.exports = router;
