// Real dataset loader for arXiv data using Supabase via Server Actions
import { getArxivPapersFromSupabase } from "@/app/actions/arxiv-data" // Import the Server Action

export interface ArxivDatasetEntry {
  id: string
  submitter?: string // Optional
  authors: string
  title: string
  comments?: string
  "journal-ref"?: string
  doi?: string // Optional
  "report-no"?: string // Optional
  categories: string // Assuming this is a string like "cs.CL cs.AI"
  license?: string // Optional
  abstract: string
  versions?: Array<{
    // Optional, might not be in your DB
    version: string
    created: string
  }>
  update_date: string // Should be a date string
  authors_parsed: Array<[string, string, string]> // Assuming this is stored as JSON string in DB
}

// Exported for use in FieldOfStudyCombobox
export const fieldMap: Record<string, string[]> = {
  "computer-science": ["cs.AI", "cs.CL", "cs.CV", "cs.LG", "cs.RO", "cs.CG"],
  physics: [
    "hep-ph",
    "gr-qc",
    "astro-ph",
    "physics",
    "cond-mat",
    "physics.gen-ph",
    "physics.app-ph",
    "physics.chem-ph",
    "physics.ao-ph",
    "physics.geo-ph",
  ],
  mathematics: ["math.CO", "math.AG", "math.NT", "math"],
  "life-sciences": ["q-bio", "physics.bio-ph", "q-bio.BM", "q-bio.GN"],
  engineering: ["cs.RO", "physics.app-ph", "cond-mat.mtrl-sci"],
  chemistry: ["physics.chem-ph", "cond-mat"],
  environmental: ["physics.ao-ph", "physics.geo-ph"],
  "social-sciences": ["econ", "q-fin", "stat.AP", "econ.EM", "physics.soc-ph"],
  other: ["gen-ph", "nlin", "quant-ph"], // General/misc categories
}

// Exported for use in FieldOfStudyCombobox and RealArxivAnalyzer
export const categoryNames: Record<string, string> = {
  "cs.AI": "Artificial Intelligence",
  "cs.CL": "Natural Language Processing",
  "cs.CV": "Computer Vision",
  "cs.LG": "Machine Learning",
  "cs.RO": "Robotics",
  "hep-ph": "High Energy Physics - Phenomenology",
  "gr-qc": "General Relativity and Quantum Cosmology",
  "astro-ph": "Astrophysics",
  "astro-ph.HE": "High Energy Astrophysical Phenomena",
  "math.CO": "Combinatorics",
  "math.AG": "Algebraic Geometry",
  "q-bio": "Quantitative Biology",
  "q-bio.BM": "Biomolecules",
  "physics.bio-ph": "Biological Physics",
  "cs.CG": "Computational Geometry",
  "econ.EM": "Econometrics",
  "stat.ML": "Statistical Machine Learning",
  "physics.gen-ph": "General Physics",
  "cond-mat": "Condensed Matter",
  math: "Mathematics (General)",
  physics: "Physics (General)",
  "q-fin": "Quantitative Finance",
  "stat.AP": "Applications (Statistics)",
  "physics.app-ph": "Applied Physics",
  "physics.chem-ph": "Chemical Physics",
  "physics.ao-ph": "Atmospheric and Oceanic Physics",
  "physics.geo-ph": "Geophysics",
  "cond-mat.mtrl-sci": "Materials Science", // Added for completeness
  "physics.med-ph": "Medical Physics", // Added for completeness
  "math.OC": "Optimization and Control", // Added for completeness
  "physics.soc-ph": "Social Physics", // Added for completeness
  "q-bio.GN": "Genomics", // Added for completeness
}

export class DatasetLoader {
  private dataset: ArxivDatasetEntry[] = []
  private isLoaded = false

