import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative inline-block mb-8"
          >
            <span
              className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none text-primary/10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Page Not <span className="text-gradient italic">Found</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-3">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Show the attempted URL */}
          <div className="inline-flex items-center gap-2 bg-secondary/60 px-4 py-2 rounded-xl mb-8">
            <Search className="w-4 h-4 text-muted-foreground" />
            <code className="text-sm text-muted-foreground font-mono break-all">
              {location.pathname}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="rounded-lg gap-2 w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                View Products
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Perhaps you were looking for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Products", to: "/products" },
                { label: "About", to: "/about" },
                { label: "Our Story", to: "/our-story" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
