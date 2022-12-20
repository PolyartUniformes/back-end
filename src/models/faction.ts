import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from "uuid";
import { FactionType } from "../types";

class Faction {
  async create(element: FactionType) {
    const uuid = uuidv4();

    try {
      if (!element)
        return "Selecione um código antes de prosseguir com a criação!";

      const quantity = parseInt(element.quantity);

      if (!quantity || quantity <= 0) {
        return "Quantidade não pode ser igual ou menor que zero!";
      }

      const parent = await supabase
        .from("cut_orders")
        .select()
        .eq("uuid", element.parent_uuid);

      if (parent.error) {
        console.log("DATABASE ERROR! " + parent.error.message);
        return parent.error.message;
      }

      const parentData = parent.data[0];

      const parentQuantity = parentData.quantity;

      const children = await supabase
        .from("faction_orders")
        .select()
        .eq("parent_uuid", element.parent_uuid);

      if (children.error) {
        console.log("DATABASE ERROR! " + children.error.message);
        return children.error.message;
      }

      const childrenQuantity = children.data.reduce(
        (x, y) => x + y.quantity,
        0
      );

      if (
        childrenQuantity > parentQuantity ||
        quantity > parentQuantity ||
        childrenQuantity + quantity > parentQuantity
      ) {
        return (
          "ERRO! Atualize a quantidade para que não fique acima de: " +
          (parentQuantity - childrenQuantity)
        );
      }

      const price = element.price.replace(",", ".");

      const { error } = await supabase.from("faction_orders").insert({
        uuid,
        parent_uuid: element.parent_uuid,
        parent_image: parentData.image_path,
        parent_code: parentData.main_code,
        faccionista: element.faccionista,
        deliver_at: element.deliver_at,
        quantity,
        price: parseFloat(price),
        observation: element.observation,
        insumos: element.insumos,
      });

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Ordem de facção criada com sucesso!";
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async getOrders() {
    try {
      const { data, error } = await supabase.from("faction_orders").select();

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return data;
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async setFinished(uuid: string) {
    try {
      const { error } = await supabase
        .from("faction_orders")
        .update({ finished: true })
        .eq("uuid", uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      return "Finalizada com sucesso!";
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }
}

const faction = new Faction();

export { faction };
