"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Users,
  Lightbulb,
  FileText,
  User,
  ExternalLink,
  BookOpen,
  Database,
  Calendar,
  BarChart3,
} from "lucide-react"
import type { AnalysisResults } from "../lib/research-service"

interface AnalysisResultsProps {
  results: AnalysisResults
  isLoading?: boolean
}

export function AnalysisResultsComponent({ results, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in-50 duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Real arXiv Dataset</h2>
          <p className="text-slate-600">Connecting to Supabase and processing actual research papers...</p>
          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <p>🔗 Establishing secure database connection</p>
            <p>📥 Fetching paper metadata and abstracts</p>
            <p>📊 Calculating growth trends and statistics</p>
            <p>🎯 Matching papers to your profile</p>
            <p>👨‍🔬 Identifying key researchers</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <Separator />

      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Research Opportunities</h2>
        <p className="text-slate-600">
          Based on real analysis of {results.insights.totalPapers.toLocaleString()} relevant research papers
        </p>
      </div>

      {/* Dataset Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-green-600" />
            Real Dataset Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.insights.datasetInfo.loadedPapers.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Papers Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{results.insights.totalPapers.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Relevant Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                <Calendar className="h-6 w-6 inline" />
              </div>
              <div className="text-sm text-slate-600">{results.insights.datasetInfo.dateRange}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {results.insights.datasetInfo.topCategories.length}
              </div>
              <div className="text-sm text-slate-600">Research Areas</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Top Research Categories:
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.insights.datasetInfo.topCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-white text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📈 Match Accuracy:</h4>
              <div className="text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Field Relevance:</span>
                  <span className="font-medium text-green-600">
                    {results.insights.datasetInfo.loadedPapers > 0
                      ? Math.round((results.insights.totalPapers / results.insights.datasetInfo.loadedPapers) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Data Coverage:</span>
                  <span className="font-medium text-blue-600">{results.insights.datasetInfo.dateRange}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Key Insights from Real Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{results.insights.totalPapers.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Matching Papers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{results.insights.trendingFields.length}</div>
              <div className="text-sm text-slate-600">High-Growth Fields</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{results.researchers.length}</div>
              <div className="text-sm text-slate-600">Key Researchers</div>
            </div>
          </div>

          {results.insights.trendingFields.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">🚀 Fastest Growing Research Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {results.insights.trendingFields.map((field, index) => (
                  <Badge key={index} className="bg-green-100 text-green-700">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">💡 Personalized Recommendations:</h4>
            <ul className="space-y-1 text-sm text-slate-600">
              {results.insights.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Research Fields in Demand */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Research Fields in High Demand (From Real Papers)
          </CardTitle>
          <CardDescription>Based on actual publication trends and growth rates from arXiv papers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.researchFields.map((field, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900">{field.field}</h3>
                  <Badge
                    variant={
                      field.demand === "Very High" ? "default" : field.demand === "High" ? "secondary" : "outline"
                    }
                  >
                    {field.demand} Demand
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{field.description}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span>{field.relatedPapers.toLocaleString()} papers analyzed</span>
                  <span className="font-medium text-green-600">{field.growth}</span>
                </div>

                {field.keyResearchers.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs text-slate-500">Key researchers: </span>
                    <span className="text-xs text-slate-700">{field.keyResearchers.slice(0, 2).join(", ")}</span>
                  </div>
                )}

                {field.samplePapers.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1">📄 Sample Papers from Analysis:</h5>
                    {field.samplePapers.slice(0, 2).map((paper, idx) => (
                      <div key={idx} className="text-xs text-slate-600 mb-1">
                        <div className="font-medium truncate" title={paper.title}>
                          {paper.title}
                        </div>
                        <div className="text-slate-500">
                          {paper.authors} ({paper.year}) - arXiv:{paper.id}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leading Researchers */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Leading Researchers (From Real Publications)
          </CardTitle>
          <CardDescription>
            Active researchers identified from actual arXiv publications matching your interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.researchers.map((researcher, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold text-slate-900">{researcher.name}</h3>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <p>
                    <span className="font-medium">Institution:</span> {researcher.institution}
                  </p>
                  <p>
                    <span className="font-medium">Field:</span> {researcher.field}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs bg-white px-2 py-1 rounded">
                      <FileText className="h-3 w-3 inline mr-1" />
                      {researcher.papers} Papers
                    </span>
                    <span className="text-xs bg-white px-2 py-1 rounded">h-index: {researcher.hIndex}</span>
                  </div>
                </div>

                {researcher.topPaper && (
                  <div className="mb-2 p-2 bg-white rounded border">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1">🏆 Notable Work:</h5>
                    <div className="text-xs text-slate-600 truncate" title={researcher.topPaper}>
                      {researcher.topPaper}
                    </div>
                  </div>
                )}

                {researcher.recentPapers.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1">📚 Recent Publications:</h5>
                    {researcher.recentPapers.slice(0, 2).map((paper, idx) => (
                      <div key={idx} className="text-xs text-slate-600 mb-1 truncate" title={paper}>
                        {paper}
                      </div>
                    ))}
                  </div>
                )}

                <Button size="sm" variant="outline" className="w-full bg-transparent mt-2">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Publications
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Source Attribution */}
      <Card className="shadow-lg border-0 bg-slate-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <BookOpen className="h-4 w-4" />
            <span>
              ✅ Analysis based on <strong>real arXiv dataset</strong> fetched from Supabase. Processed{" "}
              {results.insights.datasetInfo.loadedPapers.toLocaleString()} actual papers spanning{" "}
              {results.insights.datasetInfo.dateRange}. Found {results.insights.totalPapers.toLocaleString()} papers
              directly relevant to your profile (
              {results.insights.datasetInfo.loadedPapers > 0
                ? Math.round((results.insights.totalPapers / results.insights.datasetInfo.loadedPapers) * 100)
                : 0}
              % match rate).
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
