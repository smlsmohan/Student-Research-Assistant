import { datasetLoader, type ArxivDatasetEntry } from "./dataset-loader"

export interface RealAnalysisResults {
  researchFields: Array<{
    field: string
    demand: "Very High" | "High" | "Emerging" | "Stable"
    growth: string
    description: string
    relatedPapers: number
    topInstitutions: string[]
    keyResearchers: string[]
    samplePapers: Array<{
      title: string
      authors: string
      year: string
      id: string
    }>
  }>
  researchers: Array<{
    name: string
    institution: string
    field: string
    papers: number
    hIndex: number
    recentPapers: string[]
    topPaper: string
  }>
  insights: {
    totalPapers: number
    trendingFields: string[]
    recommendedActions: string[]
    datasetInfo: {
      loadedPapers: number
      dateRange: string
      topCategories: string[]
      fieldDistribution: Record<string, number>
    }
  }
}

export class RealArxivAnalyzer {
  private categoryNames: Record<string, string> = {
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
    "econ.EM": "Econometrics", // Added for completeness
    "stat.ML": "Statistical Machine Learning", // Added for completeness
    "physics.gen-ph": "General Physics", // Added for completeness
    "cond-mat": "Condensed Matter", // Added for completeness
    math: "Mathematics (General)", // Added for completeness
    physics: "Physics (General)", // Added for completeness
    "q-fin": "Quantitative Finance", // Added for completeness
    "stat.AP": "Applications (Statistics)", // Added for completeness
    "physics.app-ph": "Applied Physics", // Added for completeness
    "physics.chem-ph": "Chemical Physics", // Added for completeness
    "physics.ao-ph": "Atmospheric and Oceanic Physics", // Added for completeness
    "physics.geo-ph": "Geophysics", // Added for completeness
  }

  async analyzeUserProfile(formData: {
    fieldOfStudy: string
    skills: string[]
    yearsOfExperience: string
  }): Promise<RealAnalysisResults> {
    console.log("🔄 Loading real arXiv dataset from Supabase...")
    await datasetLoader.loadDataset()

    const dataset = datasetLoader.getDataset()
    console.log(`📊 Loaded ${dataset.length} real papers from Supabase`)

    // Get papers relevant to user's field
    const fieldPapers = datasetLoader.searchByField(formData.fieldOfStudy)
    console.log(`🎯 Found ${fieldPapers.length} papers in ${formData.fieldOfStudy}`)

    // Get papers matching user's skills
    const skillPapers = datasetLoader.searchByKeywords(formData.skills)
    console.log(`🔍 Found ${skillPapers.length} papers matching skills: ${formData.skills.join(", ")}`)

    // Combine and deduplicate
    const relevantPapers = this.deduplicatePapers([...fieldPapers, ...skillPapers])
    console.log(`✅ Total relevant papers after deduplication: ${relevantPapers.length}`)

    // Analyze trends
    const categoryTrends = datasetLoader.getCategoryTrends()
    const authorStats = datasetLoader.getAuthorStats()

    // Generate research fields analysis
    const researchFields = this.analyzeResearchFields(relevantPapers, categoryTrends)

    // Find top researchers
    const researchers = this.findTopResearchers(relevantPapers, authorStats)

    // Create insights
    const insights = this.generateInsights(dataset, relevantPapers, categoryTrends, formData)

    console.log(
      `🎉 Analysis complete! Found ${researchFields.length} research opportunities and ${researchers.length} key researchers`,
    )

    return {
      researchFields,
      researchers,
      insights,
    }
  }

  private deduplicatePapers(papers: ArxivDatasetEntry[]): ArxivDatasetEntry[] {
    const seen = new Set<string>()
    return papers.filter((paper) => {
      if (seen.has(paper.id)) return false
      seen.add(paper.id)
      return true
    })
  }

