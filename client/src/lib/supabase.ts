import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials not configured");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// Analytics Service
export const analyticsService = {
  async trackPageView(sectionId: string, sectionName: string) {
    try {
      const { error } = await supabase.from("page_views").insert({
        section_id: sectionId,
        section_name: sectionName,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
      });

      if (error) console.error("Analytics error:", error);
    } catch (err) {
      console.error("Failed to track page view:", err);
    }
  },

  async getPopularSections() {
    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("section_name")
        .limit(100);

      if (error) throw error;
      
      const counts = (data || []).reduce(
        (acc: Record<string, number>, item: any) => {
          acc[item.section_name] = (acc[item.section_name] || 0) + 1;
          return acc;
        },
        {}
      );

      return Object.entries(counts)
        .map(([name, count]) => ({ section_name: name, views: count }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
    } catch (err) {
      console.error("Failed to get popular sections:", err);
      return [];
    }
  },
};

// Feedback Service
export const feedbackService = {
  async submitFeedback(
    sectionId: string,
    sectionName: string,
    feedback: string,
    rating: number
  ) {
    try {
      const { error } = await supabase.from("feedback").insert({
        section_id: sectionId,
        section_name: sectionName,
        feedback_text: feedback,
        rating: rating,
        timestamp: new Date().toISOString(),
      });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      return { success: false, error: err };
    }
  },

  async getFeedback(sectionId: string) {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("section_id", sectionId)
        .order("timestamp", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Failed to get feedback:", err);
      return [];
    }
  },
};

// Bookmarks Service
export const bookmarksService = {
  async addBookmark(userId: string, sectionId: string, sectionName: string) {
    try {
      const { error } = await supabase.from("bookmarks").insert({
        user_id: userId,
        section_id: sectionId,
        section_name: sectionName,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Failed to add bookmark:", err);
      return { success: false, error: err };
    }
  },

  async removeBookmark(userId: string, sectionId: string) {
    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", userId)
        .eq("section_id", sectionId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      return { success: false, error: err };
    }
  },

  async getBookmarks(userId: string) {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Failed to get bookmarks:", err);
      return [];
    }
  },

  async isBookmarked(userId: string, sectionId: string) {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", userId)
        .eq("section_id", sectionId)
        .limit(1);

      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      console.error("Failed to check bookmark:", err);
      return false;
    }
  },
};
