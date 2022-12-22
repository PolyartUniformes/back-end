import { supabase } from "../services/supabase";

import { v4 as uuidv4 } from "uuid";

class Corte {
  async changeStatus(uuid: string, code: number) {
    try {
      const { error } = await supabase
        .from("cut_orders")
        .update({ status: code })
        .eq("uuid", uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Setor alterado com sucesso!";
    } catch (error: any) {
      console.log("API ERROR! " + error.message);
      return error.message;
    }
  }

  async create(element: any, image_path: string) {
    try {
      const uuid = uuidv4();

      const total = element.sizes
        .split(",")
        .reduce((x: any, y: any) => x + parseInt(y), 0);

      const pilot = element.pilot === "TRUE" ? true : false;

      const { error } = await supabase.from("cut_orders").insert({
        uuid,
        sub_code: parseInt(element.sub_code),
        quantity: parseInt(element.quantity),
        deliver_in: element.deliver_in,
        client: element.client,
        seller: element.seller,
        line_type: element.line_type,
        pilot,
        package_type: element.package_type,
        aplication_type: element.aplication_type,
        description: element.description,
        observation: element.observation,
        tissues: element.tissues,
        image_path,
        special_size: parseInt(element.special_size),
        sizes: element.sizes,
        size_type: element.size_type,
        total: total + parseInt(element.special_size),
      });

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Ordem de corte criada com sucesso!";
    } catch (error: any) {
      console.log("API ERROR! " + error.message);
      return error.message;
    }
  }

  async edit(element: any) {
    try {
      const sizesReducer = element.sizes
        .split(",")
        .map((e: any) => parseInt(e))
        .reduce((prev: any, curr: any) => {
          return prev + curr;
        });

      const total = sizesReducer + parseInt(element.special_size);

      const { error } = await supabase
        .from("cut_orders")
        .update({
          sub_code: parseInt(element.sub_code) || null,
          quantity: element.quantity || null,
          deliver_in: element.deliver_in || null,
          client: element.client || null,
          seller: element.seller || null,
          line_type: element.line_type || null,
          pilot:
            element.pilot === "false"
              ? false
              : element.pilot === "true"
              ? true
              : element.pilot === "SIM"
              ? true
              : false,
          package_type: element.package_type || null,
          aplication_type: element.aplication_type || null,
          description: element.description || null,
          observation: element.observation || null,
          tissues: element.tissues || null,
          image_path: element.image_path || null,
          special_size: parseInt(element.special_size) || 0,
          sizes: element.sizes || null,
          size_type: element.size_type || null,
          total: total,
        })
        .eq("uuid", element.uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Ordem de corte alterada com sucesso!";
    } catch (error: any) {
      console.log("API ERROR! " + error.message);
      return error.message;
    }
  }

  async block(uuid: string) {
    try {
      const { error } = await supabase
        .from("cut_orders")
        .update({ deleted: true })
        .eq("uuid", uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Ordem de corte enviada a lixeira com sucesso!";
    } catch (error: any) {
      console.log("API ERROR! " + error.message);
      return error.message;
    }
  }

  async unBlock(uuid: string) {
    try {
      const { error } = await supabase
        .from("cut_orders")
        .update({ deleted: false })
        .eq("uuid", uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Ordem de corte restaurada com sucesso!";
    } catch (error: any) {
      console.log("API ERROR! " + error.message);
      return error.message;
    }
  }

  async getCatalogo() {
    const { data, error } = await supabase.from("Catalogo").select();

    if (error) return error.message;

    return data;
  }

  async getItems() {
    const { data, error } = await supabase
      .from("cut_orders")
      .select()
      .order("main_code", { ascending: true });

    if (error) return error.message;

    return data;
  }
}

const corte = new Corte();

export { corte };
