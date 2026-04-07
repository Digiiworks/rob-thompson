import "server-only";
import { createServerClient } from "@/lib/supabase";

export interface Performance {
  id: string;
  title: string;
  venue_name: string;
  venue_address: string | null;
  event_date: string;
  start_time: string | null;
  ticket_price: number | null;
  ticket_url: string | null;
  description: string | null;
  is_public: boolean;
  is_sold_out: boolean;
}

export async function getUpcomingPerformances(): Promise<Performance[]> {
  const supabase = createServerClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("performances")
    .select(
      "id, title, venue_name, venue_address, event_date, start_time, ticket_price, ticket_url, description, is_public, is_sold_out",
    )
    .eq("is_public", true)
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  if (error) {
    console.error("[performances] fetch failed:", error);
    return [];
  }
  return (data ?? []) as Performance[];
}
