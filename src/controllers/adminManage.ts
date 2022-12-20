import express from "express";
import { admin } from "../models/admin";
import { supabase } from "../services/supabase";

const AdminManage = express.Router();

AdminManage.post("/createUser/", async (req, res) => {
  const result = await admin.createUser(
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.roles
  );

  if (!result) {
    return res.status(500).json("Api Error! Contate o desenvolvedor!");
  }

  if (!result.success) {
    return res.status(500).json(result.message);
  }

  return res.json(result.message);
});

AdminManage.post("/getList/", async (req, res) => {
  try {
    const { category } = req.body;

    if (category >= 5) {
      const { error, data } = await supabase
        .from("cut_orders")
        .select()
        .eq("status", category)
        .order("deliver_in", { ascending: true });

      if (error) {
        console.log("Hey! An error has ocurred: " + error.message);
        return res.status(200).json({
          error: true,
          message: "Sb ERROR! Contate um admin!",
          items: [],
        });
      }

      const defaultData = data.filter((element) => {
        return !element.deleted;
      });

      return res
        .status(200)
        .json({ error: false, message: "", items: defaultData });
    }

    const { error, data } = await supabase
      .from("cut_orders")
      .select()
      .order("deliver_in", { ascending: true });

    if (error) {
      console.log("Hey! An error has ocurred: " + error.message);
      return res.status(200).json({
        error: true,
        message: "Sb ERROR! Contate um admin!",
        items: [],
      });
    }

    return res.status(200).json({ error: false, message: "", items: data });
  } catch (error: any) {
    console.log("Hey! An error has ocurred: " + error.message);
    return res.status(200).json({
      error: true,
      message: "Api ERROR! Contate um admin!",
      items: [],
    });
  }
});

AdminManage.get("/getUsers/", async (req, res) => {
  const response = await admin.getUser();

  if (response.success) {
    return res.status(200).json({ users: response.data });
  }

  return res.status(500).json({ message: "Api ERROR! Contate um admin!" });
});

AdminManage.post("/admin/update/", async (req, res) => {
  const { user } = req.body;
  const response = await admin.update(user);
  return res.status(200).json(response);
});

AdminManage.get("/admin/transfer", async (req, res) => {
  const response = await admin.transfer();
  return res.status(200).json(response);
});

export default AdminManage;
