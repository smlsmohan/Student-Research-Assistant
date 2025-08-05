"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Database,
  Shield,
  RefreshCw,
  Users,
  ArrowLeft,
  CheckCircle,
  Building,
  Award,
  Clock,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default function AboutPage() {
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
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2 dark:text-slate-300 dark:hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/research-assistant">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  Try Free
                </Button>
              </Link>
              <ThemeToggle /> {/* Add ThemeToggle here */}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            About ResearchPath
          </Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">
            How We Help You Find Research Opportunities
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Learn about our data sources, methodology, and commitment to helping students succeed
          </p>
        </div>

        {/* Data Sources */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Our Data Sources
            </CardTitle>
            <CardDescription className="dark:text-slate-300">
              We aggregate information from trusted academic and institutional sources across Europe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Official EU Databases</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Horizon Europe Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    EURAXESS Research Positions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    European Research Council (ERC)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Marie Skłodowska-Curie Actions
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">University Partners</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    500+ European Universities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Research Institute Partnerships
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    National Funding Agencies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Academic Job Boards
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Process Data */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <RefreshCw className="h-6 w-6 text-green-600 dark:text-green-400" />
              Data Processing & Updates
            </CardTitle>
            <CardDescription className="dark:text-slate-300">
              Our automated systems ensure you get the most current and relevant information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4 dark:text-blue-400" />
                <h3 className="font-semibold mb-2 dark:text-slate-100">Real-time Updates</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Our systems check for new opportunities every 6 hours
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4 dark:text-green-400" />
                <h3 className="font-semibold mb-2 dark:text-slate-100">Quality Verification</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Each opportunity is verified for accuracy and legitimacy
                </p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4 dark:text-purple-400" />
                <h3 className="font-semibold mb-2 dark:text-slate-100">AI Matching</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Advanced algorithms match opportunities to your profile
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Categories */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <Building className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              What Information We Collect
            </CardTitle>
            <CardDescription className="dark:text-slate-300">
              Comprehensive data to help you make informed decisions about your research career
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 dark:text-slate-100">Research Opportunities</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• PhD and Postdoc positions</li>
                  <li>• Research assistant roles</li>
                  <li>• Internship programs</li>
                  <li>• Collaborative research projects</li>
                  <li>• Industry partnerships</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 dark:text-slate-100">Funding Information</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Grant amounts and duration</li>
                  <li>• Application deadlines</li>
                  <li>• Eligibility requirements</li>
                  <li>• Success rates</li>
                  <li>• Contact information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 dark:text-slate-100">Researcher Profiles</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Academic background</li>
                  <li>• Research interests</li>
                  <li>• Recent publications</li>
                  <li>• Contact details</li>
                  <li>• Collaboration history</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 dark:text-slate-100">Market Insights</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Research field trends</li>
                  <li>• Funding landscape analysis</li>
                  <li>• Geographic opportunities</li>
                  <li>• Career progression paths</li>
                  <li>• Industry demand forecasts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8 dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              Privacy & Data Security
            </CardTitle>
            <CardDescription className="dark:text-slate-300">
              Your privacy is our priority. Learn how we protect your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 dark:text-slate-100">Data Protection</h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>• GDPR compliant</li>
                  <li>• End-to-end encryption</li>
                  <li>• Secure data storage</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 dark:text-slate-100">Your Control</h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Data export options</li>
                  <li>• Account deletion</li>
                  <li>• Privacy settings</li>
                  <li>• Consent management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Questions About Our Data?
            </CardTitle>
            <CardDescription className="dark:text-slate-300">
              We're transparent about our methods and happy to answer your questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  Contact Support
                </Button>
              </Link>
              <Button
                variant="outline"
                className="dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800 bg-transparent"
              >
                Request Data Sources List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
