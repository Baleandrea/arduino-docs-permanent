import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const pinCategories = [
  {
    name: "Sensori Perimetrali",
    color: "bg-blue-50",
    pins: [
      {
        pin: "D8",
        component: "Sensore Finestra",
        type: "Input",
        protocol: "Digitale",
        state: "LOW=Chiuso, HIGH=Aperto",
        description: "Contatto magnetico NC per rilevamento apertura finestra. Protezione anti-mascheramento integrata.",
        function: "Trigger transizione Stato 4→5 (Ritardo Intrusione)"
      },
      {
        pin: "A3",
        component: "Sensore Porta",
        type: "Input",
        protocol: "Digitale",
        state: "LOW=Chiuso, HIGH=Aperto",
        description: "Contatto magnetico NC per rilevamento apertura porta principale. Priorità assoluta nel sistema.",
        function: "Trigger transizione Stato 4→5 (Ritardo Intrusione)"
      }
    ]
  },
  {
    name: "Feedback Visivo (LED)",
    color: "bg-green-50",
    pins: [
      {
        pin: "D6",
        component: "LED Rosso (Allarme)",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Indicatore visivo dello stato di allarme. Lampeggia a frequenze diverse in base allo stato del sistema.",
        function: "Stato 5: 1Hz (5% duty) | Stato 6: 6Hz (50% duty)"
      },
      {
        pin: "D7",
        component: "LED Verde (Stato)",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Indicatore visivo dello stato operativo. Acceso fisso in Stato 0 e Stato 4, lampeggiante in Stato 2 e 3.",
        function: "Stato 0: Fisso | Stato 2: 2Hz | Stato 3: 1Hz | Stato 4: Fisso"
      }
    ]
  },
  {
    name: "Feedback Acustico",
    color: "bg-yellow-50",
    pins: [
      {
        pin: "A2",
        component: "Sirena/Buzzer",
        type: "Output",
        protocol: "Digitale (PWM)",
        state: "LOW=Silenzio, HIGH=Suono",
        description: "Segnalatore acustico a tre livelli. Implementa protocollo di allarme progressivo.",
        function: "Stato 3: 1Hz (5% duty) | Stato 5: 1Hz (5% duty) | Stato 6: 6Hz (50% duty)"
      }
    ]
  },
  {
    name: "Illuminazione Crepuscolare",
    color: "bg-orange-50",
    pins: [
      {
        pin: "A0",
        component: "Sensore LDR",
        type: "Input",
        protocol: "Analogico (10-bit)",
        state: "0-1023 (luminosità ambientale)",
        description: "Fotoresistenza per rilevamento luminosità. Implementa controllo isteresi a due soglie.",
        function: "Soglia ON: 150 | Soglia OFF: 250 | Isteresi: 100"
      },
      {
        pin: "D2",
        component: "LED Lampione 1",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Controllo illuminazione zona 1. Attivato da logica crepuscolare.",
        function: "Acceso quando LDR < 150 e spento quando LDR > 250"
      },
      {
        pin: "D3",
        component: "LED Lampione 2",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Controllo illuminazione zona 2. Attivato da logica crepuscolare.",
        function: "Acceso quando LDR < 150 e spento quando LDR > 250"
      },
      {
        pin: "D4",
        component: "LED Lampione 3",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Controllo illuminazione zona 3. Attivato da logica crepuscolare.",
        function: "Acceso quando LDR < 150 e spento quando LDR > 250"
      },
      {
        pin: "D5",
        component: "LED Luce Esterna",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Spento, HIGH=Acceso",
        description: "Controllo illuminazione generale esterna. Attivato da logica crepuscolare.",
        function: "Acceso quando LDR < 150 e spento quando LDR > 250"
      }
    ]
  },
  {
    name: "RFID (SPI)",
    color: "bg-purple-50",
    pins: [
      {
        pin: "D9",
        component: "RFID RST",
        type: "Output",
        protocol: "Digitale",
        state: "LOW=Reset, HIGH=Normal",
        description: "Pin di reset per il modulo RC522. Gestisce il ciclo di inizializzazione.",
        function: "Controllo del ciclo di vita del lettore RFID"
      },
      {
        pin: "D10",
        component: "RFID SS (SDA)",
        type: "Output",
        protocol: "SPI (Slave Select)",
        state: "LOW=Selezionato, HIGH=Non selezionato",
        description: "Chip Select per la comunicazione SPI. Attivo basso.",
        function: "Selezione del dispositivo RC522 sul bus SPI"
      },
      {
        pin: "D11",
        component: "RFID MOSI",
        type: "Output",
        protocol: "SPI (Hardware)",
        state: "0-5V (dati)",
        description: "Master Out Slave In. Trasmissione dati da Arduino a RC522.",
        function: "Invio comandi e dati al lettore RFID"
      },
      {
        pin: "D12",
        component: "RFID MISO",
        type: "Input",
        protocol: "SPI (Hardware)",
        state: "0-5V (dati)",
        description: "Master In Slave Out. Ricezione dati da RC522 verso Arduino.",
        function: "Ricezione dati UID e stato dal lettore RFID"
      },
      {
        pin: "D13",
        component: "RFID SCK",
        type: "Output",
        protocol: "SPI (Hardware)",
        state: "Clock 10 MHz",
        description: "Serial Clock per sincronizzazione SPI. Frequenza 10 MHz.",
        function: "Sincronizzazione comunicazione SPI con RC522"
      }
    ]
  },
  {
    name: "Display LCD (I2C)",
    color: "bg-cyan-50",
    pins: [
      {
        pin: "A4",
        component: "Display LCD (SDA)",
        type: "I2C",
        protocol: "I2C (Data)",
        state: "0-5V (dati)",
        description: "Linea dati I2C per comunicazione con display LCD 16×2. Indirizzo 0x27.",
        function: "Trasmissione dati di visualizzazione al display"
      },
      {
        pin: "A5",
        component: "Display LCD (SCL)",
        type: "I2C",
        protocol: "I2C (Clock)",
        state: "100 kHz (clock)",
        description: "Linea clock I2C per sincronizzazione. Frequenza standard 100 kHz.",
        function: "Sincronizzazione comunicazione I2C con display"
      }
    ]
  },
  {
    name: "Controllo Utente",
    color: "bg-red-50",
    pins: [
      {
        pin: "A1",
        component: "Pulsante Avvio",
        type: "Input",
        protocol: "Digitale",
        state: "LOW=Non premuto, HIGH=Premuto",
        description: "Pulsante di comando per armamento/disarmo. Implementa edge detection per evitare rimbalzi.",
        function: "Trigger transizione Stato 0→2 (Attesa RFID) o Stato 0→1 (Errore)"
      }
    ]
  }
];

