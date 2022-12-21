import { supabase } from "../services/supabase";

class Estoque {
  async update(element: any) {
    try {
      const { data, error } = await supabase
        .from("Estoque")
        .select()
        .eq("id", element.id);

      if (error) return error.message;

      const item = data[0];

      const db = await supabase
        .from("Estoque")
        .update({
          tecido: element.tissue ? element.tissue : item.tecido,
          cor: element.color ? element.color : item.color,
          composicao: element.composition
            ? element.composition
            : item.composicao,
          quantidade: element.quantity
            ? parseFloat(element.quantity)
            : item.quantidade,
          largura: element.width ? parseInt(element.width) : item.largura,
        })
        .eq("id", element.id);

      if (db.error) return db.error.message;

      return "Item do estoque atualizado com sucesso!";
    } catch (error: any) {
      return error.message;
    }
  }

  async create(element: any) {
    try {
      const { error } = await supabase.from("Estoque").insert({
        tecido: element.tecido,
        cor: element.cor,
        quantidade: element.quantidade,
        composicao: element.composicao,
        fornecedor: element.fornecedor,
        metragem: element.metragem,
        largura: element.largura,
      });

      if (error) return error.message;

      return "Tecido cadastrado com sucesso!";
    } catch (error: any) {
      return error.message;
    }
  }
}

const estoque = new Estoque();

export { estoque };
