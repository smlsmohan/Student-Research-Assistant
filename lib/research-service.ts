import { realArxivAnalyzer, type RealAnalysisResults } from "./real-arxiv-analyzer"

export interface FormData {
  fieldOfStudy: string
  yearsOfExperience: string
  skills: string[]
  // Removed: ageGroup: string
  industryExperience: string
  publicationYearFrom?: string
  publicationYearTo?: string
  // Removed: authorName?: string
  // Removed: journalOrDoi?: string
}

export type AnalysisResults = RealAnalysisResults

export class ResearchService {
  async analyzeOpportunities(formData: FormData): Promise<AnalysisResults> {
    console.log("🔍 Starting real dataset analysis from Supabase...")
    console.log("📊 User profile:", formData)

    try {
      const results = await realArxivAnalyzer.analyzeUserProfile({
        fieldOfStudy: formData.fieldOfStudy,
        skills: formData.skills,
        yearsOfExperience: formData.yearsOfExperience,
        publicationYearFrom: formData.publicationYearFrom,
        publicationYearTo: formData.publicationYearTo,
        // Removed: authorName: formData.authorName,
        // Removed: journalOrDoi: formData.journalOrDoi,
      })

      console.log("✅ Analysis complete!")
      console.log(`📈 Found ${results.insights.totalPapers} relevant papers`)
      console.log(`🔬 Identified ${results.researchFields.length} research opportunities`)
      console.log(`👨‍🔬 Found ${results.researchers.length} key researchers`)

      return results
    } catch (error) {
      console.error("❌ Analysis failed:", error)
      throw error
    }
  }
}

export const researchService = new ResearchService()
