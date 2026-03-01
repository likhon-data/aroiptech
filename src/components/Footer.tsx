import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <a href="#" className="flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="font-heading text-lg font-bold">
              <span className="text-foreground">ARO</span>
              <span className="text-primary">IP</span>
            </span>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {["Products", "Sustainability", "Our Story", "Careers", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
            <Leaf className="w-3 h-3 text-primary" />
            © 2026 Aroip. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
