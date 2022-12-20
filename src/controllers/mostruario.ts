import express from "express";
import { mostruario } from "../models/mostruario";

const Mostruario = express.Router();

Mostruario.post("/mostruario/create/", async (req, res) => {
  const { element } = req.body;

  const response = await mostruario.create(element);

  return res.status(200).json(response);
});

Mostruario.get("/mostruario/list/", async (req, res) => {
  const response = await mostruario.getData();

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/child/", async (req, res) => {
  const { uuid } = req.body;

  const response = await mostruario.getChilds(uuid);

  return res.status(200).json(response);
});

export default Mostruario;