  async loadDataset(forceReload = false): Promise<void> {
    if (this.isLoaded && !forceReload) return

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

  searchByField(field: string, papersToFilter: ArxivDatasetEntry[] = this.dataset): ArxivDatasetEntry[] {
    const relevantCategories = fieldMap[field] || []
    if (relevantCategories.length === 0) return papersToFilter // If field not found, return original list

    return papersToFilter.filter((paper) => relevantCategories.some((cat) => paper.categories.includes(cat)))
  }

  searchByKeywords(keywords: string[], papersToFilter: ArxivDatasetEntry[] = this.dataset): ArxivDatasetEntry[] {
    if (keywords.length === 0) return papersToFilter

    return papersToFilter.filter((paper) => {
      const searchText = `${paper.title} ${paper.abstract} ${paper.categories} ${paper.authors}`.toLowerCase() // Include categories and authors in search
      return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()))
    })
  }

  filterByYearRange(
    fromYear: string | undefined,
    toYear: string | undefined,
    papersToFilter: ArxivDatasetEntry[] = this.dataset,
  ): ArxivDatasetEntry[] {
    const startYear = fromYear ? Number.parseInt(fromYear) : null
    const endYear = toYear ? Number.parseInt(toYear) : null

    if (startYear === null && endYear === null) {
      return papersToFilter
    }

    return papersToFilter.filter((paper) => {
      const paperYear = new Date(paper.update_date).getFullYear()
      const matchesFrom = startYear === null || paperYear >= startYear
      const matchesTo = endYear === null || paperYear <= endYear
      return matchesFrom && matchesTo
    })
  }

  filterByAuthor(
    authorName: string | undefined,
    papersToFilter: ArxivDatasetEntry[] = this.dataset,
  ): ArxivDatasetEntry[] {
    if (!authorName || authorName.trim() === "") {
      return papersToFilter
    }
    const lowerCaseAuthorName = authorName.toLowerCase()
    return papersToFilter.filter((paper) => {
      // Check both the raw authors string and parsed authors
      const rawAuthorMatch = paper.authors.toLowerCase().includes(lowerCaseAuthorName)
      const parsedAuthorMatch =
        Array.isArray(paper.authors_parsed) &&
        paper.authors_parsed.some(
          ([lastName, firstName]) =>
            `${firstName} ${lastName}`.toLowerCase().includes(lowerCaseAuthorName) ||
            lastName.toLowerCase().includes(lowerCaseAuthorName) ||
            firstName.toLowerCase().includes(lowerCaseAuthorName),
        )
      return rawAuthorMatch || parsedAuthorMatch
    })
  }

  filterByJournalOrDoi(
    query: string | undefined,
    papersToFilter: ArxivDatasetEntry[] = this.dataset,
  ): ArxivDatasetEntry[] {
    if (!query || query.trim() === "") {
      return papersToFilter
    }
    const lowerCaseQuery = query.toLowerCase()
    return papersToFilter.filter((paper) => {
      const journalMatch = paper["journal-ref"]?.toLowerCase().includes(lowerCaseQuery)
      const doiMatch = paper.doi?.toLowerCase().includes(lowerCaseQuery)
      return journalMatch || doiMatch
    })
  }

  getAuthorStats(
    papersToAnalyze: ArxivDatasetEntry[] = this.dataset,
  ): Record<string, { papers: number; categories: Set<string>; recentPapers: ArxivDatasetEntry[] }> {
    const authorStats: Record<string, { papers: number; categories: Set<string>; recentPapers: ArxivDatasetEntry[] }> =
      {}

    papersToAnalyze.forEach((paper) => {
      // Use papersToAnalyze here
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

  getCategoryTrends(
    papersToAnalyze: ArxivDatasetEntry[] = this.dataset,
  ): Record<string, { count: number; recentGrowth: number; papers: ArxivDatasetEntry[] }> {
    const categoryStats: Record<string, { papers: ArxivDatasetEntry[]; count: number }> = {}

    papersToAnalyze.forEach((paper) => {
      // Use papersToAnalyze here
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
      const latestYear = papersToAnalyze.reduce(
        // Use papersToAnalyze here
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
          papersToAnalyze.reduce(
            // Use papersToAnalyze here
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
