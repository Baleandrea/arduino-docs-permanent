import { Card } from "@/components/ui/card";
import { Lightbulb, Zap, Monitor } from "lucide-react";

const subsystems = [
  {
    title: "Illuminazione Crepuscolare Automatica",
    icon: Lightbulb,
    description:
      "Indipendentemente dallo stato dell'antifurto, il sistema monitora costantemente la luminosità ambientale tramite la fotoresistenza (LDR).",
    features: [
      "Accensione automatica quando luminosità < 150",
      "Spegnimento automatico quando luminosità > 250",
      "Isteresi per evitare oscillazioni",
      "Controllo di 4 zone di illuminazione",
    ],
  },
  {
    title: "Gestione Non Bloccante del Tempo",
    icon: Zap,
    description:
      "Una caratteristica fondamentale del software è l'assenza della funzione delay(). Tutte le temporizzazioni sono gestite tramite millis().",
    features: [
      "Nessun blocco del microcontrollore",
      "Lettura sensori sempre attiva",
      "Lampeggi LED gestiti in parallelo",
      "Messaggi display senza interruzioni",
    ],
  },
  {
    title: "Interfaccia Utente LCD",
    icon: Monitor,
    description:
      "Il display LCD I2C fornisce un feedback testuale chiaro in ogni fase del sistema.",
    features: [
      "Display 16x2 a indirizzo 0x27",
      "Messaggi temporanei con priorità",
      "Aggiornamento intelligente senza sfarfallii",
      "Feedback in tempo reale dello stato",
    ],
  },
];

export default function SubsystemsSection() {
  return (
    <section id="subsystems" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sottosistemi Ausiliari
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Oltre alla logica principale dell'antifurto, il sistema include diversi sottosistemi che lavorano 
            in parallelo per fornire funzionalità complete e affidabili.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subsystems.map((subsystem, idx) => {
            const Icon = subsystem.icon;
            return (
              <Card
                key={idx}
                className="p-8 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{subsystem.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{subsystem.description}</p>
                <ul className="space-y-3">
                  {subsystem.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8">Dettagli Tecnici Avanzati</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Gestione della Memoria
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Il codice utilizza la macro F() per le stringhe stampate su Serial e LCD, 
                conservando la memoria RAM limitata dei microcontrollori Arduino.
              </p>
              <code className="block bg-secondary p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
                Serial.print(F("..."))
              </code>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Comunicazione SPI
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Il lettore RFID RC522 comunica tramite il protocollo SPI hardware, garantendo 
                velocità e affidabilità nella lettura dei badge.
              </p>
              <code className="block bg-secondary p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
                SPI: D11(MOSI), D12(MISO), D13(SCK)
              </code>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Protocollo I2C
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Il display LCD utilizza il protocollo I2C per la comunicazione, riducendo il numero 
                di pin necessari e semplificando il cablaggio.
              </p>
              <code className="block bg-secondary p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
                I2C: SDA, SCL @ 0x27
              </code>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Lettura Analogica
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                La LDR è collegata a un pin analogico per monitorare la luminosità ambientale. 
                I valori vengono confrontati con soglie per controllare l'illuminazione.
              </p>
              <code className="block bg-secondary p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
                analogRead(LDR) → 0-1023
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
