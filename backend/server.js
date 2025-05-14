const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://reliable-toffee-506b30.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("/healthz", (req, res) => {
  return res.sendStatus(204);
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Server running");
});
