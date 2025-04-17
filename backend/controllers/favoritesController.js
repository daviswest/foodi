const dynamoDB = require('../config/db');
const { PutCommand, DeleteCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { getRestaurantFromDynamo, fetchPhotoForRestaurant } = require('../utils/restaurantSearch');
const TABLE_NAME = process.env.DYNAMODB_FAVORITES_TABLE || "UserFavorites";

exports.addFavorite = async (req, res) => {
  const userId = req.user.id;
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ message: 'restaurantId is required' });
  }

  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId,
      restaurantId,
      addedAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    res.status(201).json({ message: "Favorite added successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Could not add favorite", error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const { restaurantId } = req.body;

  if (!restaurantId) {
    return res.status(400).json({ message: 'restaurantId is required' });
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { userId, restaurantId },
  };

  try {
    await dynamoDB.send(new DeleteCommand(params));
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Could not remove favorite", error: error.message });
  }
};

exports.getUserFavorites = async (req, res) => {
  const userId = req.user.id;

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
  };

  try {
    console.log('Logged-in user ID:', userId);

    const result = await dynamoDB.send(new QueryCommand(params));
    const favorites = result.Items;

    console.log("favorites from DB:", favorites);

    const detailPromises = favorites.map(async (fav) => {
      const restaurant = await getRestaurantFromDynamo(fav.restaurantId);
      if (restaurant) {
        if (!restaurant.photo) {
          restaurant.photo = await fetchPhotoForRestaurant(restaurant.place_id);
        }
        return { ...restaurant, addedAt: fav.addedAt };
      }
      return { place_id: fav.restaurantId, missing: true };
    });

    const detailedFavorites = await Promise.all(detailPromises);
    console.log("detailedFavorites:", detailedFavorites);
    res.status(200).json({ favorites: detailedFavorites });
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).json({
      message: "Could not retrieve favorites",
      error: error.message
    });
  }
};