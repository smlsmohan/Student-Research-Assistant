// Real dataset loader for arXiv data using Supabase via Server Actions
import { getArxivPapersFromSupabase } from "@/app/actions/arxiv-data" // Import the Server Action

export interface ArxivDatasetEntry {
  id: string
  submitter?: string // Optional as it might not be in your DB
  authors: string
  title: string
  comments?: string
  "journal-ref"?: string
  doi?: string
  "report-no"?: string
  categories: string // Assuming this is a string like "cs.CL cs.AI"
  license?: string
  abstract: string
  versions?: Array<{
    // Optional, might not be in your DB
    version: string
    created: string
  }>
  update_date: string // Should be a date string
  authors_parsed: Array<[string, string, string]> // Assuming this is stored as JSON string in DB
}

export class DatasetLoader {
  private dataset: ArxivDatasetEntry[] = []
  private isLoaded = false

  async loadDataset(): Promise<void> {
    if (this.isLoaded) return

    try {
      console.log("Client-side: Requesting arXiv data via Server Action...")
      // Call the Server Action to fetch data
      this.dataset = await getArxivPapersFromSupabase()
      this.isLoaded = true

      console.log(`Client-side: Successfully received ${this.dataset.length} papers from Server Action.`)
    } catch (error) {
      console.error("Client-side: Failed to load dataset via Server Action:", error)
      throw new Error("Dataset loading failed via server action")
    }
  }

  getDataset(): ArxivDatasetEntry[] {
    if (!this.isLoaded) {
      throw new Error("Dataset not loaded. Call loadDataset() first.")
    }
    return this.dataset
  }

  searchByField(field: string): ArxivDatasetEntry[] {
    const fieldMap: Record<string, string[]> = {
      "computer-science": ["cs.AI", "cs.CL", "cs.CV", "cs.LG", "cs.RO", "cs.CG"],
      physics: ["hep-ph", "gr-qc", "astro-ph", "physics", "cond-mat"],
      mathematics: ["math.CO", "math.AG", "math.NT", "math"],
      "life-sciences": ["q-bio", "physics.bio-ph"],
      engineering: ["cs.RO", "physics.app-ph"],
      chemistry: ["physics.chem-ph", "cond-mat"],
      environmental: ["physics.ao-ph", "physics.geo-ph"],
      "social-sciences": ["econ", "q-fin", "stat.AP"], // Added for completeness
      other: ["gen-ph", "nlin", "quant-ph"], // General/misc categories
    }

    const relevantCategories = fieldMap[field] || []

    return this.dataset.filter((paper) => relevantCategories.some((cat) => paper.categories.includes(cat)))
  }

  searchByKeywords(keywords: string[]): ArxivDatasetEntry[] {
    if (keywords.length === 0) return []

    return this.dataset.filter((paper) => {
      const searchText = `${paper.title} ${paper.abstract}`.toLowerCase()
      return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()))
    })
  }

  getAuthorStats(): Record<string, { papers: number; categories: Set<string>; recentPapers: ArxivDatasetEntry[] }> {
    const authorStats: Record<string, { papers: number; categories: Set<string>; recentPapers: ArxivDatasetEntry[] }> =
      {}

    this.dataset.forEach((paper) => {
      // Ensure authors_parsed is an array before iterating
      if (Array.isArray(paper.authors_parsed)) {
        paper.authors_parsed.forEach(([lastName, firstName]) => {
          const fullName = `${firstName} ${lastName}`.trim()
          if (!authorStats[fullName]) {
            authorStats[fullName] = { papers: 0, categories: new Set(), recentPapers: [] }
          }
          authorStats[fullName].papers++
          authorStats[fullName].recentPapers.push(paper)
          paper.categories.split(" ").forEach((cat) => authorStats[fullName].categories.add(cat))
        })
      }
    })

    // Sort recent papers by date for each author
    Object.values(authorStats).forEach((stats) => {
      stats.recentPapers.sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime())
    })

    return authorStats
  }

  getCategoryTrends(): Record<string, { count: number; recentGrowth: number; papers: ArxivDatasetEntry[] }> {
    const categoryStats: Record<string, { papers: ArxivDatasetEntry[]; count: number }> = {}

    this.dataset.forEach((paper) => {
      paper.categories.split(" ").forEach((category) => {
        if (!categoryStats[category]) {
          categoryStats[category] = { papers: [], count: 0 }
        }
        categoryStats[category].papers.push(paper)
        categoryStats[category].count++
      })
    })

    const trends: Record<string, { count: number; recentGrowth: number; papers: ArxivDatasetEntry[] }> = {}

    Object.entries(categoryStats).forEach(([category, stats]) => {
      // Use a dynamic cutoff date based on the dataset's age, or a fixed recent period
      const latestYear = this.dataset.reduce(
        (maxYear, p) => Math.max(maxYear, new Date(p.update_date).getFullYear()),
        0,
      )
      const cutoffYear = latestYear - 3 // Last 3 years for "recent"
      const cutoffDate = new Date(`${cutoffYear}-01-01`)

      const recentPapers = stats.papers.filter((paper) => new Date(paper.update_date) > cutoffDate)
      const olderPapers = stats.papers.filter((paper) => new Date(paper.update_date) <= cutoffDate)

      const recentCount = recentPapers.length
      const olderCount = olderPapers.length

      let growthRate = 0
      if (olderCount > 0) {
        const yearsRecent = latestYear - cutoffYear
        const yearsOlder =
          cutoffYear -
          this.dataset.reduce(
            (minYear, p) => Math.min(minYear, new Date(p.update_date).getFullYear()),
            new Date().getFullYear(),
          )

        if (yearsRecent > 0 && yearsOlder > 0) {
          const recentAnnualRate = recentCount / yearsRecent
          const olderAnnualRate = olderCount / yearsOlder
          if (olderAnnualRate > 0) {
            growthRate = Math.round(((recentAnnualRate - olderAnnualRate) / olderAnnualRate) * 100)
          }
        } else if (recentCount > 0) {
          growthRate = 100 // All papers are recent
        }
      } else if (recentCount > 0) {
        growthRate = 100 // New field with only recent papers
      }

      trends[category] = {
        count: stats.count,
        recentGrowth: Math.max(0, growthRate), // Ensure non-negative growth
        papers: stats.papers,
      }
    })

    return trends
  }
}

export const datasetLoader = new DatasetLoader()
