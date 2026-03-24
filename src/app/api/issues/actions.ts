"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteIssue(id: number) {
  try {
    const supabase = await createClient();
    await supabase.from("Issue").delete().eq("id", id);
    revalidatePath("/issues");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting issue");
  }
}
