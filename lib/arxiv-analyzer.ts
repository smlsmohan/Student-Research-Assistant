// ArXiv dataset analyzer for research opportunities
export interface ArxivPaper {
  id: string
  title: string
  authors: string[]
  categories: string[]
  abstract: string
  submitter: string
  doi?: string
  journal_ref?: string
  update_date: string
  authors_parsed: Array<[string, string, string]>
}

export interface ResearchTrend {
  field: string
  paperCount: number
  growthRate: number
  topAuthors: string[]
  recentPapers: ArxivPaper[]
  fundingKeywords: string[]
}

export interface ResearchOpportunity {
  field: string
  demand: "Very High" | "High" | "Emerging" | "Stable"
  growth: string
  description: string
  relatedPapers: number
  topInstitutions: string[]
  keyResearchers: string[]
}

export class ArxivAnalyzer {
  private papers: ArxivPaper[] = []

  // Field mapping for arXiv categories to readable names
  private fieldMapping: Record<string, string> = {
    "cs.AI": "Artificial Intelligence",
    "cs.LG": "Machine Learning",
    "cs.CV": "Computer Vision",
    "cs.CL": "Natural Language Processing",
    "cs.RO": "Robotics",
    "cs.CR": "Cryptography and Security",
    "physics.bio-ph": "Biological Physics",
    "q-bio.BM": "Biomolecules",
    "q-bio.GN": "Genomics",
    "cond-mat.mtrl-sci": "Materials Science",
    "physics.med-ph": "Medical Physics",
    "econ.EM": "Econometrics",
    "stat.ML": "Statistical Machine Learning",
    "math.OC": "Optimization and Control",
    "physics.soc-ph": "Social Physics",
  }

  // Simulate loading and processing arXiv data
  async loadArxivData(): Promise<void> {
    // In a real implementation, this would load from the actual arXiv dataset
    // For demo purposes, we'll simulate with realistic data structure
    this.papers = this.generateSimulatedData()
  }

