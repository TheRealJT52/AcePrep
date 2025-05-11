import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Rocket, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-neutral-100 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-primary/20 p-2 rounded-md mr-3 group-hover:bg-primary/30 transition-colors">
                <Rocket className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-center">
                <span className="font-heading font-bold text-xl text-primary glow-primary mr-1">Ace</span>
                <span className="font-heading font-bold text-xl text-neutral-400">Prep</span>
                <Sparkles className="h-4 w-4 text-accent ml-1" />
              </div>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`${
                  location === link.href 
                    ? "text-primary font-medium" 
                    : "text-neutral-400 hover:text-primary"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="secondary" size="sm" className="ml-4">
              Sign In
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-neutral-400" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-100/90 backdrop-blur-md border-t border-neutral-200/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === link.href
                    ? "text-primary bg-primary-light"
                    : "text-neutral-400 hover:text-primary hover:bg-primary-light"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-3">
              <Button variant="secondary" size="sm" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
