"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { researchService, type FormData as ResearchFormData, type AnalysisResults } from "./lib/research-service"
import { AnalysisResultsComponent } from "./components/analysis-results"
import { FieldOfStudyCombobox } from "@/components/field-of-study-combobox" // Import the new combobox

export default function Component() {
  const [formData, setFormData] = useState<ResearchFormData>({
    fieldOfStudy: "",
    yearsOfExperience: "",
    skills: [],
    ageGroup: "",
    industryExperience: "",
    publicationYearFrom: "", // New state
    publicationYearTo: "", // New state
    authorName: "", // New state
    journalOrDoi: "", // New state
  })
  const [showResults, setShowResults] = useState(false)
  const [skillInput, setSkillInput] = useState("")
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }))
      }
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    try {
      const results = await researchService.analyzeOpportunities(formData)
      setAnalysisResults(results)
      setShowResults(true)
    } catch (error) {
      console.error("Analysis failed:", error)
      // Fallback to mock data if analysis fails
      // This mock data is for demonstration if the real data fetching fails.
      // In a production app, you might want a more robust error handling or UI.
      setAnalysisResults({
        researchFields: [
          {
            field: "Artificial Intelligence & Machine Learning",
            demand: "Very High",
            growth: "+45%",
            description: "Mock data based on AI/ML trends.",
            relatedPapers: 1500,
            topInstitutions: ["MIT", "Stanford University"],
            keyResearchers: ["Prof. A. Turing", "Dr. G. Hinton"],
            samplePapers: [
              { title: "The AI Revolution", authors: "A. Turing et al.", year: "2023", id: "mock:1" },
              { title: "Machine Learning Breakthroughs", authors: "G. Hinton et al.", year: "2022", id: "mock:2" },
            ],
          },
          {
            field: "Sustainable Energy Systems",
            demand: "High",
            growth: "+38%",
            description: "Mock data based on energy research trends.",
            relatedPapers: 800,
            topInstitutions: ["ETH Zurich", "TU Delft"],
            keyResearchers: ["Prof. E. Rodriguez", "Dr. M. Chen"],
            samplePapers: [
              { title: "Future of Green Energy", authors: "E. Rodriguez et al.", year: "2023", id: "mock:3" },
              { title: "Advanced Solar Cells", authors: "M. Chen et al.", year: "2022", id: "mock:4" },
            ],
          },
        ],
        researchers: [
          {
            name: "Prof. Elena Rodriguez",
            institution: "ETH Zurich",
            field: "AI Ethics",
            papers: 127,
            hIndex: 34,
            recentPapers: ["Ethical AI in Practice", "Bias in Algorithms"],
            topPaper: "Ethical AI in Practice",
          },
          {
            name: "Dr. Marcus Chen",
            institution: "TU Delft",
            field: "Renewable Energy",
            papers: 89,
            hIndex: 28,
            recentPapers: ["Next-Gen Solar Panels", "Wind Turbine Efficiency"],
            topPaper: "Next-Gen Solar Panels",
          },
        ],
        insights: {
          totalPapers: 2300,
          trendingFields: ["Artificial Intelligence & Machine Learning", "Sustainable Energy Systems"],
          recommendedActions: [
            "Explore interdisciplinary research opportunities.",
            "Focus on foundational research in identified trending areas.",
            "Target high-growth research areas for maximum career impact.",
          ],
          datasetInfo: {
            loadedPapers: 10000,
            dateRange: "2015 - 2024",
            topCategories: ["Computer Science", "Physics", "Life Sciences"],
            fieldDistribution: {
              "Computer Science": 5000,
              Physics: 3000,
              "Life Sciences": 2000,
            },
          },
        },
      })
      setShowResults(true)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // The mockResults object is no longer directly used for display,
  // but kept for reference if needed for error fallback.
  const mockResults: AnalysisResults = {
    researchFields: [
      {
        field: "Artificial Intelligence & Machine Learning",
        demand: "Very High",
        growth: "+45%",
        description: "Mock data based on AI/ML trends.",
        relatedPapers: 1500,
        topInstitutions: ["MIT", "Stanford University"],
        keyResearchers: ["Prof. A. Turing", "Dr. G. Hinton"],
        samplePapers: [
          { title: "The AI Revolution", authors: "A. Turing et al.", year: "2023", id: "mock:1" },
          { title: "Machine Learning Breakthroughs", authors: "G. Hinton et al.", year: "2022", id: "mock:2" },
        ],
      },
      {
        field: "Sustainable Energy Systems",
        demand: "High",
        growth: "+38%",
        description: "Mock data based on energy research trends.",
        relatedPapers: 800,
        topInstitutions: ["ETH Zurich", "TU Delft"],
        keyResearchers: ["Prof. E. Rodriguez", "Dr. M. Chen"],
        samplePapers: [
          { title: "Future of Green Energy", authors: "E. Rodriguez et al.", year: "2023", id: "mock:3" },
          { title: "Advanced Solar Cells", authors: "M. Chen et al.", year: "2022", id: "mock:4" },
        ],
      },
    ],
    researchers: [
      {
        name: "Prof. Elena Rodriguez",
        institution: "ETH Zurich",
        field: "AI Ethics",
        papers: 127,
        hIndex: 34,
        recentPapers: ["Ethical AI in Practice", "Bias in Algorithms"],
        topPaper: "Ethical AI in Practice",
      },
      {
        name: "Dr. Marcus Chen",
        institution: "TU Delft",
        field: "Renewable Energy",
        papers: 89,
        hIndex: 28,
        recentPapers: ["Next-Gen Solar Panels", "Wind Turbine Efficiency"],
        topPaper: "Next-Gen Solar Panels",
      },
    ],
    insights: {
      totalPapers: 2300, // Sum of relatedPapers from mock researchFields
      trendingFields: ["Artificial Intelligence & Machine Learning", "Sustainable Energy Systems"],
      recommendedActions: [
        "Explore interdisciplinary research opportunities.",
        "Focus on foundational research in identified trending areas.",
        "Target high-growth research areas for maximum career impact.",
      ],
      datasetInfo: {
        loadedPapers: 10000, // A mock number for total loaded papers
        dateRange: "2015 - 2024", // A mock date range
        topCategories: ["Computer Science", "Physics", "Life Sciences"],
        fieldDistribution: {
          "Computer Science": 5000,
          Physics: 3000,
          "Life Sciences": 2000,
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900">Student Research Assistant</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover research opportunities, funding programs, and connect with leading researchers in your field across
            Europe
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Find Your Research Path
            </CardTitle>
            <CardDescription>
              Tell us about your background and interests to get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field of Study - Using new Combobox */}
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <FieldOfStudyCombobox
                    value={formData.fieldOfStudy}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, fieldOfStudy: value }))}
                  />
                </div>

                {/* Years of Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Research Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="20"
                    placeholder="0"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, yearsOfExperience: e.target.value }))}
                  />
                </div>

                {/* Publication Year Range */}
                <div className="space-y-2">
                  <Label htmlFor="pubYearFrom">Publication Year (From)</Label>
                  <Input
                    id="pubYearFrom"
                    type="number"
                    min="1990" // ArXiv started in 1991
                    max={new Date().getFullYear().toString()}
                    placeholder="e.g., 2020"
                    value={formData.publicationYearFrom}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publicationYearFrom: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pubYearTo">Publication Year (To)</Label>
                  <Input
                    id="pubYearTo"
                    type="number"
                    min="1990"
                    max={new Date().getFullYear().toString()}
                    placeholder="e.g., 2024"
                    value={formData.publicationYearTo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publicationYearTo: e.target.value }))}
                  />
                </div>

                {/* Author Name */}
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    placeholder="e.g., Albert Einstein"
                    value={formData.authorName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                  />
                </div>

                {/* Journal/DOI */}
                <div className="space-y-2">
                  <Label htmlFor="journalOrDoi">Journal Reference or DOI</Label>
                  <Input
                    id="journalOrDoi"
                    placeholder="e.g., Phys. Rev. Lett. or 10.1103/..."
                    value={formData.journalOrDoi}
                    onChange={(e) => setFormData((prev) => ({ ...prev, journalOrDoi: e.target.value }))}
                  />
                </div>

                {/* Age Group */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age Group</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, ageGroup: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-20">{"<20"}</SelectItem>
                      <SelectItem value="20-25">20–25</SelectItem>
                      <SelectItem value="26-30">26–30</SelectItem>
                      <SelectItem value="31-plus">31+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Experience */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Experience</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Software development, Healthcare, Finance"
                    value={formData.industryExperience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, industryExperience: e.target.value }))}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills">Skills & Technologies</Label>
                <Input
                  id="skills"
                  placeholder="Type a skill and press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                <Search className="mr-2 h-4 w-4" />
                Search Opportunities
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {(showResults || analysisResults) && (
          <AnalysisResultsComponent results={analysisResults || mockResults} isLoading={isAnalyzing} />
        )}
      </div>
    </div>
  )
}
