import express from "express";
import { estoque } from "../models/estoque";

const Estoque = express.Router();

Estoque.post("/estoque/update/", async (req, res) => {
  const { element } = req.body;

  const response = await estoque.update(element);

  return res.status(200).json(response);
});

Estoque.post("/estoque/create/", async (req, res) => {
  const { element } = req.body;

  const response = await estoque.create(element);

  return res.status(200).json(response);
});

export default Estoque;
