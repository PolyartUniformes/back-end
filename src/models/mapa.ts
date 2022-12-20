import { supabase } from "../services/supabase";

class Mapa {
  async getData() {
    const { data, error } = await supabase
      .from("Estoque")
      .select()
      .order("id", { ascending: true });

    if (error) {
      console.log(error.message);
      return error.message;
    }

    return data;
  }

  async update(id: number, quantity: number) {
    const { error } = await supabase
      .from("Estoque")
      .update({ quantidade: quantity })
      .eq("id", id);

    if (error) {
      console.log(error.message);
      return error.message;
    }

    return "Tecido consumido com sucesso!";
  }
}

const mapa = new Mapa();

export { mapa };
