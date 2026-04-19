import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const hardwareSpecs = [
  {
    category: "Sensori Perimetrali",
    items: [
      { pin: "D8", component: "Sensore Finestra", mode: "Input", protocol: "Digitale (Contatto NC)", function: "Rilevamento apertura finestra" },
      { pin: "A3", component: "Sensore Porta", mode: "Input", protocol: "Digitale (Contatto NC)", function: "Rilevamento apertura porta principale" },
    ]
  },
  {
    category: "Feedback HMI",
    items: [
      { pin: "D6", component: "LED Rosso", mode: "Output", protocol: "Digitale", function: "Indicatore visivo allarme/intrusione" },
      { pin: "D7", component: "LED Verde", mode: "Output", protocol: "Digitale", function: "Indicatore visivo stato sistema" },
      { pin: "A2", component: "Sirena", mode: "Output", protocol: "Digitale (PWM)", function: "Segnalatore acustico allarme" },
    ]
  },
  {
    category: "Illuminazione Crepuscolare",
    items: [
      { pin: "A0", component: "Sensore LDR", mode: "Input", protocol: "Analogico (10-bit)", function: "Rilevamento luminosità ambientale" },
      { pin: "D2", component: "LED Lampione 1", mode: "Output", protocol: "Digitale", function: "Controllo illuminazione zona 1" },
      { pin: "D3", component: "LED Lampione 2", mode: "Output", protocol: "Digitale", function: "Controllo illuminazione zona 2" },
      { pin: "D4", component: "LED Lampione 3", mode: "Output", protocol: "Digitale", function: "Controllo illuminazione zona 3" },
      { pin: "D5", component: "LED Luce Esterna", mode: "Output", protocol: "Digitale", function: "Controllo illuminazione generale" },
    ]
  },
  {
    category: "Interfacce di Comunicazione",
    items: [
      { pin: "D9", component: "RFID RST", mode: "Output", protocol: "Digitale", function: "Pin Reset modulo RC522" },
      { pin: "D10", component: "RFID SS (SDA)", mode: "Output", protocol: "SPI (Slave Select)", function: "Chip Select comunicazione RFID" },
      { pin: "D11", component: "RFID MOSI", mode: "Output", protocol: "SPI (Hardware)", function: "Master Out Slave In (RC522)" },
      { pin: "D12", component: "RFID MISO", mode: "Input", protocol: "SPI (Hardware)", function: "Master In Slave Out (RC522)" },
      { pin: "D13", component: "RFID SCK", mode: "Output", protocol: "SPI (Hardware)", function: "Serial Clock (RC522)" },
      { pin: "A4", component: "Display LCD (SDA)", mode: "I2C", protocol: "I2C (Data)", function: "Comunicazione display LCD 16x2" },
      { pin: "A5", component: "Display LCD (SCL)", mode: "I2C", protocol: "I2C (Clock)", function: "Comunicazione display LCD 16x2" },
    ]
  },
  {
    category: "Controllo Utente",
    items: [
      { pin: "A1", component: "Pulsante Avvio", mode: "Input", protocol: "Digitale", function: "Comando di armamento/disarmo" },
    ]
  },
];

export default function HardwareSpecsSection() {
  return (
    <section id="hardware-specs" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Specifiche Hardware e Pin Mapping
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Mappatura completa dei pin Arduino utilizzati nel sistema, con dettagli su modalità di funzionamento, 
            protocolli di comunicazione e funzioni specifiche di ogni componente.
          </p>
        </div>

        {/* Tabbed Hardware Specs */}
        <Tabs defaultValue="Sensori Perimetrali" className="mb-12">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 justify-start bg-transparent p-0">
            {hardwareSpecs.map((spec) => (
              <TabsTrigger key={spec.category} value={spec.category} className="text-xs md:text-sm rounded-md border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5">
                {spec.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {hardwareSpecs.map((spec) => (
            <TabsContent key={spec.category} value={spec.category}>
              <div className="space-y-3">
                {spec.items.map((item, idx) => (
                  <Card key={idx} className="p-4 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Pin</p>
                        <p className="font-mono font-bold text-primary">{item.pin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Componente</p>
                        <p className="font-semibold text-foreground">{item.component}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Modalità</p>
                        <p className="text-sm text-foreground">{item.mode}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Protocollo</p>
                        <p className="text-sm text-foreground">{item.protocol}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">Funzione</p>
                        <p className="text-sm text-foreground">{item.function}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Communication Protocols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4">Interfaccia SPI (RFID RC522)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Il lettore RFID comunica tramite il protocollo SPI hardware, operante a 10 MHz.
            </p>
            <div className="space-y-2 text-sm font-mono bg-secondary p-3 rounded">
              <p className="text-foreground">D10 (SS): Slave Select</p>
              <p className="text-foreground">D11 (MOSI): Master Out</p>
              <p className="text-foreground">D12 (MISO): Master In</p>
              <p className="text-foreground">D13 (SCK): Clock</p>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4">Interfaccia I2C (Display LCD)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Il display LCD 16×2 comunica tramite protocollo I2C a indirizzo 0x27.
            </p>
            <div className="space-y-2 text-sm font-mono bg-secondary p-3 rounded">
              <p className="text-foreground">A4 (SDA): Linea Dati</p>
              <p className="text-foreground">A5 (SCL): Linea Clock</p>
              <p className="text-foreground">Freq: 100 kHz</p>
              <p className="text-foreground">Addr: 0x27</p>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4">Sensori Perimetrali</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contatti magnetici normalmente chiusi (NC). Apertura = stato HIGH.
            </p>
            <div className="space-y-2 text-sm font-mono bg-secondary p-3 rounded">
              <p className="text-foreground">D8: Finestra</p>
              <p className="text-foreground">A3: Porta</p>
              <p className="text-foreground">Logica: LOW=Chiuso</p>
              <p className="text-foreground">HIGH=Aperto</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