export default function CompletePinLegend() {
  return (
    <section id="pin-legend" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Legenda Completa dei 18 Pin
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Mappatura dettagliata di tutti i pin Arduino utilizzati nel sistema, con descrizioni tecniche, 
            stati logici, protocolli di comunicazione e funzioni specifiche.
          </p>
        </div>

        {/* Pin Categories Tabs */}
        <Tabs defaultValue="Sensori Perimetrali" className="mb-12">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6 justify-start bg-transparent p-0">
            {pinCategories.map((cat) => (
              <TabsTrigger key={cat.name} value={cat.name} className="text-xs md:text-sm rounded-md border border-border bg-background data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {pinCategories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="space-y-4">
                {category.pins.map((pin, idx) => (
                  <Card key={idx} className={`p-6 border-2 border-border ${category.color}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div>
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-4xl font-bold text-primary opacity-40">{pin.pin}</span>
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{pin.component}</h3>
                              <p className="text-xs text-muted-foreground uppercase">{pin.type} • {pin.protocol}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Stato Logico</p>
                            <p className="font-mono text-sm bg-background px-3 py-2 rounded text-foreground">
                              {pin.state}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Funzione</p>
                            <p className="font-mono text-sm bg-background px-3 py-2 rounded text-foreground">
                              {pin.function}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Descrizione Tecnica</p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {pin.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary Table */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Tabella Riepilogativa Completa</h3>
          <Card className="p-6 border border-border">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Pin</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Componente</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Tipo</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Protocollo</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Categoria</th>
                </tr>
              </thead>
              <tbody>
                {pinCategories.map((category) =>
                  category.pins.map((pin, idx) => (
                    <tr key={`${category.name}-${idx}`} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="font-mono font-bold">{pin.pin}</Badge>
                      </td>
                      <td className="py-3 px-4 font-semibold text-foreground">{pin.component}</td>
                      <td className="py-3 px-4 text-muted-foreground">{pin.type}</td>
                      <td className="py-3 px-4 text-muted-foreground">{pin.protocol}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{category.name}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Pin Digitali</p>
            <p className="text-3xl font-bold text-primary">13</p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Pin Analogici</p>
            <p className="text-3xl font-bold text-primary">3</p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Protocolli</p>
            <p className="text-3xl font-bold text-primary">3</p>
            <p className="text-xs text-muted-foreground mt-1">SPI, I2C, Digitale</p>
          </Card>
          <Card className="p-4 border border-border">
            <p className="text-xs text-muted-foreground uppercase mb-2">Categorie</p>
            <p className="text-3xl font-bold text-primary">7</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
