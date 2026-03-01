import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast({ title: "Access denied", description: "You don't have admin privileges.", variant: "destructive" });
        setLoading(false);
        return;
      }

      toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message || "Invalid credentials.", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <SEO title="Admin Login – Aroip" description="Admin login panel for Aroip dashboard." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-heading text-2xl font-bold">
              <span className="text-foreground">ARO</span>
              <span className="text-primary">IP</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-heading">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aroip.com"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg">
            <Lock className="w-4 h-4 mr-2" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
