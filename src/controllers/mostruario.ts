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

Mostruario.get("/mostruario/listchild/", async (req, res) => {
  const response = await mostruario.getDataChild();

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/child/", async (req, res) => {
  const { uuid } = req.body;

  const response = await mostruario.getChilds(uuid);

  return res.status(200).json(response);
});

Mostruario.get("/mostruario/getparents/", async (req, res) => {
  const response = await mostruario.getParents();

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/update/", async (req, res) => {
  const { element } = req.body;

  const response = await mostruario.update(element);

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/rent/", async (req, res) => {
  const { element } = req.body;

  const response = await mostruario.rent(element);

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/unrent/", async (req, res) => {
  const { element } = req.body;

  const response = await mostruario.unrent(element);

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/delete/", async (req, res) => {
  const { uuid } = req.body;

  const response = await mostruario.deleteItem(uuid);

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/getCliente/", async (req, res) => {
  const { uuid } = req.body;

  const response = await mostruario.getCliente(uuid);

  return res.status(200).json(response);
});

Mostruario.post("/mostruario/saveclient/", async (req, res) => {
  const { element } = req.body;

  await mostruario.saveClient(element);

  return res.status(200);
});

Mostruario.post("/mostruario/deleteclient/", async (req, res) => {
  const { id } = req.body;

  const response = await mostruario.deleteClient(id);

  return res.status(200).json(response);
});

Mostruario.get("/mostruario/getclients/", async (req, res) => {
  const dados = await mostruario.getClients();
  return res.status(200).json(dados);
});

export default Mostruario;