  private analyzeResearchFields(
    papers: ArxivDatasetEntry[],
    trends: Record<string, { count: number; recentGrowth: number; papers: ArxivDatasetEntry[] }>,
  ) {
    const fieldStats: Record<
      string,
      {
        papers: ArxivDatasetEntry[]
        growth: number
        authors: Set<string>
      }
    > = {}

    papers.forEach((paper) => {
      paper.categories.split(" ").forEach((category) => {
        if (!fieldStats[category]) {
          fieldStats[category] = {
            papers: [],
            growth: trends[category]?.recentGrowth || 0,
            authors: new Set(),
          }
        }

        fieldStats[category].papers.push(paper)

        // Extract authors
        if (Array.isArray(paper.authors_parsed)) {
          paper.authors_parsed.forEach(([lastName, firstName]) => {
            fieldStats[category].authors.add(`${firstName} ${lastName}`.trim())
          })
        }
      })
    })

    return Object.entries(fieldStats)
      .filter(([, stats]) => stats.papers.length > 0) // Only include fields with papers
      .sort(([, a], [, b]) => b.papers.length - a.papers.length)
      .slice(0, 4)
      .map(([category, stats]) => {
        let demand: "Very High" | "High" | "Emerging" | "Stable" = "Stable"
        if (stats.growth > 80) demand = "Very High"
        else if (stats.growth > 40) demand = "High"
        else if (stats.growth > 15) demand = "Emerging"

        // Extract institutions from paper metadata (simplified)
        const institutions = new Set<string>()
        stats.papers.forEach((paper) => {
          // In real implementation, would parse affiliations from paper metadata
          if (paper.authors.includes("Google")) institutions.add("Google Research")
          if (paper.authors.includes("OpenAI")) institutions.add("OpenAI")
          if (paper.authors.includes("DeepMind")) institutions.add("DeepMind")
          if (paper.authors.includes("MIT")) institutions.add("MIT")
          if (paper.authors.includes("Stanford")) institutions.add("Stanford University")
          if (paper.authors.includes("ETH Zurich")) institutions.add("ETH Zurich")
          if (paper.authors.includes("Cambridge")) institutions.add("University of Cambridge")
        })

        return {
          field: this.categoryNames[category] || category,
          demand,
          growth: `+${stats.growth}%`,
          description: `Based on analysis of ${stats.papers.length} papers with ${stats.growth}% growth in recent publications`,
          relatedPapers: stats.papers.length,
          topInstitutions: Array.from(institutions).slice(0, 3),
          keyResearchers: Array.from(stats.authors).slice(0, 3),
          samplePapers: stats.papers.slice(0, 3).map((paper) => ({
            title: paper.title,
            authors: paper.authors.split(",")[0] + (paper.authors.includes(",") ? " et al." : ""),
            year: new Date(paper.update_date).getFullYear().toString(),
            id: paper.id,
          })),
        }
      })
  }

