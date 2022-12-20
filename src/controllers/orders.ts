import express from "express";
import { corte } from "../models/corte";
import { faction } from "../models/faction";

const Order = express.Router();

Order.post("/create/", async (req, res) => {
  const { values } = req.body;

  const response = await faction.create(values);

  return res.status(200).json(response);
});

Order.get("/get-faction-orders/", async (req, res) => {
  const response = await faction.getOrders();

  return res.status(200).json(response);
});

Order.post("/finished/", async (req, res) => {
  const { uuid } = req.body;

  const response = await faction.setFinished(uuid);

  return res.status(200).json(response);
});

Order.post("/ordem-de-corte/status/", async (req, res) => {
  const { uuid, code } = req.body;

  const response = await corte.changeStatus(uuid, code);

  return res.status(200).json(response);
});

Order.post("/ordem-de-corte/edit/", async (req, res) => {
  const { element } = req.body;

  const response = await corte.edit(element);

  return res.status(200).json(response);
});

Order.post("/ordem-de-corte/block/", async (req, res) => {
  const { uuid } = req.body;

  const response = await corte.block(uuid);

  return res.status(200).json(response);
});

Order.post("/ordem-de-corte/unblock/", async (req, res) => {
  const { uuid } = req.body;

  const response = await corte.unBlock(uuid);

  return res.status(200).json(response);
});

Order.post("/ordem-de-corte/create/", async (req, res) => {
  const { element, path } = req.body;

  const response = await corte.create(element, path);

  return res.status(200).json(response);
});

Order.get("/api/webGet/", async (req, res) => {
  const response = await corte.getCatalogo();

  return res.status(200).json(response);
});

export default Order;
