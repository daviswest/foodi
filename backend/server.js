const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

const app = express();

app.use(cors({
  origin: 'https://reliable-toffee-506b30.netlify.app',
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/favorites", favoritesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running`));
