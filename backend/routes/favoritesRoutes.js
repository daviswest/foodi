const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/add", favoritesController.addFavorite);
router.delete("/remove", favoritesController.removeFavorite);
router.get("/", favoritesController.getUserFavorites);

module.exports = router;