  private findTopResearchers(
    papers: ArxivDatasetEntry[],
    authorStats: Record<string, { papers: number; categories: Set<string>; recentPapers: ArxivDatasetEntry[] }>,
  ) {
    // Find authors who appear in our relevant papers
    const relevantAuthors = new Set<string>()
    papers.forEach((paper) => {
      if (Array.isArray(paper.authors_parsed)) {
        paper.authors_parsed.forEach(([lastName, firstName]) => {
          relevantAuthors.add(`${firstName} ${lastName}`.trim())
        })
      }
    })

    return Object.entries(authorStats)
      .filter(([author]) => relevantAuthors.has(author) && authorStats[author].papers > 0)
      .sort(([, a], [, b]) => b.papers - a.papers)
      .slice(0, 4)
      .map(([author, stats]) => {
        // Find most cited/important paper (simplified - using most recent)
        const topPaper = stats.recentPapers[0]?.title || "No recent papers"

        // Estimate institution from paper patterns or common affiliations
        let institution = "Research Institution"
        if (stats.recentPapers.some((p) => p.authors.includes("Google"))) {
          institution = "Google Research"
        } else if (stats.recentPapers.some((p) => p.authors.includes("OpenAI"))) {
          institution = "OpenAI"
        } else if (stats.recentPapers.some((p) => p.authors.includes("DeepMind"))) {
          institution = "DeepMind"
        } else if (stats.recentPapers.some((p) => p.authors.includes("MIT"))) {
          institution = "MIT"
        } else if (stats.recentPapers.some((p) => p.authors.includes("Stanford"))) {
          institution = "Stanford University"
        } else if (stats.recentPapers.some((p) => p.authors.includes("ETH Zurich"))) {
          institution = "ETH Zurich"
        } else if (stats.recentPapers.some((p) => p.authors.includes("Cambridge"))) {
          institution = "University of Cambridge"
        }

        return {
          name: author,
          institution,
          field: this.categoryNames[Array.from(stats.categories)[0]] || Array.from(stats.categories)[0],
          papers: stats.papers,
          hIndex: Math.min(stats.papers, Math.floor(Math.sqrt(stats.papers) * 4)), // More realistic h-index estimation
          recentPapers: stats.recentPapers.slice(0, 3).map((p) => p.title),
          topPaper,
        }
      })
  }

  private generateInsights(
    fullDataset: ArxivDatasetEntry[],
    relevantPapers: ArxivDatasetEntry[],
    trends: Record<string, { count: number; recentGrowth: number; papers: ArxivDatasetEntry[] }>,
    formData: any,
  ) {
    // Calculate field distribution
    const fieldDistribution: Record<string, number> = {}
    fullDataset.forEach((paper) => {
      paper.categories.split(" ").forEach((cat) => {
        const fieldName = this.categoryNames[cat] || cat
        fieldDistribution[fieldName] = (fieldDistribution[fieldName] || 0) + 1
      })
    })

    const topCategories = Object.entries(fieldDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([cat]) => cat)

    const trendingFields = Object.entries(trends)
      .filter(([, stats]) => stats.recentGrowth > 30 && stats.count > 1)
      .sort(([, a], [, b]) => b.recentGrowth - a.recentGrowth)
      .slice(0, 3)
      .map(([cat]) => this.categoryNames[cat] || cat)

    const experience = Number.parseInt(formData.yearsOfExperience) || 0
    const recommendedActions = []

    if (relevantPapers.length === 0) {
      recommendedActions.push("Consider broadening your search criteria or exploring related fields")
      recommendedActions.push("Look into interdisciplinary research opportunities")
    } else {
      if (experience < 2) {
        recommendedActions.push("Focus on foundational research in your identified trending areas")
        recommendedActions.push("Consider reaching out to researchers for mentorship opportunities")
      } else if (experience < 5) {
        recommendedActions.push("Target high-growth research areas for maximum career impact")
        recommendedActions.push("Apply for PhD programs with strong research groups in your field")
      } else {
        recommendedActions.push("Lead research initiatives in emerging high-growth fields")
        recommendedActions.push("Seek international collaboration opportunities with top researchers")
      }

      if (trendingFields.length > 0) {
        recommendedActions.push(`Consider specializing in ${trendingFields[0]} - showing highest growth`)
      }
    }

    const dateRange = this.getDateRange(fullDataset)

    return {
      totalPapers: relevantPapers.length,
      trendingFields,
      recommendedActions: recommendedActions.slice(0, 3),
      datasetInfo: {
        loadedPapers: fullDataset.length,
        dateRange,
        topCategories,
        fieldDistribution,
      },
    }
  }

  private getDateRange(papers: ArxivDatasetEntry[]): string {
    if (papers.length === 0) return "N/A"
    const dates = papers.map((p) => new Date(p.update_date))
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))

    return `${minDate.getFullYear()} - ${maxDate.getFullYear()}`
  }
}

export const realArxivAnalyzer = new RealArxivAnalyzer()
