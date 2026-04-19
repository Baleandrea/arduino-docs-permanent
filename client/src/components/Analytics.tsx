import { useEffect } from "react";
import { analyticsService } from "@/lib/supabase";

interface AnalyticsProps {
  sectionId: string;
  sectionName: string;
}

export function Analytics({ sectionId, sectionName }: AnalyticsProps) {
  useEffect(() => {
    // Track page view asynchronously without blocking rendering
    const timer = setTimeout(() => {
      analyticsService.trackPageView(sectionId, sectionName);
    }, 500); // Delay tracking to not interfere with initial load

    return () => clearTimeout(timer);
  }, [sectionId, sectionName]);

  return null; // This component doesn't render anything
}
