import { useState } from "react";
import { feedbackService } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X } from "lucide-react";

interface FeedbackWidgetProps {
  sectionId: string;
  sectionName: string;
}

export function FeedbackWidget({
  sectionId,
  sectionName,
}: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    const result = await feedbackService.submitFeedback(
      sectionId,
      sectionName,
      feedback,
      rating
    );

    if (result.success) {
      setSubmitted(true);
      setFeedback("");
      setRating(5);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
      }, 2000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 w-80 border border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Feedback
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✓ Grazie per il feedback!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Valutazione
                </label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Commento
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Condividi il tuo feedback..."
                  className="mt-2 resize-none"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !feedback.trim()}
                className="w-full"
              >
                {isSubmitting ? "Invio..." : "Invia Feedback"}
              </Button>
            </form>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
          title="Invia feedback"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
