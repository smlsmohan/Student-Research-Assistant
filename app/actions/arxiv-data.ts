"use server"

import { createClient } from "@supabase/supabase-js"
import type { ArxivDatasetEntry } from "@/lib/dataset-loader"

// IMPORTANT: In a production application, use environment variables for these keys!
// For example: process.env.NEXT_PUBLIC_SUPABASE_URL and process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = "https://bfbhbaipgbazdhghrjho.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmYmhiYWlwZ2JhemRoZ2hyamhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODI5NjIsImV4cCI6MjA2OTk1ODk2Mn0.7GD80L7vxTKlnRSPVdq0LDNDmedT6oM3kV6qFgMFAOQ"

const supabase = createClient(supabaseUrl, supabaseKey)

export async function getArxivPapersFromSupabase(): Promise<ArxivDatasetEntry[]> {
  console.log("Server Action: Fetching arXiv data from Supabase...")
  try {
    // Fetch a limited number of papers for demonstration
    // In a real app, you'd implement pagination or more specific queries
    const { data, error } = await supabase.from("papers").select("*").limit(100) // Fetching 100 papers for demo

    if (error) {
      console.error("Server Action Error fetching papers from Supabase:", error)
      throw new Error(`Failed to fetch papers from database: ${error.message}`)
    }

    const papers: ArxivDatasetEntry[] = data.map((item) => ({
      ...item,
      // Ensure authors_parsed is an array of arrays, assuming it's stored as JSON string
      authors_parsed: typeof item.authors_parsed === "string" ? JSON.parse(item.authors_parsed) : item.authors_parsed,
      // Ensure update_date is a string that can be parsed by Date
      update_date: item.update_date || new Date().toISOString().split("T")[0], // Fallback
    })) as ArxivDatasetEntry[]

    console.log(`Server Action: Successfully fetched ${papers.length} papers.`)
    return papers
  } catch (error) {
    console.error("Server Action: Error in getArxivPapersFromSupabase:", error)
    throw error
  }
}
