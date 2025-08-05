import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { getArxivPapersFromSupabase } from "@/app/actions/arxiv-data"
import { AllPapersList } from "@/components/all-papers-list"
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default async function PapersPage() {
  const allPapers = await getArxivPapersFromSupabase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-gray-800/80 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">ResearchPath</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/research-assistant">
                <Button variant="ghost" className="flex items-center gap-2 dark:text-slate-300 dark:hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Assistant
                </Button>
              </Link>
              <Link href="/support">
                <Button
                  variant="outline"
                  className="dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800 bg-transparent"
                >
                  Support
                </Button>
              </Link>
              <ThemeToggle /> {/* Add ThemeToggle here */}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">All Research Papers</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Browse the full dataset of {allPapers.length.toLocaleString()} arXiv papers
          </p>
        </div>

        <AllPapersList papers={allPapers} />
      </div>
    </div>
  )
}
