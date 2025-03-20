const { PutCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const dynamoDB = require("../config/db");

const TABLE_NAME = "Users";

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const userId = uuidv4();

  const params = new PutCommand({
    TableName: TABLE_NAME,
    Item: { id: userId, name, email, password: hashedPassword },
  });

  await dynamoDB.send(params);
  return { id: userId, name, email };
};

const getUserByEmail = async (email) => {
  console.log("searching for email ", email);
  if (!email || typeof email !== "string" || email.length > 255) {
    return null;
  }

  const params = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
    Limit: 1,
  });

  const result = await dynamoDB.send(params);
  console.log("result from db email global secondary index query, ", result);
  return result.Items?.[0] || null;
};

const getUserById = async (id) => {
  if (!id || typeof id !== "string" || id.length > 255) {
    return null;
  }

  const params = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id },
    Limit: 1,
  });

  const result = await dynamoDB.send(params);
  return result.Items?.[0] || null;
};

module.exports = { createUser, getUserByEmail, getUserById };
