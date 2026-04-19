import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarItem {
  label: string;
  id: string;
  subsections?: { label: string; id: string }[];
}

interface SidebarProps {
  items: SidebarItem[];
  onItemClick: (id: string) => void;
  isOpen?: boolean;
}

export default function Sidebar({ items, onItemClick, isOpen = true }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items
      .map((item) => ({
        ...item,
        subsections: item.subsections?.filter((sub) =>
          sub.label.toLowerCase().includes(query)
        ),
      }))
      .filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          (item.subsections && item.subsections.length > 0)
      );
  }, [searchQuery, items]);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-40`}
    >
      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca nella documentazione..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2 text-sm"
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  onItemClick(item.id);
                  if (item.subsections && item.subsections.length > 0) {
                    toggleSection(item.id);
                  }
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors group"
              >
                <span>{item.label}</span>
                {item.subsections && item.subsections.length > 0 && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.has(item.id) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Subsections */}
              {item.subsections && expandedSections.has(item.id) && (
                <div className="ml-4 space-y-1 mt-1">
                  {item.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => onItemClick(subsection.id)}
                      className="w-full text-left px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                      {subsection.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Nessun risultato trovato per "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
