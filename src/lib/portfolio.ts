import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import cryptoPreview from "../assets/project-crypto.jpg";
import socialPreview from "../assets/project-social.jpg";
import tasksPreview from "../assets/project-tasks.jpg";
import weatherPreview from "../assets/project-weather.jpg";
import portfolioPreview from "../assets/project-portfolio.jpg";
import gamePreview from "../assets/project-game.jpg";

export type Category = { id: string; name: string; sort_order: number };
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_url: string | null;
  link: string | null;
  category_id: string | null;
  sort_order: number;
};
export type CustomSection = {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  sort_order: number;
};

const BUILTIN: Record<string, string> = {
  "builtin:crypto": cryptoPreview,
  "builtin:social": socialPreview,
  "builtin:tasks": tasksPreview,
  "builtin:weather": weatherPreview,
  "builtin:portfolio": portfolioPreview,
  "builtin:game": gamePreview,
};

export function resolveImage(url: string | null | undefined) {
  if (!url) return null;
  return BUILTIN[url] ?? url;
}

export const portfolioQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: async () => {
    const [p, c, s] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("created_at"),
      supabase.from("categories").select("*").order("sort_order").order("created_at"),
      supabase.from("custom_sections").select("*").order("sort_order").order("created_at"),
    ]);
    if (p.error) throw p.error;
    if (c.error) throw c.error;
    if (s.error) throw s.error;
    return {
      projects: (p.data ?? []) as Project[],
      categories: (c.data ?? []) as Category[],
      sections: (s.data ?? []) as CustomSection[],
    };
  },
});

export async function uploadImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("portfolio-images").upload(path, file, {
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("portfolio-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signErr || !data) throw signErr ?? new Error("Could not create image link");
  return data.signedUrl;
}
