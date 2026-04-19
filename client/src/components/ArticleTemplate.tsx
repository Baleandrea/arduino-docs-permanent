import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/CodeBlock";

interface Component {
  name: string;
  quantity: number;
  description?: string;
}

interface ArticleTemplateProps {
  title: string;
  description: string;
  components: Component[];
  pinoutImage?: string;
  pinoutDescription: string;
  sourceCode: string;
  codeLanguage?: string;
  codeTitle?: string;
  additionalNotes?: string;
}

export default function ArticleTemplate({
  title,
  description,
  components,
  pinoutImage,
  pinoutDescription,
  sourceCode,
  codeLanguage = "cpp",
  codeTitle,
  additionalNotes,
}: ArticleTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Components Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">Componenti Necessari</h2>
          <Badge variant="outline">{components.length} componenti</Badge>
        </div>
        <Card className="p-6 border border-border">
          <div className="space-y-3">
            {components.map((comp, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-border pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{comp.name}</p>
                  {comp.description && (
                    <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                  )}
                </div>
                <Badge className="ml-4" variant="secondary">
                  x{comp.quantity}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Pinout Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Schema di Collegamento (Pinout)</h2>
        {pinoutImage && (
          <div className="rounded-lg border border-border overflow-hidden bg-card p-4">
            <img src={pinoutImage} alt="Pinout diagram" className="w-full h-auto" />
          </div>
        )}
        <Card className="p-6 border border-border bg-secondary/50">
          <p className="text-foreground leading-relaxed">{pinoutDescription}</p>
        </Card>
      </section>

      {/* Source Code Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Codice Sorgente</h2>
        <CodeBlock code={sourceCode} language={codeLanguage} title={codeTitle} />
      </section>

      {/* Additional Notes */}
      {additionalNotes && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Note Importanti</h2>
          <Card className="p-6 border-l-4 border-l-accent bg-card">
            <p className="text-foreground leading-relaxed">{additionalNotes}</p>
          </Card>
        </section>
      )}
    </article>
  );
}
