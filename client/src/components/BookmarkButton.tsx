import { useState, useEffect } from "react";
import { bookmarksService } from "@/lib/supabase";
import { Bookmark } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface BookmarkButtonProps {
  sectionId: string;
  sectionName: string;
}

export function BookmarkButton({
  sectionId,
  sectionName,
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkBookmark = async () => {
      const bookmarked = await bookmarksService.isBookmarked(
        user.id.toString(),
        sectionId
      );
      setIsBookmarked(bookmarked);
    };

    checkBookmark();
  }, [user, sectionId]);

  const handleToggleBookmark = async () => {
    if (!user) {
      alert("Accedi per salvare i segnalibri");
      return;
    }

    setIsLoading(true);
    if (isBookmarked) {
      await bookmarksService.removeBookmark(user.id.toString(), sectionId);
    } else {
      await bookmarksService.addBookmark(
        user.id.toString(),
        sectionId,
        sectionName
      );
    }
    setIsBookmarked(!isBookmarked);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        isBookmarked
          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
          : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
      }`}
      title={isBookmarked ? "Rimuovi segnalibro" : "Aggiungi segnalibro"}
    >
      <Bookmark
        size={18}
        fill={isBookmarked ? "currentColor" : "none"}
      />
      <span className="text-sm font-medium">
        {isBookmarked ? "Salvato" : "Salva"}
      </span>
    </button>
  );
}
