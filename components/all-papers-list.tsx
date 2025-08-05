"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PaperCard } from "./paper-card"
import type { ArxivDatasetEntry } from "@/lib/dataset-loader"
import { Search } from "lucide-react"

interface AllPapersListProps {
  papers: ArxivDatasetEntry[]
}

export function AllPapersList({ papers }: AllPapersListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.categories.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search papers by title, author, abstract, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
        ) : (
          <p className="col-span-full text-center text-slate-600">No papers found matching your search.</p>
        )}
      </div>
    </div>
  )
}
