import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  key: string;
  content: Record<string, any>;
  updated_at: string;
}

export function useSiteContent(key: string) {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: row } = await supabase
        .from("site_content" as any)
        .select("content")
        .eq("key", key)
        .maybeSingle();
      if (row) setData((row as any).content);
      setLoading(false);
    };
    fetch();
  }, [key]);

  return { data, loading };
}

export function useAllSiteContent() {
  const [data, setData] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("site_content" as any)
      .select("*")
      .order("key");
    if (rows) setData(rows as any);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const updateContent = async (key: string, content: Record<string, any>) => {
    const { error } = await supabase
      .from("site_content" as any)
      .update({ content, updated_at: new Date().toISOString() } as any)
      .eq("key", key);
    if (!error) {
      setData((prev) => prev.map((item) => item.key === key ? { ...item, content } : item));
    }
    return { error };
  };

  return { data, loading, refetch: fetchAll, updateContent };
}
