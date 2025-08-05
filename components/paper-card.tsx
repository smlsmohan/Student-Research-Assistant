import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, User, Calendar } from "lucide-react"
import Link from "next/link"
import type { ArxivDatasetEntry } from "@/lib/dataset-loader"

interface PaperCardProps {
  paper: ArxivDatasetEntry
}

export function PaperCard({ paper }: PaperCardProps) {
  const arxivId = paper.id.replace("arxiv:", "")
  const arxivUrl = `https://arxiv.org/abs/${arxivId}`
  const displayAuthors =
    paper.authors.split(",").slice(0, 3).join(", ") + (paper.authors.split(",").length > 3 ? " et al." : "")
  const displayCategories = paper.categories
    .split(" ")
    .slice(0, 3)
    .map((cat) => cat.split(".").pop() || cat)
    .join(", ")

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow dark:bg-gray-800/80 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2 dark:text-slate-100">{paper.title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
          <User className="h-3 w-3" />
          {displayAuthors}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Calendar className="h-3 w-3" />
          <span>{new Date(paper.update_date).getFullYear()}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {paper.categories
            .split(" ")
            .slice(0, 3)
            .map((cat, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-slate-100">
                {cat}
              </Badge>
            ))}
        </div>
        <p className="line-clamp-3 text-slate-700 dark:text-slate-200">{paper.abstract}</p>
        <Link href={arxivUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 bg-transparent dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View on arXiv
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
