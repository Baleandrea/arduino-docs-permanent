import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const states = [
  {
    id: 0,
    name: "Sistema OFF",
    description: "Il sistema è disarmato e in attesa di input. Il display mostra il messaggio di benvenuto.",
    color: "bg-blue-50 border-blue-200",
    isDark: false,
    badge: "IDLE",
  },
  {
    id: 1,
    name: "Errore Sensori",
    description: "Errore rilevato: porta o finestra aperta al momento dell'armamento. Timeout automatico di 5 secondi.",
    color: "bg-orange-50 border-orange-200",
    isDark: false,
    badge: "ERROR",
  },
  {
    id: 2,
    name: "Attesa RFID (Armare)",
    description: "Sistema in attesa del badge RFID autorizzato. Timeout di 10 secondi. LED verde lampeggia.",
    color: "bg-green-50 border-green-200",
    isDark: false,
    badge: "WAITING",
  },
  {
    id: 3,
    name: "Countdown",
    description: "Conto alla rovescia di 5 secondi prima dell'armamento. Utente può premere pulsante per sospendere.",
    color: "bg-green-50 border-green-200",
    isDark: false,
    badge: "ARMING",
  },
  {
    id: 4,
    name: "Sorveglianza Attiva",
    description: "Sistema completamente armato. Monitora solo i sensori. RFID disabilitato. LED verde acceso fisso.",
    color: "bg-blue-50 border-blue-200",
    isDark: false,
    badge: "ARMED",
  },
  {
    id: 5,
    name: "Ritardo Intrusione",
    description: "Intrusione rilevata. Ritardo di 5 secondi prima della sirena. Utente può disarmare con RFID.",
    color: "bg-red-50 border-red-300",
    isDark: false,
    badge: "ALERT",
  },
  {
    id: 6,
    name: "Sirena Attiva",
    description: "Allarme generale attivato. Sirena e LED rosso in funzione. Solo RFID può disarmare.",
    color: "bg-red-100 border-red-400",
    isDark: true,
    badge: "ALARM",
  },
];

export default function FSMSection() {
  return (
    <section id="fsm" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Logica della Macchina a Stati (FSM)
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Il cuore del software è una macchina a stati finiti che gestisce il ciclo di vita dell'antifurto. 
            Il sistema transita tra sette stati distinti in base agli input dell'utente e dei sensori.
          </p>
        </div>

        {/* State Diagram */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <img
            src="/state_diagram.png"
            alt="State Diagram"
            className="w-full h-auto"
          />
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {states.map((state) => (
            <Card
              key={state.id}
              className={`p-6 border-2 ${state.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl font-bold text-primary opacity-20">{state.id}</div>
                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                  {state.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: state.isDark ? 'var(--text-primary)' : '#1a1a1a' }}>{state.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: state.isDark ? 'var(--text-secondary)' : '#4a4a4a' }}>{state.description}</p>
            </Card>
          ))}
        </div>

        {/* State Transitions */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8">Transizioni tra Stati</h3>
          
          <div className="space-y-6">
            {/* Transition 1 */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center font-bold text-primary">
                0
              </div>
              <ChevronRight className="w-6 h-6 text-accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Pulsante premuto + Sensori OK</p>
                <p className="text-sm text-muted-foreground">Transizione verso Stato 2 (Attesa RFID)</p>
              </div>
            </div>

            {/* Transition 2 */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-green-100 border-2 border-green-300 flex items-center justify-center font-bold text-primary">
                2
              </div>
              <ChevronRight className="w-6 h-6 text-accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">RFID Valido</p>
                <p className="text-sm text-muted-foreground">Transizione verso Stato 3 (Countdown)</p>
              </div>
            </div>

            {/* Transition 3 */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-green-100 border-2 border-green-300 flex items-center justify-center font-bold text-primary">
                3
              </div>
              <ChevronRight className="w-6 h-6 text-accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Countdown Completato</p>
                <p className="text-sm text-muted-foreground">Transizione verso Stato 4 (Sorveglianza)</p>
              </div>
            </div>

            {/* Transition 4 */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-blue-100 border-2 border-blue-300 flex items-center justify-center font-bold text-primary">
                4
              </div>
              <ChevronRight className="w-6 h-6 text-accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Intrusione Rilevata</p>
                <p className="text-sm text-muted-foreground">Transizione verso Stato 5 (Ritardo Intrusione)</p>
              </div>
            </div>

            {/* Transition 5 */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-red-100 border-2 border-red-300 flex items-center justify-center font-bold text-primary">
                5
              </div>
              <ChevronRight className="w-6 h-6 text-accent" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">Timeout Ritardo</p>
                <p className="text-sm text-muted-foreground">Transizione verso Stato 6 (Sirena Attiva)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
