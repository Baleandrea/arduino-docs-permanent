import { Card } from "@/components/ui/card";

export default function IntroductionSection() {
  return (
    <section id="intro" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Relazione Tecnica: Sistema Antifurto e Illuminazione Domotica
          </h2>
          
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              Questo documento presenta un'analisi tecnica approfondita di un sistema di sicurezza integrato 
              basato su microcontrollore Arduino. Il sistema implementa una <span className="font-semibold text-foreground">macchina a stati finiti deterministica</span> (FSM) 
              composta da sette stati logici, dove ogni transizione è governata da condizioni esplicite derivanti 
              da input sensoriali e comandi dell'operatore.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <Card className="p-6 border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">7</div>
                <p className="text-sm font-semibold text-foreground mb-1">Stati Logici</p>
                <p className="text-xs text-muted-foreground">Macchina a stati finiti deterministica</p>
              </Card>
              <Card className="p-6 border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">16</div>
                <p className="text-sm font-semibold text-foreground mb-1">Pin Configurati</p>
                <p className="text-xs text-muted-foreground">Sensori, attuatori e interfacce</p>
              </Card>
              <Card className="p-6 border border-border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="text-sm font-semibold text-foreground mb-1">Protocolli</p>
                <p className="text-xs text-muted-foreground">SPI, I2C, Digitale/Analogico</p>
              </Card>
            </div>

            <div className="bg-secondary border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Obiettivi della Relazione</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">1.</span>
                  <span className="text-foreground">Analizzare l'architettura della FSM con descrizione dettagliata dei 7 stati e delle transizioni</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">2.</span>
                  <span className="text-foreground">Documentare le specifiche hardware e il pin mapping completo</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">3.</span>
                  <span className="text-foreground">Illustrare le tecniche di programmazione avanzata (multitasking cooperativo, isteresi, autenticazione)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">4.</span>
                  <span className="text-foreground">Analizzare la robustezza e l'affidabilità del sistema</span>
                </li>
              </ul>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
