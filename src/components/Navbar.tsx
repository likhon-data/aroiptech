import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Products", "Innovation", "About"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg w-full max-w-4xl">
        <a href="#" className="font-heading text-xl font-bold tracking-tight text-foreground">
          ARO<span className="text-gradient">IP</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <Button size="sm" className="hidden md:inline-flex bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold rounded-xl shadow-md text-xs px-5">
          Contact Us
        </Button>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-1">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 glass-card rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <Button size="sm" className="mt-2 bg-gradient-hero text-primary-foreground hover:opacity-90 font-heading font-semibold rounded-xl">
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
