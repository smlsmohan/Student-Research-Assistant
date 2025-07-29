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

export default function Component() {
  const [formData, setFormData] = useState<ResearchFormData>({
    fieldOfStudy: "",
    yearsOfExperience: "",
    skills: [],
    ageGroup: "",
    industryExperience: "",
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
      setShowResults(true)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const mockResults = {
    researchFields: [
      { field: "Artificial Intelligence & Machine Learning", demand: "Very High", growth: "+45%" },
      { field: "Sustainable Energy Systems", demand: "High", growth: "+38%" },
      { field: "Biotechnology & Genomics", demand: "High", growth: "+32%" },
      { field: "Quantum Computing", demand: "Emerging", growth: "+67%" },
    ],
    countries: [
      { country: "Germany", funding: "€2.8B", programs: "Horizon Europe, DFG", strength: "Engineering & Tech" },
      { country: "Netherlands", funding: "€1.2B", programs: "NWO, ERC", strength: "Life Sciences" },
      { country: "Switzerland", funding: "€980M", programs: "SNF, EU Programs", strength: "Innovation Hub" },
      { country: "Sweden", funding: "€750M", programs: "Vinnova, Formas", strength: "Sustainability" },
    ],
    researchers: [
      { name: "Prof. Elena Rodriguez", institution: "ETH Zurich", field: "AI Ethics", papers: 127, hIndex: 34 },
      { name: "Dr. Marcus Chen", institution: "TU Delft", field: "Renewable Energy", papers: 89, hIndex: 28 },
      { name: "Prof. Sarah Johnson", institution: "KTH Stockholm", field: "Quantum Systems", papers: 156, hIndex: 41 },
      {
        name: "Dr. Ahmed Hassan",
        institution: "Max Planck Institute",
        field: "Biotechnology",
        papers: 203,
        hIndex: 52,
      },
    ],
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
                {/* Field of Study */}
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, fieldOfStudy: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="life-sciences">Life Sciences</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="environmental">Environmental Science</SelectItem>
                      <SelectItem value="social-sciences">Social Sciences</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
