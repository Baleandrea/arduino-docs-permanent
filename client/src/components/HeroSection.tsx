export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-blue-900 py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="90" cy="90" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Arduino Security System
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Documentazione tecnica completa per il sistema antifurto e illuminazione domotica basato su Arduino. 
            Scopri l'architettura hardware, la logica della macchina a stati e le guide alla configurazione.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById("hardware")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Scopri di più
            </button>
            <button
              onClick={() => document.getElementById("fsm")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors"
            >
              Logica del Sistema
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-2xl font-bold text-accent">7</div>
              <p className="text-sm text-primary-foreground/80">Stati del Sistema</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">18</div>
              <p className="text-sm text-primary-foreground/80">Pin Utilizzati</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">3</div>
              <p className="text-sm text-primary-foreground/80">Protocolli</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Right side */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 md:opacity-40">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663507564771/VmjbmMBUAguN4P2X5ebQ87/hero_arduino_security-UfH9DBny4VPgkCRG7VqfNn.webp"
          alt="Arduino Board"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
