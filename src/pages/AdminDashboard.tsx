import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, LogOut, Mail, Users, Package, Eye, EyeOff, Trash2, Clock, Plus, X, FileText, Save, ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProducts, DBProduct } from "@/hooks/use-products";
import { useAllSiteContent, SiteContent } from "@/hooks/use-site-content";
import SEO from "@/components/SEO";

type Tab = "messages" | "waitlist" | "products" | "content";

interface ContactMessage {
  id: string; name: string; email: string; subject: string; message: string; read: boolean; created_at: string;
}
interface WaitlistEntry {
  id: string; email: string; created_at: string;
}

const emptyProduct = { slug: "", name: "", tagline: "", description: "", image_url: "", edition: "", status: "coming-soon", price: "" };

const inputClass = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

const ProductEditor = ({ product, onSave, onCancel }: { product: DBProduct; onSave: () => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ name: product.name, tagline: product.tagline, description: product.description, image_url: product.image_url, edition: product.edition, status: product.status, price: product.price, slug: product.slug });
  const [specs, setSpecs] = useState(product.specs || []);
  const [fullSpecs, setFullSpecs] = useState(product.full_specs || []);
  const [features, setFeatures] = useState(product.features || []);
  const [materials, setMaterials] = useState(product.materials || []);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.price.trim()) {
      toast({ title: "Missing fields", description: "Name, slug, and price are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("products").update({
      name: form.name.trim(), tagline: form.tagline.trim(), description: form.description.trim(),
      image_url: form.image_url.trim() || "/placeholder.svg", edition: form.edition.trim(),
      status: form.status, price: form.price.trim(), slug: form.slug.trim(),
      specs: specs as any, full_specs: fullSpecs as any, features: features as any, materials: materials as any,
    }).eq("id", product.id);
    setSaving(false);
    if (error) {
      if (error.code === "23505") toast({ title: "Slug already exists", variant: "destructive" });
      else toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product updated! ✅" });
      onSave();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-foreground">Edit: {product.name}</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}><X className="w-4 h-4" /></Button>
      </div>

      {/* Basic Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium text-foreground mb-1 block">Slug *</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Name *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Tagline</label><input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Price *</label><input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Image URL</label><input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Edition</label><input value={form.edition} onChange={(e) => setForm({ ...form, edition: e.target.value })} className={inputClass} /></div>
        <div><label className="text-sm font-medium text-foreground mb-1 block">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
            <option value="coming-soon">Coming Soon</option><option value="available">Available</option><option value="sold-out">Sold Out</option>
          </select>
        </div>
      </div>
      <div><label className="text-sm font-medium text-foreground mb-1 block">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass + " resize-none"} />
      </div>

      {/* Specs (icon + label) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">Specs (icon tags)</label>
        {specs.map((s, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={s.icon} onChange={(e) => { const a = [...specs]; a[i] = { ...a[i], icon: e.target.value }; setSpecs(a); }} placeholder="Icon (Cpu, Leaf...)" className={inputClass + " w-1/3"} />
            <input value={s.label} onChange={(e) => { const a = [...specs]; a[i] = { ...a[i], label: e.target.value }; setSpecs(a); }} placeholder="Label" className={inputClass + " flex-1"} />
            <Button variant="ghost" size="sm" onClick={() => setSpecs(specs.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5 text-destructive" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setSpecs([...specs, { icon: "", label: "" }])} className="gap-1"><Plus className="w-3 h-3" /> Add Spec</Button>
      </div>

      {/* Full Specs (label + value) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">Full Specifications</label>
        {fullSpecs.map((s, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={s.label} onChange={(e) => { const a = [...fullSpecs]; a[i] = { ...a[i], label: e.target.value }; setFullSpecs(a); }} placeholder="Label" className={inputClass + " w-1/3"} />
            <input value={s.value} onChange={(e) => { const a = [...fullSpecs]; a[i] = { ...a[i], value: e.target.value }; setFullSpecs(a); }} placeholder="Value" className={inputClass + " flex-1"} />
            <Button variant="ghost" size="sm" onClick={() => setFullSpecs(fullSpecs.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5 text-destructive" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setFullSpecs([...fullSpecs, { label: "", value: "" }])} className="gap-1"><Plus className="w-3 h-3" /> Add Spec</Button>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">Features</label>
        {features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input value={f} onChange={(e) => { const a = [...features]; a[i] = e.target.value; setFeatures(a); }} placeholder="Feature description" className={inputClass + " flex-1"} />
            <Button variant="ghost" size="sm" onClick={() => setFeatures(features.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5 text-destructive" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setFeatures([...features, ""])} className="gap-1"><Plus className="w-3 h-3" /> Add Feature</Button>
      </div>

      {/* Materials */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground block">Materials</label>
        {materials.map((m, i) => (
          <div key={i} className="flex gap-2">
            <input value={m} onChange={(e) => { const a = [...materials]; a[i] = e.target.value; setMaterials(a); }} placeholder="Material description" className={inputClass + " flex-1"} />
            <Button variant="ghost" size="sm" onClick={() => setMaterials(materials.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5 text-destructive" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setMaterials([...materials, ""])} className="gap-1"><Plus className="w-3 h-3" /> Add Material</Button>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </motion.div>
  );
};

// Friendly labels for content sections
const sectionLabels: Record<string, string> = {
  hero: "Hero Section", vision: "Vision Section", innovation: "Innovation / Sustainability",
  timeline: "Timeline / Milestones", cta: "CTA / Waitlist", about: "About Page",
  our_story: "Our Story Page", contact: "Contact Page",
};

// Field labels for nicer UI
const fieldLabels: Record<string, string> = {
  badge_text: "Badge Text", since_label: "Since Label", title_line1: "Title Line 1", title_line2: "Title Line 2",
  subtitle: "Subtitle", cta_primary: "Primary CTA", cta_secondary: "Secondary CTA",
  section_label: "Section Label", heading: "Heading", heading_highlight: "Heading Highlight",
  description: "Description", label: "Label", button_text: "Button Text", privacy_note: "Privacy Note",
  success_title: "Success Title", success_message: "Success Message", form_title: "Form Title",
  hero_label: "Hero Label", hero_title: "Hero Title", hero_title_prefix: "Title Prefix",
  hero_title_brand: "Brand Name", hero_description: "Hero Description", hero_title_highlight: "Title Highlight",
  hero_title_suffix: "Title Suffix", story_label: "Story Label", story_title: "Story Title",
  story_title_highlight: "Story Highlight", promise_title: "Promise Title", promise_description: "Promise Description",
  promise_badge: "Promise Badge", values_label: "Values Label", values_title: "Values Title",
  values_title_highlight: "Values Highlight", philosophy_title: "Philosophy Title",
  philosophy_title_highlight: "Philosophy Highlight", origin_label: "Origin Label",
  origin_title: "Origin Title", origin_title_highlight: "Origin Highlight",
  team_label: "Team Label", team_title: "Team Title", team_title_highlight: "Team Highlight",
};

const ContentEditor = ({ item, onSave }: { item: SiteContent; onSave: (key: string, content: Record<string, any>) => Promise<void> }) => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState(item.content);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const updateField = (key: string, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const updateArrayItem = (arrayKey: string, index: number, field: string, value: any) => {
    setContent((prev) => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayKey]: arr };
    });
    setDirty(true);
  };

  const addArrayItem = (arrayKey: string, template: Record<string, any>) => {
    setContent((prev) => ({ ...prev, [arrayKey]: [...(prev[arrayKey] || []), template] }));
    setDirty(true);
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    setContent((prev) => ({ ...prev, [arrayKey]: (prev[arrayKey] || []).filter((_: any, i: number) => i !== index) }));
    setDirty(true);
  };

  const updateStringArrayItem = (arrayKey: string, index: number, value: string) => {
    setContent((prev) => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = value;
      return { ...prev, [arrayKey]: arr };
    });
    setDirty(true);
  };

  const addStringArrayItem = (arrayKey: string) => {
    setContent((prev) => ({ ...prev, [arrayKey]: [...(prev[arrayKey] || []), ""] }));
    setDirty(true);
  };

  const removeStringArrayItem = (arrayKey: string, index: number) => {
    setContent((prev) => ({ ...prev, [arrayKey]: (prev[arrayKey] || []).filter((_: any, i: number) => i !== index) }));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(item.key, content);
    setSaving(false);
    setDirty(false);
  };

  const renderField = (key: string, value: any) => {
    if (Array.isArray(value)) {
      // String arrays (paragraphs, badges)
      if (value.length === 0 || typeof value[0] === "string") {
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-semibold text-foreground block">{fieldLabels[key] || key}</label>
            {value.map((item: string, i: number) => (
              <div key={i} className="flex gap-2">
                <textarea value={item} onChange={(e) => updateStringArrayItem(key, i, e.target.value)} rows={2}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                <Button variant="ghost" size="sm" onClick={() => removeStringArrayItem(key, i)}><X className="w-3.5 h-3.5 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addStringArrayItem(key)} className="gap-1"><Plus className="w-3 h-3" /> Add</Button>
          </div>
        );
      }
      // Object arrays
      return (
        <div key={key} className="space-y-3">
          <label className="text-sm font-semibold text-foreground block">{fieldLabels[key] || key}</label>
          {value.map((obj: any, i: number) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2 bg-secondary/20">
              {Object.entries(obj).map(([field, val]) => (
                <div key={field}>
                  <label className="text-xs text-muted-foreground block mb-0.5">{field}</label>
                  {typeof val === "boolean" ? (
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={val as boolean} onChange={(e) => updateArrayItem(key, i, field, e.target.checked)} />
                      <span className="text-sm text-foreground">{val ? "Yes" : "No"}</span>
                    </label>
                  ) : typeof val === "number" ? (
                    <input type="number" value={val as number} onChange={(e) => updateArrayItem(key, i, field, Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  ) : (
                    <input value={String(val)} onChange={(e) => updateArrayItem(key, i, field, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  )}
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => removeArrayItem(key, i)} className="text-destructive hover:text-destructive text-xs gap-1">
                <Trash2 className="w-3 h-3" /> Remove
              </Button>
            </div>
          ))}
          {value.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => addArrayItem(key, Object.fromEntries(Object.entries(value[0]).map(([k, v]) => [k, typeof v === "boolean" ? false : typeof v === "number" ? 0 : ""])))} className="gap-1">
              <Plus className="w-3 h-3" /> Add Item
            </Button>
          )}
        </div>
      );
    }

    // Simple string field
    if (typeof value === "string") {
      const isLong = value.length > 80;
      return (
        <div key={key}>
          <label className="text-sm font-medium text-foreground mb-1 block">{fieldLabels[key] || key}</label>
          {isLong ? (
            <textarea value={value} onChange={(e) => updateField(key, e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          ) : (
            <input value={value} onChange={(e) => updateField(key, e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          )}
        </div>
      );
    }

    return null;
  };

  // Separate simple fields from array fields
  const simpleFields = Object.entries(content).filter(([, v]) => typeof v === "string" || typeof v === "number");
  const arrayFields = Object.entries(content).filter(([, v]) => Array.isArray(v));

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors text-left">
        <div className="flex items-center gap-3">
          {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          <span className="font-heading font-bold text-foreground">{sectionLabels[item.key] || item.key}</span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{item.key}</span>
        </div>
        {dirty && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Unsaved</span>}
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          {/* Simple fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            {simpleFields.map(([key, value]) => renderField(key, value))}
          </div>
          {/* Array fields */}
          {arrayFields.map(([key, value]) => renderField(key, value))}
          {/* Save button */}
          <div className="pt-2">
            <Button onClick={handleSave} disabled={saving || !dirty} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products, loading: productsLoading, refetch: refetchProducts } = useProducts();
  const { data: siteContent, loading: contentLoading, updateContent } = useAllSiteContent();

  useEffect(() => { checkAuth(); }, []);

  useEffect(() => {
    if (authenticated) {
      if (activeTab === "messages") fetchMessages();
      if (activeTab === "waitlist") fetchWaitlist();
    }
  }, [authenticated, activeTab]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { await supabase.auth.signOut(); navigate("/admin/login"); return; }
    setAuthenticated(true);
    setLoading(false);
  };

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  const fetchWaitlist = async () => {
    const { data } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false });
    if (data) setWaitlist(data);
  };

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from("contact_messages").update({ read: !current }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !current } : m)));
  };

  const deleteWaitlistEntry = async (id: string) => {
    await supabase.from("waitlist").delete().eq("id", id);
    setWaitlist((prev) => prev.filter((w) => w.id !== id));
    toast({ title: "Entry removed" });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { slug, name, tagline, description, price } = newProduct;
    if (!slug.trim() || !name.trim() || !price.trim()) {
      toast({ title: "Missing fields", description: "Slug, name, and price are required.", variant: "destructive" });
      return;
    }
    setAddingProduct(true);
    try {
      const { error } = await supabase.from("products").insert({
        slug: slug.trim(), name: name.trim(), tagline: tagline.trim(), description: description.trim(),
        image_url: newProduct.image_url.trim() || "/placeholder.svg", edition: newProduct.edition.trim(),
        status: newProduct.status, price: price.trim(), specs: [], full_specs: [], features: [], materials: [],
      } as any);
      if (error) {
        if (error.code === "23505") toast({ title: "Slug already exists", description: "Use a unique slug.", variant: "destructive" });
        else throw error;
      } else {
        toast({ title: "Product added! 🎉" });
        setNewProduct(emptyProduct);
        setShowAddForm(false);
        refetchProducts();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setAddingProduct(false);
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product deleted" }); refetchProducts(); }
  };

  const handleSaveContent = async (key: string, content: Record<string, any>) => {
    const { error } = await updateContent(key, content);
    if (error) toast({ title: "Error saving", description: (error as any).message, variant: "destructive" });
    else toast({ title: "Content saved! ✅" });
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin/login"); };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;

  const tabs: { key: Tab; label: string; icon: typeof Mail; count?: number }[] = [
    { key: "messages", label: "Messages", icon: Mail, count: messages.filter((m) => !m.read).length },
    { key: "waitlist", label: "Waitlist", icon: Users, count: waitlist.length },
    { key: "products", label: "Products", icon: Package, count: products.length },
    { key: "content", label: "Site Content", icon: FileText, count: siteContent.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin Dashboard – Aroip" description="Manage your Aroip website content." />

      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-heading text-xl font-bold"><span className="text-foreground">ARO</span><span className="text-primary">IP</span></span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold ml-2">Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2"><LogOut className="w-4 h-4" /> Logout</Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading">Contact Messages</h2>
            {messages.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No messages yet.</div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`glass-card rounded-xl p-5 ${!msg.read ? "border-l-4 border-l-primary" : ""}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground text-sm">{msg.name}</span>
                          <span className="text-xs text-muted-foreground">{msg.email}</span>
                          {!msg.read && <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">New</span>}
                        </div>
                        {msg.subject && <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>}
                        <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{new Date(msg.created_at).toLocaleString()}</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleRead(msg.id, msg.read)} title={msg.read ? "Mark unread" : "Mark read"}>
                        {msg.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Waitlist Tab */}
        {activeTab === "waitlist" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading">Waitlist Entries</h2>
            {waitlist.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No waitlist entries yet.</div>
            ) : (
              <div className="glass-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Email</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">Date</th>
                      <th className="px-5 py-3 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((entry) => (
                      <tr key={entry.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-3 text-sm text-foreground">{entry.email}</td>
                        <td className="px-5 py-3 text-sm text-muted-foreground">{new Date(entry.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3"><Button variant="ghost" size="sm" onClick={() => deleteWaitlistEntry(entry.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground font-heading">Products</h2>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2">
                {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showAddForm ? "Cancel" : "Add Product"}
              </Button>
            </div>
            {showAddForm && (
              <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleAddProduct} className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-bold text-lg text-foreground">New Product</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Slug *</label><input value={newProduct.slug} onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })} placeholder="my-product" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Name *</label><input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Tagline</label><input value={newProduct.tagline} onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })} placeholder="Short tagline" maxLength={150} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Price *</label><input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="$299" maxLength={20} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Image URL</label><input value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} placeholder="/products/image.png" maxLength={500} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Edition</label><input value={newProduct.edition} onChange={(e) => setNewProduct({ ...newProduct, edition: e.target.value })} placeholder="Limited to 500 units" maxLength={100} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-1 block">Status</label><select value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="coming-soon">Coming Soon</option><option value="available">Available</option><option value="sold-out">Sold Out</option></select></div>
                </div>
                <div><label className="text-sm font-medium text-foreground mb-1 block">Description</label><textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description..." maxLength={1000} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
                <Button type="submit" disabled={addingProduct} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">{addingProduct ? "Adding..." : "Add Product"}</Button>
              </motion.form>
            )}
            {productsLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : products.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No products yet. Add your first product!</div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  editingProductId === product.id ? (
                    <ProductEditor key={product.id} product={product} onSave={() => { setEditingProductId(null); refetchProducts(); }} onCancel={() => setEditingProductId(null)} />
                  ) : (
                    <div key={product.id} className="glass-card rounded-xl p-5">
                      <div className="flex items-center gap-4">
                        <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-16 h-16 object-contain rounded-lg bg-secondary/30 p-1" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm font-heading truncate">{product.name}</h3>
                          <p className="text-xs text-primary">{product.tagline}</p>
                          <div className="flex items-center gap-3 text-xs mt-1">
                            <span className="font-bold text-foreground">{product.price}</span>
                            <span className={`px-2 py-0.5 rounded-full ${product.status === "available" ? "bg-primary/10 text-primary" : product.status === "sold-out" ? "bg-destructive/10 text-destructive" : "bg-accent text-muted-foreground"}`}>{product.status}</span>
                            <span className="text-muted-foreground">{product.edition}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="sm" onClick={() => setEditingProductId(product.id)} className="gap-1.5">
                            <Pencil className="w-3.5 h-3.5" /> Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id, product.name)} className="text-destructive hover:text-destructive hover:bg-destructive/5">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Site Content Tab */}
        {activeTab === "content" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground font-heading">Site Content</h2>
              <p className="text-sm text-muted-foreground">Edit content for all pages and sections</p>
            </div>
            {contentLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : siteContent.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No content sections found.</div>
            ) : (
              <div className="space-y-3">
                {siteContent.map((item) => (
                  <ContentEditor key={item.key} item={item} onSave={handleSaveContent} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
