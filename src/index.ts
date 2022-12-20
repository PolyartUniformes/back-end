import express from "express";
import cors from "cors";
import "dotenv/config";

import auth from "./controllers/auth";
import AdminManage from "./controllers/adminManage";
import Order from "./controllers/orders";
import Mapa from "./controllers/mapa";
import Estoque from "./controllers/estoque";
import Mostruario from "./controllers/mostruario";

const PORT = process.env.PORT || 3000;

const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auth);
app.use(AdminManage);
app.use(Order);
app.use(Mapa);
app.use(Estoque);
app.use(Mostruario);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to polyart application!" });
});

app.listen(PORT, () => {
  console.log(`Api is Ready on ${HOSTNAME}:${PORT}`);
});
