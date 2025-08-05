"use server"

import { createClient } from "@supabase/supabase-js"
import type { ArxivDatasetEntry } from "@/lib/dataset-loader"

// IMPORTANT: In a production application, use environment variables for these keys!
// For example: process.env.NEXT_PUBLIC_SUPABASE_URL and process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = "https://bfbhbaipgbazdhghrjho.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmYmhiYWlwZ2JhemRoZ2hyamhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODI5NjIsImV4cCI6MjA2OTk1ODk2Mn0.7GD80L7vxTKlnRSPVdq0LDNDmedT6oM3kV6qFgMFAOQ"

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Parses the authors_parsed string, attempting to handle non-strict JSON formats
 * like JavaScript array literals with single quotes.
 */
function parseAuthorsParsedString(authorsParsedStr: string): Array<[string, string, string]> {
  if (!authorsParsedStr) {
    return []
  }
  try {
    // Attempt to parse as strict JSON first
    return JSON.parse(authorsParsedStr)
  } catch (e) {
    console.warn("Failed to parse authors_parsed as strict JSON, attempting lenient parse:", authorsParsedStr, e)
    // If it fails, assume it's a JS literal with single quotes and try to fix
    // This is a heuristic and might not cover all edge cases, especially if single quotes are part of the data
    const cleanedStr = authorsParsedStr.replace(/'/g, '"')
    try {
      return JSON.parse(cleanedStr)
    } catch (e2) {
      console.error("Failed to parse authors_parsed even after cleaning (returning empty array):", authorsParsedStr, e2)
      return [] // Return empty array on persistent failure
    }
  }
}

export async function getArxivPapersFromSupabase(): Promise<ArxivDatasetEntry[]> {
  console.log("Server Action: Fetching arXiv data from Supabase...")
  try {
    // Fetch ALL papers by removing the limit
    const { data, error } = await supabase.from("papers").select("*")

    if (error) {
      console.error("Server Action Error fetching papers from Supabase:", error)
      throw new Error(`Failed to fetch papers from database: ${error.message}`)
    }

    const papers: ArxivDatasetEntry[] = data.map((item) => ({
      id: item.id,
      submitter: item.submitter,
      authors: item.authors,
      title: item.title,
      comments: item.comments,
      "journal-ref": item.journal_ref,
      doi: item.doi,
      "report-no": item.report_no,
      categories: item.categories,
      license: item.license,
      abstract: item.abstract,
      versions: item.versions,
      update_date: item.update_date || new Date().toISOString().split("T")[0], // Fallback
      authors_parsed: parseAuthorsParsedString(item.authors_parsed), // Use the new helper function
    })) as ArxivDatasetEntry[]

    console.log(`Server Action: Successfully fetched ${papers.length} papers.`)
    return papers
  } catch (error) {
    console.error("Server Action: Error in getArxivPapersFromSupabase:", error)
    throw error
  }
}
