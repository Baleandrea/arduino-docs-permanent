import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const fsmStates = [
  {
    id: 0,
    name: "Sistema Disarmato (OFF)",
    description: "Condizione di riposo del sistema. Il microcontrollore rimane in attesa di un comando di avvio tramite il pulsante (A1). Tutti gli attuatori di allarme sono disattivati.",
    transitions: [
      { condition: "avvioPremiuto && sensorePorta==LOW && sensoreFinestra==LOW", target: "Stato 2" },
      { condition: "avvioPremiuto && (sensorePorta==HIGH || sensoreFinestra==HIGH)", target: "Stato 1" }
    ],
    color: "bg-blue-50 border-blue-200",
    isDark: false,
  },
  {
    id: 1,
    name: "Errore Sensori",
    description: "Meccanismo di protezione perimetrale che impedisce l'armamento se porta o finestra risultano aperte. Implementa una logica di sicurezza che previene vulnerabilità.",
    transitions: [
      { condition: "Timeout 5 secondi (DELAY_ALLARME)", target: "Stato 0" }
    ],
    color: "bg-orange-50 border-orange-200",
    isDark: false,
  },
  {
    id: 2,
    name: "Attesa Autenticazione RFID (Armare)",
    description: "Il sistema entra in fase di autenticazione tramite badge RFID. Il lettore RC522 è abilitato e rimane in polling per la lettura. LED verde lampeggia a 2 Hz per segnalare l'attesa.",
    transitions: [
      { condition: "RFID valido (UID_OK verificato)", target: "Stato 3" },
      { condition: "Timeout RFID (10 secondi)", target: "Stato 0" },
      { condition: "RFID non valido", target: "Rimane in Stato 2" }
    ],
    color: "bg-green-50 border-green-200",
    isDark: false,
  },
  {
    id: 3,
    name: "Conto alla Rovescia (Countdown)",
    description: "Fase di transizione controllata verso lo stato di sorveglianza. L'operatore ha DELAY_ALLARME secondi (default 5s) per allontanarsi dalla zona protetta.",
    transitions: [
      { condition: "Countdown completato", target: "Stato 4" },
    ],
    color: "bg-green-50 border-green-200",
    isDark: false,
  },
  {
    id: 4,
    name: "Sorveglianza Attiva (Armato)",
    description: "Sistema completamente operativo. Monitora continuamente i sensori perimetrali (pin 8 e A3). Lettore RFID disabilitato per motivi di sicurezza. LED verde acceso fisso.",
    transitions: [
      { condition: "sensorePorta==HIGH || sensoreFinestra==HIGH", target: "Stato 5" }
    ],
    color: "bg-blue-50 border-blue-200",
    isDark: false,
  },
  {
    id: 5,
    name: "Ritardo Intrusione",
    description: "Rilevata apertura di porta o finestra. Il sistema non attiva immediatamente l'allarme, ma concede un ritardo di grazia pari a DELAY_ALLARME secondi. Consente il disarmo anticipato.",
    transitions: [
      { condition: "RFID valido", target: "Stato 0" },
      { condition: "Timeout scaduto", target: "Stato 6" },
      { condition: "RFID non valido", target: "Rimane in Stato 5" }
    ],
    color: "bg-red-50 border-red-300",
    isDark: false,
  },
  {
    id: 6,
    name: "Sirena Attiva (Allarme Generale)",
    description: "Allarme confermato. Sirena e LED rosso attivati in modalità lampeggiante ad alta frequenza (6 Hz). Unico modo per interrompere: presentazione del badge RFID autorizzato.",
    transitions: [
      { condition: "RFID valido", target: "Stato 0" }
    ],
    color: "bg-red-100 border-red-400",
    isDark: true,
  },
];

export default function FSMAnalysisSection() {
  const [expandedState, setExpandedState] = useState<number | null>(0);

  return (
    <section id="fsm-analysis" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Analisi della Macchina a Stati Finiti (FSM)
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Il sistema implementa una <span className="font-semibold">macchina a stati finiti deterministica</span> composta da sette stati logici (0-6), 
            dove ogni transizione è governata da condizioni esplicite derivanti da input sensoriali e comandi dell'operatore. 
            L'implementazione utilizza un costrutto <code className="bg-background px-2 py-1 rounded text-sm font-mono">switch-case</code> centralizzato.
          </p>
        </div>

        {/* Detailed State Analysis */}
        <div className="space-y-4">
          {fsmStates.map((state) => (
            <Card
              key={state.id}
              className={`border-2 ${state.color} overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => setExpandedState(expandedState === state.id ? null : state.id)}
                className="w-full p-6 text-left hover:opacity-80 transition-opacity"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-primary opacity-30">S{state.id}</span>
                      <h3 className="text-xl font-bold" style={{ color: state.isDark ? 'var(--text-primary)' : '#1a1a1a' }}>{state.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: state.isDark ? 'var(--text-secondary)' : '#4a4a4a' }}>{state.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground transition-transform duration-300 flex-shrink-0 ${
                      expandedState === state.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {expandedState === state.id && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="mt-4">
                    <h4 className="font-semibold mb-3" style={{ color: state.isDark ? 'var(--text-primary)' : '#1a1a1a' }}>Transizioni di Stato:</h4>
                    <ul className="space-y-2">
                      {state.transitions.map((transition, idx) => (
                        <li key={idx} className="text-sm flex gap-2" style={{ color: state.isDark ? 'var(--text-secondary)' : '#4a4a4a' }}>
                          <span className="text-accent font-bold">→</span>
                          <span>
                            <strong>Se:</strong> {transition.condition}
                            <br />
                            <strong>Allora:</strong> {transition.target}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
