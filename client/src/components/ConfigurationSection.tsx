import { Card } from "@/components/ui/card";
import { AlertCircle, Copy } from "lucide-react";
import { useState } from "react";

const configParams = [
  {
    name: "UID_OK",
    type: "byte[4]",
    default: "{0x12, 0x34, 0x56, 0x78}",
    description: "Array di 4 byte che definisce l'identificativo univoco (UID) del badge RFID autorizzato.",
  },
  {
    name: "SOGLIA_LDR_ON",
    type: "int",
    default: "150",
    description: "Valore analogico (0-1023) sotto il quale i lampioni si accendono.",
  },
  {
    name: "SOGLIA_LDR_OFF",
    type: "int",
    default: "250",
    description: "Valore analogico (0-1023) sopra il quale i lampioni si spengono.",
  },
  {
    name: "DELAY_ALLARME",
    type: "int",
    default: "5",
    description: "Tempo in secondi per il conto alla rovescia di uscita (Stato 3) e il ritardo di ingresso (Stato 5).",
  },
  {
    name: "TIMEOUT_RFID",
    type: "unsigned long",
    default: "10000",
    description: "Tempo massimo in millisecondi di attesa per la lettura del badge nello Stato 2.",
  },
  {
    name: "DURATA_MSG_RFID",
    type: "unsigned long",
    default: "2500",
    description: "Tempo in millisecondi per cui i messaggi di esito della lettura RFID rimangono visibili sul display.",
  },
];

export default function ConfigurationSection() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="config" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Configurazione e Personalizzazione
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Il codice è progettato per essere facilmente configurabile modificando le costanti definite 
            all'inizio del file sorgente. Ecco i parametri principali e come personalizzarli.
          </p>
        </div>

        {/* Configuration Parameters */}
        <div className="space-y-4 mb-12">
          {configParams.map((param, idx) => (
            <Card key={idx} className="p-6 border border-border hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <code className="font-mono font-bold text-primary text-lg">{param.name}</code>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-mono rounded">
                      {param.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{param.description}</p>
                  <div className="bg-secondary p-3 rounded font-mono text-sm text-foreground">
                    #define {param.name} {param.default}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(`#define ${param.name} ${param.default}`, idx)}
                  className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <Copy className="w-4 h-4" />
                  {copiedIdx === idx ? "Copiato!" : "Copia"}
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Configuration Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Getting RFID UID */}
          <Card className="p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Come Ottenere l'UID del Badge RFID
            </h3>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">1.</span>
                <span>Carica il codice di lettura RFID sul tuo Arduino</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">2.</span>
                <span>Apri il Serial Monitor (9600 baud)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">3.</span>
                <span>Avvicina il badge al lettore RFID</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">4.</span>
                <span>Leggi l'UID stampato nel formato: 0xXX 0xXX 0xXX 0xXX</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">5.</span>
                <span>Aggiorna l'array UID_OK con i valori ottenuti</span>
              </li>
            </ol>
          </Card>

          {/* LDR Calibration */}
          <Card className="p-8 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Calibrazione della LDR
            </h3>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">1.</span>
                <span>Carica il codice con la funzione debugLDR() attiva</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">2.</span>
                <span>Apri il Serial Monitor e osserva i valori della LDR</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">3.</span>
                <span>Nota il valore in condizioni di buio (es. 50-100)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">4.</span>
                <span>Nota il valore in condizioni di luce (es. 800-900)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary min-w-6">5.</span>
                <span>Regola SOGLIA_LDR_ON e SOGLIA_LDR_OFF di conseguenza</span>
              </li>
            </ol>
          </Card>
        </div>

        {/* Important Notes */}
        <Card className="p-8 border-2 border-orange-200 bg-orange-50">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-orange-900 mb-3">Considerazioni Importanti</h4>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• L'UID del badge RFID deve essere aggiornato prima di caricare il codice sul tuo Arduino</li>
                <li>• I valori delle soglie LDR dipendono dalla sensibilità della fotoresistenza e dall'ambiente</li>
                <li>• Tutti i timeout sono espressi in millisecondi (ms) tranne DELAY_ALLARME che è in secondi</li>
                <li>• Modifica i parametri con cautela per evitare comportamenti indesiderati del sistema</li>
                <li>• Testa sempre le modifiche in un ambiente sicuro prima della distribuzione</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
