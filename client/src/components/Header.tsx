import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  onNavClick: (section: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();

  const navItems = [
    { label: "Introduzione", id: "intro" },
    { label: "FSM Analysis", id: "fsm-analysis" },
    { label: "Hardware", id: "hardware-specs" },
    { label: "Sensori & Feedback", id: "hardware-enhanced" },
    { label: "Pin Legend", id: "pin-legend" },
    { label: "Tecniche Avanzate", id: "advanced-techniques" },
    { label: "Configurazione", id: "config" },
  ];

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">⚡</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Arduino Security</h1>
            <p className="text-xs text-muted-foreground">Technical Documentation</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle - Desktop */}
        {switchable && toggleTheme && (
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded-lg transition-colors hidden sm:block"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Passa a tema chiaro" : "Passa a tema scuro"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        )}

        {/* Theme Toggle - Mobile (Larger) */}
        {switchable && toggleTheme && (
          <button
            onClick={toggleTheme}
            className="md:hidden p-3 hover:bg-secondary rounded-lg transition-colors mr-2"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Passa a tema chiaro" : "Passa a tema scuro"}
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-slate-700" />
            )}
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-secondary rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
