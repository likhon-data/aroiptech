import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, LogOut, Mail, Users, Package, Eye, EyeOff, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (activeTab === "messages") fetchMessages();
      if (activeTab === "waitlist") fetchWaitlist();
    }
  }, [authenticated, activeTab]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      return;
    }
    setAuthenticated(true);
    setLoading(false);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  const fetchWaitlist = async () => {
    const { data } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof Mail; count?: number }[] = [
    { key: "messages", label: "Messages", icon: Mail, count: messages.filter((m) => !m.read).length },
    { key: "waitlist", label: "Waitlist", icon: Users, count: waitlist.length },
    { key: "products", label: "Products", icon: Package, count: products.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin Dashboard – Aroip" description="Manage your Aroip website content." />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-heading text-xl font-bold">
              <span className="text-foreground">ARO</span>
              <span className="text-primary">IP</span>
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold ml-2">Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
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
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
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
                      <th className="px-5 py-3 text-xs font-semibold uppercase text-muted-foreground w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((entry) => (
                      <tr key={entry.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-3 text-sm text-foreground">{entry.email}</td>
                        <td className="px-5 py-3 text-sm text-muted-foreground">{new Date(entry.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3">
                          <Button variant="ghost" size="sm" onClick={() => deleteWaitlistEntry(entry.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
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
            <h2 className="text-2xl font-bold text-foreground font-heading">Products (Static)</h2>
            <p className="text-sm text-muted-foreground">Products are managed as static data in the codebase.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.slug} className="glass-card rounded-xl p-5">
                  <div className="flex items-center gap-4 mb-3">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm font-heading">{product.name}</h3>
                      <p className="text-xs text-primary">{product.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{product.price}</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      product.status === "available" ? "bg-primary/10 text-primary" :
                      product.status === "sold-out" ? "bg-destructive/10 text-destructive" :
                      "bg-accent text-muted-foreground"
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{product.edition}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
