import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Initialize with dummy values during development
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables = Database["public"]["Tables"];
export type TierList = Tables["tier_lists"]["Row"];
export type TierRow = Tables["tier_rows"]["Row"];
export type TierItem = Tables["tier_items"]["Row"];
