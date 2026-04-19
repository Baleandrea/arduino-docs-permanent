import { Card } from "@/components/ui/card";
import { AlertTriangle, Radio, Zap } from "lucide-react";

export default function EnhancedHardwareSection() {
  return (
    <section id="hardware-enhanced" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sensori Perimetrali e Feedback di Stato
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Analisi tecnica approfondita dei sensori di intrusione e dei sistemi di feedback visivo, acustico e digitale.
          </p>
        </div>

        {/* Sensori Perimetrali */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Radio className="w-6 h-6 text-primary" />
            Sensori Perimetrali Avanzati
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sensore Finestra */}
            <Card className="p-6 border border-border note-section">
              <h4 className="text-lg font-bold text-foreground mb-4">Sensore Finestra (Pin D8)</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-2">Tecnologia di Rilevamento</p>
                  <p className="text-muted-foreground">
                    Contatto magnetico <span className="font-semibold">normalmente chiuso (NC)</span> con protezione 
                    anti-mascheramento. Il sensore implementa una logica digitale binaria: stato <span className="font-mono bg-secondary px-2 py-1 rounded">LOW</span> (finestra chiusa) 
                    e stato <span className="font-mono bg-secondary px-2 py-1 rounded">HIGH</span> (finestra aperta). La trasmissione del segnale avviene tramite 
                    polling asincrono, garantendo latenza di rilevamento &lt; 10 ms.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground mb-2">Analisi del Segnale</p>
                  <p className="text-muted-foreground">
                    Il microcontrollore interroga continuamente il pin D8 nel ciclo <span className="font-mono bg-secondary px-2 py-1 rounded">loop()</span>. 
                    Quando il contatto magnetico si separa (apertura finestra), il pin transisce da LOW a HIGH. 
                    Questa transizione attiva immediatamente la logica di transizione dello stato FSM verso lo Stato 5 (Ritardo Intrusione).
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground mb-2">Protezione Anti-Mascheramento</p>
                  <p className="text-muted-foreground">
                    Il sistema implementa un meccanismo di <span className="font-semibold">verifica continua dello stato iniziale</span>. 
                    Se il sensore è già aperto al momento dell'armamento, il sistema transita nello Stato 1 (Errore Sensori) 
                    e impedisce l'attivazione della sorveglianza, prevenendo vulnerabilità critiche.
                  </p>
                </div>
              </div>
            </Card>

            {/* Sensore Porta */}
            <Card className="p-6 border border-border note-section">
              <h4 className="text-lg font-bold text-foreground mb-4">Sensore Porta (Pin A3)</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-2">Tecnologia di Rilevamento</p>
                  <p className="text-muted-foreground">
                    Contatto magnetico <span className="font-semibold">normalmente chiuso (NC)</span> con protezione 
                    anti-mascheramento e anti-bypass. Implementa la stessa logica digitale binaria del sensore finestra, 
                    con stato <span className="font-mono bg-secondary px-2 py-1 rounded">LOW</span> (porta chiusa) e stato <span className="font-mono bg-secondary px-2 py-1 rounded">HIGH</span> (porta aperta). 
                    Il sensore è collegato al pin analogico A3, configurato in modalità digitale per massimizzare l'affidabilità.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground mb-2">Priorità nel Rilevamento</p>
                  <p className="text-muted-foreground">
                    La porta rappresenta il <span className="font-semibold">punto di accesso primario</span> e il suo rilevamento 
                    ha priorità assoluta nel sistema. La logica FSM valuta continuamente la condizione <span className="font-mono bg-secondary px-2 py-1 rounded">sensorePorta || sensoreFinestra</span>, 
                    garantendo che qualsiasi apertura della porta attivi immediatamente il protocollo di allarme.
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground mb-2">Integrazione con Timeout</p>
                  <p className="text-muted-foreground">
                    Il rilevamento della porta aperta durante la sorveglianza attiva (Stato 4) innesca un <span className="font-semibold">ritardo di grazia di 5 secondi</span> 
                    (Stato 5), consentendo all'operatore legittimo di disarmare il sistema tramite autenticazione RFID prima dell'attivazione della sirena.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Feedback di Stato */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            Sistema di Feedback Multisensoriale
          </h3>

          <div className="space-y-6">
            {/* Feedback Visivo */}
            <Card className="p-6 border border-border">
              <h4 className="text-lg font-bold text-foreground mb-4">Feedback Visivo (LED RGB)</h4>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  Il sistema implementa un <span className="font-semibold">feedback visivo multisensoriale</span> tramite LED a colori distinti, 
                  consentendo all'operatore di percepire istantaneamente lo stato del sistema senza consultare il display LCD.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded" style={{ backgroundColor: 'var(--card)', border: '2px solid #22c55e', color: 'var(--text-primary)' }}>
                    <p className="font-semibold mb-2" style={{ color: '#16a34a' }}>🟢 LED Verde (D7)</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-bold">Acceso Fisso:</span> Sistema disarmato (Stato 0) - Operazione normale<br/>
                      <span className="font-bold">Lampeggio 2 Hz:</span> Attesa autenticazione RFID (Stato 2) - Presentare badge<br/>
                      <span className="font-bold">Lampeggio 1 Hz:</span> Countdown in corso (Stato 3) - Operatore in allontanamento
                    </p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: 'var(--card)', border: '2px solid #ef4444', color: 'var(--text-primary)' }}>
                    <p className="font-semibold mb-2" style={{ color: '#dc2626' }}>🔴 LED Rosso (D6)</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-bold">Lampeggio 1 Hz (5% duty):</span> Ritardo intrusione (Stato 5) - Pre-allarme<br/>
                      <span className="font-bold">Lampeggio 6 Hz (50% duty):</span> Sirena attiva (Stato 6) - Allarme generale in corso<br/>
                      <span className="font-bold">Spento:</span> Sistema in sorveglianza (Stato 4) - Nessun evento
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feedback Acustico */}
            <Card className="p-6 border border-border">
              <h4 className="text-lg font-bold text-foreground mb-4">Feedback Acustico (Sirena - Pin A2)</h4>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  La sirena implementa un <span className="font-semibold">protocollo acustico a tre livelli</span> per comunicare 
                  lo stato del sistema e garantire la percezione immediata degli eventi critici.
                </p>
                <div className="space-y-3">
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Livello 1: Segnale di Avviso (Stato 3)</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Impulsi acustici a <span className="font-mono">1 Hz</span> con duty cycle <span className="font-mono">5%</span> (50 ms acceso, 950 ms spento). 
                      Avverte l'operatore che il countdown è in corso.
                    </p>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Livello 2: Pre-Allarme (Stato 5)</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Impulsi acustici a <span className="font-mono">1 Hz</span> con duty cycle <span className="font-mono">5%</span>. 
                      Segnala intrusione rilevata con ritardo di grazia disponibile per disarmo anticipato.
                    </p>
                  </div>
                  <div className="p-3 rounded" style={{ backgroundColor: 'var(--card)', border: '2px solid #ef4444', color: 'var(--text-primary)' }}>
                    <p className="font-semibold mb-1" style={{ color: '#dc2626' }}>Livello 3: Allarme Generale (Stato 6)</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Impulsi acustici ad <span className="font-mono">alta frequenza (6 Hz)</span> con duty cycle <span className="font-mono">50%</span> (83 ms acceso, 83 ms spento). 
                      Sirena a massima intensità per allertare l'ambiente circostante. Disattivabile solo tramite autenticazione RFID.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feedback Digitale */}
            <Card className="p-6 border border-border">
              <h4 className="text-lg font-bold text-foreground mb-4">Feedback Digitale (Display LCD I2C)</h4>
              <div className="space-y-4 text-sm">
                <p className="text-muted-foreground">
                  Il display LCD 16×2 (indirizzo I2C <span className="font-mono bg-secondary px-2 py-1 rounded">0x27</span>) fornisce 
                  informazioni testuali in tempo reale sullo stato del sistema, i sensori e i countdown attivi.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary rounded font-mono text-xs text-foreground">
                    <p>ANTIFURTO OFF</p>
                    <p>Premi pulsante</p>
                  </div>
                  <div className="p-3 bg-secondary rounded font-mono text-xs text-foreground">
                    <p>ATTESA RFID</p>
                    <p>Presenta badge</p>
                  </div>
                  <div className="p-3 bg-secondary rounded font-mono text-xs text-foreground">
                    <p>COUNTDOWN: 5s</p>
                    <p>Allontanati...</p>
                  </div>
                  <div className="p-3 bg-secondary rounded font-mono text-xs text-foreground">
                    <p>ANTIFURTO ON</p>
                    <p>SP:OK SF:OK</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Legenda Intuitiva */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-primary" />
            Legenda Colori e Stati
          </h3>

          <Card className="p-6 border border-border">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Colore/Stato</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">LED Verde</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">LED Rosso</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Sirena</th>
                  <th className="text-left py-3 px-4 font-bold text-foreground">Significato</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-green-600">🟢 Verde Fisso</td>
                  <td className="py-3 px-4">Acceso</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Silenzio</td>
                  <td className="py-3 px-4 text-muted-foreground">Sistema disarmato - Operazione normale</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-green-600">🟢 Verde Lampeggio 2Hz</td>
                  <td className="py-3 px-4">Lampeggia</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Silenzio</td>
                  <td className="py-3 px-4 text-muted-foreground">Attesa autenticazione RFID</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-green-600">🟢 Verde Lampeggio 1Hz</td>
                  <td className="py-3 px-4">Lampeggia</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Impulsi 1Hz</td>
                  <td className="py-3 px-4 text-muted-foreground">Countdown in corso - Allontanamento</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-green-600">🟢 Verde Fisso</td>
                  <td className="py-3 px-4">Acceso</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Silenzio</td>
                  <td className="py-3 px-4 text-muted-foreground">Sorveglianza attiva - Sistema armato</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-yellow-600">🟡 Giallo Lampeggio 1Hz</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Lampeggia</td>
                  <td className="py-3 px-4">Impulsi 1Hz</td>
                  <td className="py-3 px-4 text-muted-foreground">Ritardo intrusione - Pre-allarme (5s)</td>
                </tr>
                <tr className="hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 font-semibold text-red-600">🔴 Rosso Lampeggio 6Hz</td>
                  <td className="py-3 px-4">Spento</td>
                  <td className="py-3 px-4">Lampeggia</td>
                  <td className="py-3 px-4">Impulsi 6Hz</td>
                  <td className="py-3 px-4 text-muted-foreground">Allarme generale - Sirena attiva</td>
                </tr>
              </tbody>
            </table>
            </div>
          </Card>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
            <h4 className="font-bold mb-3" style={{ color: '#1a1a1a' }}>Nota Operativa: Feedback Multisensoriale</h4>
            <ul className="text-sm space-y-2" style={{ color: '#4a4a4a' }}>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Feedback <strong>visivo</strong> (LED RGB con 3 stati)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Feedback <strong>acustico</strong> (sirena 3 livelli)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Feedback <strong>digitale</strong> (display LCD I2C)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Percezione istantanea dello stato anche in <strong>scarsa visibilità o rumore</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>Massima <strong>reattività e chiarezza comunicativa</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
