import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  edition: string;
  status: string;
  price: string;
  specs: { icon: string; label: string }[];
  full_specs: { label: string; value: string }[];
  features: string[];
  materials: string[];
  gallery: string[];
  created_at: string;
}

export function useProducts() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setProducts(data as unknown as DBProduct[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<DBProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (data) setProduct(data as unknown as DBProduct);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { product, loading };
}
