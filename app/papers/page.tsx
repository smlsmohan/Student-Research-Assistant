import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { getArxivPapersFromSupabase } from "@/app/actions/arxiv-data"
import { AllPapersList } from "@/components/all-papers-list"

export default async function PapersPage() {
  const allPapers = await getArxivPapersFromSupabase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">ResearchPath</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/research-assistant">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Assistant
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline">Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">All Research Papers</h1>
          <p className="text-xl text-slate-600">
            Browse the full dataset of {allPapers.length.toLocaleString()} arXiv papers
          </p>
        </div>

        <AllPapersList papers={allPapers} />
      </div>
    </div>
  )
}