  private generateSimulatedData(): ArxivPaper[] {
    const categories = Object.keys(this.fieldMapping)
    const institutions = [
      "MIT",
      "Stanford University",
      "ETH Zurich",
      "University of Cambridge",
      "Max Planck Institute",
      "CERN",
      "Google Research",
      "DeepMind",
      "University of Toronto",
      "Carnegie Mellon University",
    ]

    const papers: ArxivPaper[] = []

    // Generate realistic paper data
    for (let i = 0; i < 1000; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const numAuthors = Math.floor(Math.random() * 5) + 1
      const authors = Array.from(
        { length: numAuthors },
        (_, j) => `Author ${i}-${j} (${institutions[Math.floor(Math.random() * institutions.length)]})`,
      )

      papers.push({
        id: `arxiv:${2020 + Math.floor(Math.random() * 4)}.${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
        title: this.generateRealisticTitle(category),
        authors,
        categories: [category],
        abstract: this.generateRealisticAbstract(category),
        submitter: authors[0],
        update_date: new Date(2020 + Math.random() * 4, Math.random() * 12, Math.random() * 28).toISOString(),
        authors_parsed: authors.map((author) => {
          const parts = author.split(" ")
          return [parts[parts.length - 1], parts.slice(0, -1).join(" "), ""] as [string, string, string]
        }),
      })
    }

    return papers
  }

  private generateRealisticTitle(category: string): string {
    const titleTemplates: Record<string, string[]> = {
      "cs.AI": [
        "Deep Reinforcement Learning for Autonomous Systems",
        "Neural Architecture Search with Evolutionary Algorithms",
        "Explainable AI in Healthcare Applications",
        "Multi-Agent Systems for Smart City Management",
      ],
      "cs.LG": [
        "Federated Learning with Differential Privacy",
        "Graph Neural Networks for Social Network Analysis",
        "Transfer Learning in Computer Vision",
        "Attention Mechanisms in Sequence Modeling",
      ],
      "physics.bio-ph": [
        "Protein Folding Dynamics Using Molecular Simulations",
        "Biophysical Models of Cell Migration",
        "Quantum Effects in Biological Systems",
        "Network Analysis of Metabolic Pathways",
      ],
      "q-bio.GN": [
        "CRISPR-Cas9 Applications in Gene Therapy",
        "Genomic Variants Associated with Disease Susceptibility",
        "Epigenetic Regulation in Development",
        "Population Genetics of Rare Diseases",
      ],
    }

    const templates = titleTemplates[category] || ["Advanced Research in " + this.fieldMapping[category]]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  private generateRealisticAbstract(category: string): string {
    const abstractTemplates: Record<string, string> = {
      "cs.AI":
        "This paper presents a novel approach to artificial intelligence that addresses current limitations in autonomous decision-making systems. Our methodology demonstrates significant improvements in performance metrics and provides new insights into the field.",
      "cs.LG":
        "We propose a new machine learning framework that combines deep learning with traditional statistical methods. Experimental results show superior performance on benchmark datasets and real-world applications.",
      "physics.bio-ph":
        "This study investigates the physical principles underlying biological processes using computational modeling and experimental validation. Our findings contribute to understanding complex biological systems.",
      "q-bio.GN":
        "We present a comprehensive genomic analysis that reveals new insights into genetic mechanisms. This research has implications for understanding disease susceptibility and therapeutic interventions.",
    }

    return (
      abstractTemplates[category] ||
      "This research contributes to the advancement of scientific knowledge in the field."
    )
  }

  analyzeResearchTrends(userField: string, userSkills: string[]): ResearchTrend[] {
    const relevantCategories = this.findRelevantCategories(userField, userSkills)
    const trends: ResearchTrend[] = []

    for (const category of relevantCategories) {
      const categoryPapers = this.papers.filter((p) => p.categories.includes(category))
      const recentPapers = categoryPapers
        .filter((p) => new Date(p.update_date) > new Date("2023-01-01"))
        .sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime())
        .slice(0, 5)

      const authors = categoryPapers.flatMap((p) => p.authors)
      const authorCounts = authors.reduce(
        (acc, author) => {
          acc[author] = (acc[author] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const topAuthors = Object.entries(authorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([author]) => author)

      trends.push({
        field: this.fieldMapping[category] || category,
        paperCount: categoryPapers.length,
        growthRate: Math.floor(Math.random() * 50) + 10, // Simulated growth rate
        topAuthors,
        recentPapers,
        fundingKeywords: this.extractFundingKeywords(categoryPapers),
      })
    }

    return trends.sort((a, b) => b.paperCount - a.paperCount)
  }

  private findRelevantCategories(userField: string, userSkills: string[]): string[] {
    const fieldKeywords: Record<string, string[]> = {
      "computer-science": ["cs.AI", "cs.LG", "cs.CV", "cs.CL", "cs.RO"],
      engineering: ["cs.RO", "physics.med-ph", "cond-mat.mtrl-sci"],
      "life-sciences": ["q-bio.BM", "q-bio.GN", "physics.bio-ph"],
      physics: ["physics.bio-ph", "physics.med-ph", "physics.soc-ph"],
      mathematics: ["math.OC", "stat.ML"],
      environmental: ["physics.soc-ph", "physics.bio-ph"],
    }

    const categories = fieldKeywords[userField] || []

    // Add categories based on skills
    userSkills.forEach((skill) => {
      const skillLower = skill.toLowerCase()
      if (skillLower.includes("machine learning") || skillLower.includes("ai")) {
        categories.push("cs.AI", "cs.LG", "stat.ML")
      }
      if (skillLower.includes("biology") || skillLower.includes("genomics")) {
        categories.push("q-bio.BM", "q-bio.GN", "physics.bio-ph")
      }
      if (skillLower.includes("robotics")) {
        categories.push("cs.RO")
      }
    })

    return [...new Set(categories)]
  }

  private extractFundingKeywords(papers: ArxivPaper[]): string[] {
    const fundingKeywords = [
      "NSF",
      "NIH",
      "EU Horizon",
      "ERC",
      "DARPA",
      "DOE",
      "NASA",
      "Wellcome Trust",
      "Gates Foundation",
      "Google Research",
      "Microsoft Research",
      "Amazon Science",
    ]

    // In a real implementation, this would analyze abstracts for funding mentions
    return fundingKeywords.slice(0, Math.floor(Math.random() * 4) + 2)
  }

  generateResearchOpportunities(trends: ResearchTrend[]): ResearchOpportunity[] {
    return trends.slice(0, 4).map((trend) => {
      let demand: ResearchOpportunity["demand"] = "Stable"
      if (trend.growthRate > 40) demand = "Very High"
      else if (trend.growthRate > 25) demand = "High"
      else if (trend.growthRate > 15) demand = "Emerging"

      return {
        field: trend.field,
        demand,
        growth: `+${trend.growthRate}%`,
        description: `Based on ${trend.paperCount} recent papers with ${trend.growthRate}% growth in publications`,
        relatedPapers: trend.paperCount,
        topInstitutions: this.extractInstitutions(trend.topAuthors),
        keyResearchers: trend.topAuthors.slice(0, 3),
      }
    })
  }

  private extractInstitutions(authors: string[]): string[] {
    const institutions = authors
      .map((author) => {
        const match = author.match(/$$([^)]+)$$/)
        return match ? match[1] : null
      })
      .filter(Boolean) as string[]

    return [...new Set(institutions)].slice(0, 3)
  }

  findSimilarResearchers(
    userField: string,
    userSkills: string[],
  ): Array<{
    name: string
    institution: string
    field: string
    papers: number
    hIndex: number
    recentWork: string[]
  }> {
    const relevantCategories = this.findRelevantCategories(userField, userSkills)
    const relevantPapers = this.papers.filter((p) => p.categories.some((cat) => relevantCategories.includes(cat)))

    const authorStats = relevantPapers.reduce(
      (acc, paper) => {
        paper.authors.forEach((author) => {
          if (!acc[author]) {
            acc[author] = {
              papers: [],
              categories: new Set<string>(),
            }
          }
          acc[author].papers.push(paper)
          paper.categories.forEach((cat) => acc[author].categories.add(cat))
        })
        return acc
      },
      {} as Record<string, { papers: ArxivPaper[]; categories: Set<string> }>,
    )

    return Object.entries(authorStats)
      .filter(([, stats]) => stats.papers.length >= 3)
      .sort(([, a], [, b]) => b.papers.length - a.papers.length)
      .slice(0, 4)
      .map(([author, stats]) => {
        const institution = author.match(/$$([^)]+)$$/)?.[1] || "Unknown Institution"
        const name = author.replace(/\s*$$[^)]*$$/, "")
        const primaryCategory = Array.from(stats.categories)[0]

        return {
          name,
          institution,
          field: this.fieldMapping[primaryCategory] || primaryCategory,
          papers: stats.papers.length,
          hIndex: Math.min(stats.papers.length, Math.floor(Math.random() * 30) + 10),
          recentWork: stats.papers
            .sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime())
            .slice(0, 3)
            .map((p) => p.title),
        }
      })
  }

  generateFundingOpportunities(trends: ResearchTrend[]): Array<{
    country: string
    funding: string
    programs: string
    strength: string
    relevantFields: string[]
  }> {
    const fundingData = [
      {
        country: "Germany",
        funding: "€2.8B",
        programs: "DFG, Horizon Europe, Max Planck",
        strength: "Engineering & AI",
        relevantFields: ["Artificial Intelligence", "Machine Learning", "Robotics"],
      },
      {
        country: "Netherlands",
        funding: "€1.2B",
        programs: "NWO, ERC, Dutch Research Council",
        strength: "Life Sciences & Physics",
        relevantFields: ["Biological Physics", "Genomics", "Medical Physics"],
      },
      {
        country: "Switzerland",
        funding: "€980M",
        programs: "SNF, EU Programs, ETH Grants",
        strength: "Innovation & Technology",
        relevantFields: ["Computer Vision", "Materials Science", "Optimization"],
      },
      {
        country: "Sweden",
        funding: "€750M",
        programs: "Vinnova, Formas, Swedish Research Council",
        strength: "Sustainability & Social Sciences",
        relevantFields: ["Social Physics", "Environmental Science", "Econometrics"],
      },
    ]

    // Filter funding opportunities based on user's research trends
    const userFields = trends.map((t) => t.field)

    return fundingData.filter((funding) =>
      funding.relevantFields.some((field) =>
        userFields.some(
          (userField) =>
            userField.toLowerCase().includes(field.toLowerCase()) ||
            field.toLowerCase().includes(userField.toLowerCase()),
        ),
      ),
    )
  }
}

// Export singleton instance
export const arxivAnalyzer = new ArxivAnalyzer()
