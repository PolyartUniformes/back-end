type Items = [
  {
    item: string;
    tamanho: string;
  }
];

import { v4 as uuidv4 } from "uuid";
import { supabase } from "../services/supabase";

class Mostruario {
  async create(element: any) {
    try {
      const uuid = uuidv4();

      console.log(element);

      const code = element.code;
      const items: Items = element.items;

      const { error } = await supabase.from("mostruario_lotes").insert({
        uuid,
        code,
        itens: items.length,
      });

      if (error) return error.message;

      items.forEach(async (element) => {
        const db = await supabase.from("mostruario_pecas").insert({
          uuid,
          tamanho: element.tamanho,
          item: element.item,
        });

        console.log(element);

        if (db.error) console.log(db.error.message);
      });

      return "Lote cadastrado com sucesso!";
    } catch (error: any) {
      return error.message;
    }
  }

  async getData() {
    try {
      const { data, error } = await supabase.from("mostruario_lotes").select();

      if (error) return error.message;

      return data;
    } catch (error: any) {
      return error.message;
    }
  }

  async getChilds(uuid: string) {
    try {
      const { data, error } = await supabase
        .from("mostruario_pecas")
        .select()
        .eq("uuid", uuid);

      if (error) return error.message;

      return data;
    } catch (error: any) {
      return error.message;
    }
  }
}

const mostruario = new Mostruario();

export { mostruario };
