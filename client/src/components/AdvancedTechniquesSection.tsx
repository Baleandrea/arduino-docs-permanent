import { AlertCircle, Lock, Zap, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AdvancedTechniquesSection() {
  return (
    <section id="advanced-techniques" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecniche di Programmazione Avanzata
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Analisi dettagliata delle strategie implementative che garantiscono <span className="font-semibold">multitasking cooperativo</span>, 
            <span className="font-semibold"> controllo dell'isteresi</span> e <span className="font-semibold">sicurezza dell'autenticazione</span>.
          </p>
        </div>

        {/* Multitasking Cooperativo */}
        <div className="mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4 mb-6">
              <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Multitasking Cooperativo con millis()</h3>
                <p className="text-muted-foreground">
                  Sostituzione di delay() con polling asincrono basato su timestamp per garantire reattività del sistema
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Anti-pattern */}
              <div className="p-4 bg-red-50 border border-red-200 rounded" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
                <h4 className="font-bold mb-3" style={{ color: '#991b1b' }}>Anti-pattern: delay()</h4>
                <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto mb-3">
{`void loop() {
  delay(1000); // Blocca tutto
  leggiSensore();
  delay(500);
  aggiornaLED();
  // Sistema non reattivo
}`}
                </pre>
              </div>

              {/* Correct pattern */}
              <div className="p-4 bg-green-50 border border-green-200 rounded" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h4 className="font-bold mb-3" style={{ color: '#166534' }}>Soluzione: millis()</h4>
                <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto mb-3">
{`unsigned long ultimoCheck = 0;
void loop() {
  if (millis() - ultimoCheck > 1000) {
    leggiSensore();
    ultimoCheck = millis();
  }
  aggiornaLED(); // Non bloccato
}`}
                </pre>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
              <h4 className="font-bold mb-2" style={{ color: '#1a1a1a' }}>Vantaggi del Multitasking Cooperativo</h4>
              <ul className="text-sm space-y-2" style={{ color: '#4a4a4a' }}>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Il microcontrollore esegue <strong>migliaia di iterazioni al secondo</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Polling dei sensori <strong>costante e asincrono</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Reattività garantita <strong>&lt; 10 ms</strong> agli eventi RFID</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>Nessun blocco del sistema durante operazioni I/O</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Controllo Isteresi */}
        <div className="mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Controllo Isteresi per Illuminazione Crepuscolare</h3>
                <p className="text-muted-foreground">
                  Meccanismo a due soglie per evitare oscillazioni spurie (chattering) nei relè/luci
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Problem */}
              <div className="p-4 bg-red-50 border border-red-200 rounded" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
                <h4 className="font-bold mb-3" style={{ color: '#991b1b' }}>Problema: Singola Soglia</h4>
                <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto mb-3">
{`if (ldr < 200) accendi();
if (ldr >= 200) spegni();

// LDR oscilla: 198, 202, 199, 201
// Risultato: Commutazioni continue
// Usura relè, consumo energetico`}
                </pre>
              </div>

              {/* Solution */}
              <div className="p-4 bg-green-50 border border-green-200 rounded" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h4 className="font-bold mb-3" style={{ color: '#166534' }}>Soluzione: Isteresi a Due Soglie</h4>
                <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto mb-3">
{`#define SOGLIA_ON  150
#define SOGLIA_OFF 250

if (!lampioni && ldr < 150)
  lampioni = true;
else if (lampioni && ldr > 250)
  lampioni = false;`}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
              <p className="text-sm mb-2" style={{ color: '#1a1a1a' }}>
                <span className="font-bold">Isteresi = 250 - 150 = 100</span>
              </p>
              <p className="text-sm" style={{ color: '#4a4a4a' }}>
                Nella banda <strong>150-250</strong>, lo stato rimane invariato (memoria dello stato precedente). 
                Questo elimina le <strong>oscillazioni spurie</strong> e garantisce una <strong>commutazione stabile</strong>.
              </p>
            </div>
          </Card>
        </div>

        {/* Protocollo RFID e Sicurezza */}
        <div className="mb-12">
          <Card className="p-8 border border-border">
            <div className="flex items-start gap-4 mb-6">
              <Lock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Protocollo RFID e Autenticazione</h3>
                <p className="text-muted-foreground">
                  Verifica dell'UID a 4 byte tramite lettore RC522 con implementazione di timeout e retry logic
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-4">Flusso di Autenticazione</h4>
                <ol className="text-sm space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>RC522 entra in polling asincrono</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>Badge rilevato → Lettura UID (4 byte)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>Confronto con UID_OK memorizzato</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>Se match → Transizione di stato</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">5.</span>
                    <span>Timeout RFID: 10 secondi (fallback)</span>
                  </li>
                </ol>
              </Card>

              <Card className="p-6 border border-border">
                <h4 className="font-bold text-foreground mb-4">Parametri Critici</h4>
                <div className="text-sm space-y-3 text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">UID_OK:</span>
                    <code className="block bg-background px-2 py-1 rounded mt-1 font-mono text-xs">0x12, 0x34, 0x56, 0x78</code>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Timeout RFID:</span>
                    <span className="block">10 secondi (ritorno a Stato 0)</span>
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Velocità SPI:</span>
                    <span className="block">10 MHz (default libreria MFRC522)</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d' }}>
              <h4 className="font-bold mb-3" style={{ color: '#92400e' }}>Considerazioni di Sicurezza RFID</h4>
              <ul className="text-sm space-y-2" style={{ color: '#78350f' }}>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>L'UID è trasmesso <strong>in chiaro</strong> e non rappresenta una protezione crittografica</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Sufficiente per applicazioni di <strong>controllo d'accesso locale</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Per maggiore sicurezza: implementare <strong>crittografia tramite librerie dedicate</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Considerare <strong>autenticazione a challenge-response</strong> per sistemi critici</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Additional Robustness Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4">Gestione della Memoria</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Utilizzo della macro <code className="bg-background px-1 rounded text-xs font-mono">F()</code> per memorizzare 
              stringhe nella flash memory (PROGMEM) anziché nella RAM limitata.
            </p>
            <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
{`// ✓ Corretto: Stringa in flash
Serial.println(F("Sistema armato"));

// ✗ Errato: Stringa in RAM
Serial.println("Sistema armato");`}
            </pre>
          </Card>

          <Card className="p-6 border border-border">
            <h3 className="font-bold text-foreground mb-4">Edge Detection del Pulsante</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Rilevamento di transizioni di stato (LOW→HIGH) per evitare letture multiple del medesimo press.
            </p>
            <pre className="bg-background p-3 rounded text-xs font-mono text-foreground overflow-x-auto">
{`bool statoPrec = HIGH;
if (pulsante == LOW && statoPrec == HIGH) {
  // Pressione rilevata
  statoPrec = LOW;
} else if (pulsante == HIGH) {
  statoPrec = HIGH;
}`}
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}
