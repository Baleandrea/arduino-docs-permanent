import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">Arduino Security System</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Documentazione tecnica completa per un sistema antifurto e illuminazione domotica basato su Arduino. 
              Progettato per essere facilmente configurabile e mantenibile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Sezioni</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#intro" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Introduzione
                </a>
              </li>
              <li>
                <a href="#hardware" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Architettura Hardware
                </a>
              </li>
              <li>
                <a href="#fsm" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Logica FSM
                </a>
              </li>
              <li>
                <a href="#subsystems" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Sottosistemi
                </a>
              </li>
              <li>
                <a href="#config" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Configurazione
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-3">Risorse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.arduino.cc/en/Guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-2"
                >
                  Guida Arduino
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors flex items-center gap-2"
                >
                  GitHub
                  <Github className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-primary-foreground/70">
            <p>© 2026 Arduino Security System Documentation. Tutti i diritti riservati.</p>
            <p>Realizzato con ❤️ da Balestrino &amp; Giannini — ITIS, progetto Open Day 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
