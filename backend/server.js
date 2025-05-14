const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/favorites", favoritesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running`));
