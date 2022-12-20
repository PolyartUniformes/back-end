import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../services/supabase";

const privateKey = process.env.PRIVATE_KEY as string;

class User {
  async validateCredentials(name: string, password: string) {
    if (name === "" || password === "")
      return { success: false, message: "Há campos vázios!" };

    const { error, data } = await supabase
      .from("users")
      .select()
      .eq("name", name);

    if (error) {
      return { success: false, message: error.message };
    }

    if (data.length > 0) {
      const result = await bcrypt.compare(password, data[0].password);

      if (!result) {
        return { success: false, message: "Combinação inválida!" };
      }

      const uuid = data[0].uuid;
      const token = jwt.sign({ uuid }, privateKey, { expiresIn: 3600 });

      return { success: true, token };
    } else {
      return { success: false, message: "Combinação inválida!" };
    }
  }

  validateToken(token: string) {
    try {
      const decode = jwt.verify(token, privateKey);
      if (decode) {
        return { success: true, message: token };
      }
      return { success: false, message: "User not found!" };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

const user = new User();

export { user };
