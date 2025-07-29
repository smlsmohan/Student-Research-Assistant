"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft } from "lucide-react"
import ResearchAssistant from "../../research-assistant"

export default function ResearchAssistantPage() {
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
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline">Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <ResearchAssistant />
    </div>
  )
}
