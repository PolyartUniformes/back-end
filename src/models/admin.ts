import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { supabase } from "../services/supabase";

class Admin {
  async createUser(
    name: string,
    email: string,
    password: string,
    roles: string
  ) {
    if (!name || !password) {
      return {
        success: false,
        message: "Nome e senha não podem ficar vázios!",
      };
    }

    const uuid = uuidv4();
    const result = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      uuid,
      name,
      email,
      password: result,
      roles,
    });

    if (error) {
      console.log(`ERROR! ${error.message}`);

      if (error.message.includes("duplicate" && "users_name_key")) {
        return {
          success: false,
          message: "Desculpe, mas este nome já existe no sistema!",
        };
      }

      return { success: false, message: error.message };
    } else {
      return {
        success: true,
        message: "Sucesso! Conta cadastrada no sistema!",
      };
    }
  }

  async getUser() {
    try {
      const { data, error } = await supabase.from("users").select();

      if (error) {
        console.log(error.message);
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(user: any) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("uuid", user.uuid);

      if (error) {
        console.log("DATABASE ERROR! " + error.message);
        return error.message;
      }

      const old = data[0];

      if (user.password) {
        const salt = await bcrypt.hash(user.password, 10);

        const db = await supabase
          .from("users")
          .update({
            name: user.name ? user.name.toUpperCase() : old.name,
            email: user.email ? user.email.toUpperCase() : old.email,
            password: salt,
            roles: user.roles ? user.roles : old.roles,
          })
          .eq("uuid", user.uuid);

        if (db.error) {
          console.log(db.error.message);
          return db.error.message;
        }

        return "Usuário editado com sucesso!";
      }

      const db = await supabase
        .from("users")
        .update({
          name: user.name ? user.name.toUpperCase() : old.name,
          email: user.email ? user.email.toUpperCase() : old.email,
          roles: user.roles ? user.roles : old.roles,
        })
        .eq("uuid", user.uuid);

      if (db.error) {
        console.log(db.error.message);
        return db.error.message;
      }

      return "Usuário editado com sucesso!";
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }

  async transfer() {
    try {
      const { data, error } = await supabase.from("ordensDeCorte").select();

      if (error) {
        console.log(error.message);
        return error.message;
      }

      data.forEach(async (element) => {
        const handleSizes = () => {
          let size01 = element.tamanhos[0].size01 || 0;
          let size02 = element.tamanhos[0].size02 || 0;
          let size03 = element.tamanhos[0].size03 || 0;
          let size04 = element.tamanhos[0].size04 || 0;
          let size05 = element.tamanhos[0].size05 || 0;
          let size06 = element.tamanhos[0].size06 || 0;
          let size07 = element.tamanhos[0].size07 || 0;
          let size08 = element.tamanhos[0].size08 || 0;
          let size09 = element.tamanhos[0].size09 || 0;
          let size10 = element.tamanhos[0].size10 || 0;
          let sizeF01 = element.tamanhos[0].sizeF01 || 0;
          let sizeF02 = element.tamanhos[0].sizeF02 || 0;
          let sizeF03 = element.tamanhos[0].sizeF03 || 0;
          let sizeF04 = element.tamanhos[0].sizeF04 || 0;
          let sizeF05 = element.tamanhos[0].sizeF05 || 0;
          let sizeF06 = element.tamanhos[0].sizeF06 || 0;
          let sizeF07 = element.tamanhos[0].sizeF07 || 0;
          let sizeF08 = element.tamanhos[0].sizeF08 || 0;
          let sizeF09 = element.tamanhos[0].sizeF09 || 0;
          let sizeF10 = element.tamanhos[0].sizeF10 || 0;
          let sizeI01 = element.tamanhos[0].sizeI01 || 0;
          let sizeI02 = element.tamanhos[0].sizeI02 || 0;
          let sizeI03 = element.tamanhos[0].sizeI03 || 0;
          let sizeI04 = element.tamanhos[0].sizeI04 || 0;
          let sizeI05 = element.tamanhos[0].sizeI05 || 0;
          let sizeI06 = element.tamanhos[0].sizeI06 || 0;

          const sizeType = element.grade;

          if (sizeType !== "UNISEX") {
            const values = `${size01},${size02},${size03},${size04},${size05},${size06},${size07},${size08},${size09},${size10}`;
            return values;
          }

          const values = `${size01},${size02},${size03},${size04},${size05},${size06},${size07},${size08},${size09},${size10}${sizeF01},${sizeF02},${sizeF03},${sizeF04},${sizeF05},${sizeF06},${sizeF07},${sizeF08},${sizeF09},${sizeF10},${sizeI01},${sizeI02},${sizeI03},${sizeI04},${sizeI05},${sizeI06}`;
          return values;
        };

        const handleStatus = () => {
          const value: number = element.category;

          switch (value) {
            case 10:
              return 5;
              break;
            case 11:
              return 6;
              break;
            case 12:
              return 7;
              break;
            case 13:
              return 8;
              break;
            case 14:
              return 9;
              break;
            case 15:
              return 10;
              break;
            case 16:
              return 11;
              break;
            case 17:
              return 12;
              break;
            case 18:
              return 13;
              break;
            case 19:
              return 14;
              break;
            case 20:
              return 15;
              break;
            case 21:
              return 16;
              break;
          }
        };

        const handleTissues = () => {
          let tecidoA = element.tecidos[0].tecidoA;
          let tecidoB = element.tecidos[1].tecidoB;
          let tecidoC = element.tecidos[2].tecidoC;
          let tecidoD = element.tecidos[3].tecidoD;

          return `${tecidoA || "NONE"},${tecidoB || "NONE"},${
            tecidoC || "NONE"
          },${tecidoD || "NONE"}`;
        };

        const handleTotal = () => {
          const oldSizes = handleSizes();
          const sizes = oldSizes.split(",");
          const sumSizes = sizes.reduce(
            (accumulator: any, currentValue: any) =>
              parseInt(accumulator) + parseInt(currentValue),
            0
          );

          return sumSizes;
        };

        const db = await supabase.from("cut_orders").insert({
          uuid: element.uuid,
          main_code: element.codigo_oc,
          sub_code: element.numeroDoPedido,
          seller: element.vendedor,
          client: element.cliente,
          deliver_in: element.data_entrega,
          quantity: parseInt(element.quantidade),
          pilot: element.piloto,
          package_type: element.embalagem,
          aplication_type: element.aplicacao,
          line_type: element.linha,
          observation: element.observacao,
          description: element.descricao,
          image_path: element.layout_img,
          size_type: element.grade,
          deleted: element.deleted,
          sizes: handleSizes(),
          tissues: handleTissues(),
          special_size: 0,
          status: handleStatus(),
          total: handleTotal(),
        });

        if (db.error) {
          return console.log(db.error.message);
        }
      });

      return "Dados transferidos com sucesso!";
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  }
}

const admin = new Admin();

export { admin };
