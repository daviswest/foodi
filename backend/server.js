const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();

app.use(cors({
  origin: "https://reliable-toffee-506b30.netlify.app",
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.get("/api/ping", (_req, res) => {
  console.log("/api/ping hit");
  return res.json({ pong: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("/healthz", (_req, res) => res.sendStatus(204));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));