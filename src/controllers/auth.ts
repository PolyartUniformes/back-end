import express from "express";
import { user } from "../models/user";

const auth = express.Router();

auth.post("/auth/", async (req, res) => {
  let result = await user.validateCredentials(req.body.name, req.body.password);

  if (result?.success) {
    return res.json({
      message: "Authentication succeded!",
      token: `Bearer ${result.token}`,
    });
  }

  return res.status(500).json(result?.message);
});

auth.get("/auth/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    let result = user.validateToken(token);

    if (result?.success) {
      return res.json(result.message);
    }

    return res.status(500).json(result?.message);
  }

  return res.status(500).json("Invalid token!");
});

export default auth;
