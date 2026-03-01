import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, LogOut, Mail, Users, Package, Eye, EyeOff, Trash2, Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProducts, DBProduct } from "@/hooks/use-products";
import SEO from "@/components/SEO";

type Tab = "messages" | "waitlist" | "products";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

const emptyProduct = {
  slug: "", name: "", tagline: "", description: "", image_url: "", edition: "", status: "coming-soon", price: "",
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { products, loading: productsLoading, refetch: refetchProducts } = useProducts();

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
        slug: slug.trim(),
        name: name.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        image_url: newProduct.image_url.trim() || "/placeholder.svg",
        edition: newProduct.edition.trim(),
        status: newProduct.status,
        price: price.trim(),
        specs: [],
        full_specs: [],
        features: [],
        materials: [],
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
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      refetchProducts();
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin/login"); };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-pulse text-muted-foreground">Loading...</div></div>;

  const tabs: { key: Tab; label: string; icon: typeof Mail; count?: number }[] = [
    { key: "messages", label: "Messages", icon: Mail, count: messages.filter((m) => !m.read).length },
    { key: "waitlist", label: "Waitlist", icon: Users, count: waitlist.length },
    { key: "products", label: "Products", icon: Package, count: products.length },
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
                        <td className="px-5 py-3">
                          <Button variant="ghost" size="sm" onClick={() => deleteWaitlistEntry(entry.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </td>
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

            {/* Add Product Form */}
            {showAddForm && (
              <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleAddProduct} className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-heading font-bold text-lg text-foreground">New Product</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Slug *</label>
                    <input value={newProduct.slug} onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })} placeholder="my-product" maxLength={100}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                    <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" maxLength={100}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Tagline</label>
                    <input value={newProduct.tagline} onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })} placeholder="Short tagline" maxLength={150}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Price *</label>
                    <input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="$299" maxLength={20}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Image URL</label>
                    <input value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} placeholder="/products/image.png or https://..." maxLength={500}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Edition</label>
                    <input value={newProduct.edition} onChange={(e) => setNewProduct({ ...newProduct, edition: e.target.value })} placeholder="Limited to 500 units" maxLength={100}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Status</label>
                    <select value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option value="coming-soon">Coming Soon</option>
                      <option value="available">Available</option>
                      <option value="sold-out">Sold Out</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                  <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product description..." maxLength={1000} rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <Button type="submit" disabled={addingProduct} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                  {addingProduct ? "Adding..." : "Add Product"}
                </Button>
              </motion.form>
            )}

            {/* Product List */}
            {productsLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : products.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No products yet. Add your first product!</div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div key={product.id} className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <img src={product.image_url || "/placeholder.svg"} alt={product.name} className="w-16 h-16 object-contain rounded-lg bg-secondary/30 p-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm font-heading truncate">{product.name}</h3>
                        <p className="text-xs text-primary">{product.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-foreground">{product.price}</span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        product.status === "available" ? "bg-primary/10 text-primary" :
                        product.status === "sold-out" ? "bg-destructive/10 text-destructive" :
                        "bg-accent text-muted-foreground"
                      }`}>{product.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{product.edition}</p>
                    <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id, product.name)} className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 gap-2">
                      <Trash2 className="w-3.5 h-3.5" /> Delete Product
                    </Button>
                  </div>
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
