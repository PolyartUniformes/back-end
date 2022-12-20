import express from "express";
import { mapa } from "../models/mapa";

const Mapa = express.Router();

Mapa.get("/mapa/list/", async (req, res) => {
  const data = await mapa.getData();
  return res.status(200).json(data);
});

Mapa.post("/mapa/update/", async (req, res) => {
  const { id, quantity } = req.body;

  const data = await mapa.update(id, quantity);

  return res.status(200).json(data);
});

export default Mapa;
