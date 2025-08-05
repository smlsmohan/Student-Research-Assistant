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
  ArrowRight,
} from "lucide-react"
import type { AnalysisResults } from "../lib/research-service"
import Link from "next/link" // Import Link

interface AnalysisResultsProps {
  results: AnalysisResults
  isLoading?: boolean
}

export function AnalysisResultsComponent({ results, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in-50 duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4 dark:border-blue-400"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 dark:text-slate-100">Analyzing Real arXiv Dataset</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Fetching and processing actual research papers via server...
          </p>
          <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p>🔗 Establishing secure database connection (server-side)</p>
            <p>📥 Fetching paper metadata and abstracts (server-side)</p>
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
      <Separator className="dark:bg-gray-700" />

      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-100">Your Research Opportunities</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Based on real analysis of {results.insights.totalPapers.toLocaleString()} relevant research papers
        </p>
      </div>

      {/* Dataset Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
            Real Dataset Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {results.insights.datasetInfo.loadedPapers.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Papers Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {results.insights.totalPapers.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Relevant Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                <Calendar className="h-6 w-6 inline" />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{results.insights.datasetInfo.dateRange}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {results.insights.datasetInfo.topCategories.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Research Areas</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2 dark:text-slate-100">
                <BarChart3 className="h-4 w-4" />
                Top Research Categories:
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.insights.datasetInfo.topCategories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-white text-xs dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 dark:text-slate-100">📈 Match Accuracy:</h4>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Field Relevance:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {results.insights.datasetInfo.loadedPapers > 0
                      ? Math.round((results.insights.totalPapers / results.insights.datasetInfo.loadedPapers) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Data Coverage:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {results.insights.datasetInfo.dateRange}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/papers">
              <Button
                variant="outline"
                className="bg-white dark:bg-gray-700 dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800"
              >
                View All {results.insights.datasetInfo.loadedPapers.toLocaleString()} Papers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Key Insights from Real Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {results.insights.totalPapers.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Matching Papers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {results.insights.trendingFields.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">High-Growth Fields</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {results.researchers.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Key Researchers</div>
            </div>
          </div>

          {results.insights.trendingFields.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 dark:text-slate-100">🚀 Fastest Growing Research Areas:</h4>
              <div className="flex flex-wrap gap-2">
                {results.insights.trendingFields.map((field, index) => (
                  <Badge key={index} className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2 dark:text-slate-100">💡 Personalized Recommendations:</h4>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {results.insights.recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1 dark:text-blue-400">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Research Fields in Demand */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            Research Fields in High Demand (From Real Papers)
          </CardTitle>
          <CardDescription className="dark:text-slate-300">
            Based on actual publication trends and growth rates from arXiv papers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.researchFields.map((field, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 dark:border-gray-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{field.field}</h3>
                  <Badge
                    variant={
                      field.demand === "Very High" ? "default" : field.demand === "High" ? "secondary" : "outline"
                    }
                    className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                  >
                    {field.demand} Demand
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2 dark:text-slate-300">{field.description}</p>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2 dark:text-slate-400">
                  <span>{field.relatedPapers.toLocaleString()} papers analyzed</span>
                  <span className="font-medium text-green-600 dark:text-green-400">{field.growth}</span>
                </div>

                {field.keyResearchers.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Key researchers: </span>
                    <span className="text-xs text-slate-700 dark:text-slate-200">
                      {field.keyResearchers.slice(0, 2).join(", ")}
                    </span>
                  </div>
                )}

                {field.samplePapers.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border dark:bg-gray-700 dark:border-gray-600">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1 dark:text-slate-200">
                      📄 Sample Papers from Analysis:
                    </h5>
                    {field.samplePapers.slice(0, 2).map((paper, idx) => (
                      <div key={idx} className="text-xs text-slate-600 mb-1 dark:text-slate-300">
                        <div className="font-medium truncate" title={paper.title}>
                          {paper.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
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
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Leading Researchers (From Real Publications)
          </CardTitle>
          <CardDescription className="dark:text-slate-300">
            Active researchers identified from actual arXiv publications matching your interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.researchers.map((researcher, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 dark:border-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{researcher.name}</h3>
                </div>
                <div className="space-y-1 text-sm mb-3">
                  <p className="dark:text-slate-300">
                    <span className="font-medium">Institution:</span> {researcher.institution}
                  </p>
                  <p className="dark:text-slate-300">
                    <span className="font-medium">Field:</span> {researcher.field}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs bg-white px-2 py-1 rounded dark:bg-gray-700 dark:text-slate-100">
                      <FileText className="h-3 w-3 inline mr-1" />
                      {researcher.papers} Papers
                    </span>
                    <span className="text-xs bg-white px-2 py-1 rounded dark:bg-gray-700 dark:text-slate-100">
                      h-index: {researcher.hIndex}
                    </span>
                  </div>
                </div>

                {researcher.topPaper && (
                  <div className="mb-2 p-2 bg-white rounded border dark:bg-gray-700 dark:border-gray-600">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1 dark:text-slate-200">🏆 Notable Work:</h5>
                    <div className="text-xs text-slate-600 truncate dark:text-slate-300" title={researcher.topPaper}>
                      {researcher.topPaper}
                    </div>
                  </div>
                )}

                {researcher.recentPapers.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border dark:bg-gray-700 dark:border-gray-600">
                    <h5 className="text-xs font-semibold text-slate-700 mb-1 dark:text-slate-200">
                      📚 Recent Publications:
                    </h5>
                    {researcher.recentPapers.slice(0, 2).map((paper, idx) => (
                      <div key={idx} className="text-xs text-slate-600 mb-1 truncate dark:text-slate-300" title={paper}>
                        {paper}
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent mt-2 dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Publications
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Source Attribution */}
      <Card className="shadow-lg border-0 bg-slate-50 dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <BookOpen className="h-4 w-4" />
            <span>
              ✅ Analysis based on <strong>real arXiv dataset</strong> fetched from Supabase via a secure server action.
              Processed {results.insights.datasetInfo.loadedPapers.toLocaleString()} actual papers spanning{" "}
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
