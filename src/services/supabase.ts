import { createClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  global: {
    headers: { "x-polyart-api": "polyart" },
  },
};

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey, options);

export { supabase };
