import { Card } from "@/components/ui/card";

const pinData = [
  { pin: "D2-D5", component: "LED Lampioni", type: "Output", description: "Illuminazione esterna (4 zone)" },
  { pin: "D6", component: "LED Rosso", type: "Output", description: "Indicatore allarme/intrusione" },
  { pin: "D7", component: "LED Verde", type: "Output", description: "Indicatore stato sistema" },
  { pin: "D8", component: "Sensore Finestra", type: "Input", description: "Contatto magnetico" },
  { pin: "D9-D13", component: "RFID RC522", type: "SPI", description: "Lettore badge RFID" },
  { pin: "A0", component: "Sensore LDR", type: "Analogico", description: "Fotoresistenza luminosità" },
  { pin: "A1", component: "Pulsante Avvio", type: "Input", description: "Pulsante per armamento" },
  { pin: "A2", component: "Sirena", type: "Output", description: "Segnalatore acustico" },
  { pin: "A3", component: "Sensore Porta", type: "Input", description: "Contatto magnetico porta" },
  { pin: "SDA/SCL", component: "Display LCD I2C", type: "I2C", description: "Display 16x2 (0x27)" },
];

const typeColors: Record<string, string> = {
  Output: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  Input: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  SPI: "bg-violet-500/20 text-violet-700 dark:text-violet-400",
  Analogico: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
  I2C: "bg-rose-500/20 text-rose-700 dark:text-rose-400",
};

export default function HardwareSection() {
  return (
    <section id="hardware" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Architettura Hardware
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Il sistema utilizza una varietà di sensori e attuatori collegati ai pin digitali e analogici di Arduino. 
            La seguente tabella illustra la mappatura completa dei pin, essenziale per il cablaggio e la manutenzione dell'hardware.
          </p>
        </div>

        {/* Pin Table */}
        <div className="grid gap-4 mb-12">
          {pinData.map((item, idx) => (
            <Card key={idx} className="p-4 border border-border hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-bold text-primary text-lg">{item.pin}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${typeColors[item.type] || "bg-gray-100"}`}>
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.component}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* System Architecture */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">Schema dell'Architettura</h3>
          <div className="rounded-lg overflow-hidden shadow-lg bg-white p-8">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663507564771/VmjbmMBUAguN4P2X5ebQ87/system_architecture-oF3ZJSKPRPtDSNAdtv7EUm.webp"
              alt="System Architecture"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
