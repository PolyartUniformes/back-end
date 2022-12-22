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

  async getDataChild() {
    try {
      const { data, error } = await supabase
        .from("mostruario_pecas")
        .select()
        .order("alugado", { ascending: true });

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

  async getParents() {
    try {
      const { data, error } = await supabase.from("mostruario_lotes").select();

      if (error) return error.message;

      const db = await supabase.from("mostruario_cliente").select();

      if (db.error) return db.error.message;

      return { lotes: data, clientes: db.data };
    } catch (error: any) {
      return error.message;
    }
  }

  async update(element: any) {
    try {
      const { error } = await supabase
        .from("mostruario_pecas")
        .update({
          item: element.item,
          tamanho: element.tamanho,
        })
        .eq("id", element.id);

      if (error) return error.message;

      return "Peça atualizada com sucesso!";
    } catch (error: any) {
      return error.message;
    }
  }

  async rent(element: any) {
    try {
      const qnt = element.items.split(",");

      const sum = element.alugado + qnt.length;

      const parent = await supabase
        .from("mostruario_lotes")
        .update({ alugado: sum })
        .eq("uuid", element.uuid);

      if (parent.error) return parent.error.message;

      qnt.forEach(async (element: any) => {
        const { error } = await supabase
          .from("mostruario_pecas")
          .update({ alugado: true })
          .eq("id", parseInt(element));

        if (error) console.log(error.message);
      });

      const { error } = await supabase.from("mostruario_cliente").insert({
        uuid: element.uuid,
        cliente: element.cliente,
        documento: element.documento,
        cep: element.cep,
        telefone: element.telefone,
        cidade: element.cidade,
        rua: element.rua,
        numero: element.numero,
        complemento: element.complemento || "",
        aluguel: element.aluguel,
        entrega: element.entrega,
        pecas: element.items,
        detalhes: element.detalhes,
      });

      if (error) return error.message;

      return "Todas as peças selecionadas foram alugadas com sucesso!";
    } catch (error: any) {
      return error.message;
    }
  }

  async unrent(element: any) {
    const items = element.items.split(",");

    const sum = element.alugado - items.length;

    const parent = await supabase
      .from("mostruario_lotes")
      .update({ alugado: sum })
      .eq("uuid", element.uuid);

    if (parent.error) return parent.error.message;

    items.forEach(async (element: any) => {
      const child = await supabase
        .from("mostruario_pecas")
        .update({ alugado: false })
        .eq("id", element);

      if (child.error) console.log(child.error.message);
    });

    element.cliente.forEach(async (e: any) => {
      const clientItems = e.pecas.split(",");

      const newItems = clientItems.filter((val: any) => !items.includes(val));

      if (newItems.length <= 0) {
        const { error } = await supabase
          .from("mostruario_cliente")
          .delete()
          .eq("uuid", element.uuid);

        if (error) console.log(error.message);
      } else {
        const { error } = await supabase
          .from("mostruario_cliente")
          .update({ pecas: newItems.toString() })
          .eq("uuid", element.uuid);

        if (error) console.log(error.message);
      }
    });

    return "Todas as peças selecionadas foram devolvidas com sucesso!";
  }

  async deleteItem(uuid: string) {
    const { error } = await supabase
      .from("mostruario_pecas")
      .delete()
      .eq("uuid", uuid);

    if (error) return error.message;

    const parent = await supabase
      .from("mostruario_lotes")
      .delete()
      .eq("uuid", uuid);

    if (parent.error) return parent.error.message;

    return "Lote e peças deletadas com sucesso!";
  }

  async getCliente(uuid: string) {
    const { data, error } = await supabase
      .from("mostruario_cliente")
      .select()
      .eq("uuid", uuid);

    if (error) return error.message;

    return data;
  }
}

const mostruario = new Mostruario();

export { mostruario };
