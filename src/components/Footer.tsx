const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-heading text-xl font-bold text-foreground">
            ARO<span className="text-primary">IP</span>
          </a>
          <div className="flex items-center gap-8">
            {["Products", "Innovation", "About", "Careers", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Aroip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
