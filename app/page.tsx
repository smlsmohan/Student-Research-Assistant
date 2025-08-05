"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Database,
  Zap,
  BookOpen,
  GraduationCap,
  Target,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 text-slate-900 dark:text-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-gray-800/80 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">ResearchPath</span>
            </div>
            <div className="flex items-center gap-6">
              {" "}
              {/* Combined for better alignment */}
              <Link
                href="#features"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                About
              </Link>
              <Link
                href="/support"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Support
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
            For Master's Students & Early Career Researchers
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 dark:text-slate-100">
            Find Your Perfect
            <span className="text-blue-600 block dark:text-blue-400">Research Opportunity</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto dark:text-slate-300">
            Connect with leading researchers, discover funded opportunities, and accelerate your academic career.
            Designed specifically for master's students and researchers aged 22-45.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/research-assistant">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Start Free Search <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* Updated "Watch Demo" button to link to the "How It Works" section */}
            <Link href="#how-it-works" passHref>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-4 dark:text-slate-400">
            ✨ First 5 searches completely free • No credit card required
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2 dark:text-blue-400">15,000+</div>
              <div className="text-slate-600 dark:text-slate-300">Research Opportunities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2 dark:text-blue-400">€2.8B</div>
              <div className="text-slate-600 dark:text-slate-300">Available Funding</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2 dark:text-blue-400">500+</div>
              <div className="text-slate-600 dark:text-slate-300">Partner Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2 dark:text-blue-400">95%</div>
              <div className="text-slate-600 dark:text-slate-300">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">
              Everything You Need to Advance Your Research Career
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
              Our AI-powered platform connects you with the right opportunities, funding, and mentors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-4 dark:text-blue-400" />
                <CardTitle className="dark:text-slate-100">Personalized Matching</CardTitle>
                <CardDescription className="dark:text-slate-300">
                  AI-powered recommendations based on your skills, experience, and research interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Smart profile analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Field-specific recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Career stage matching</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <Database className="h-12 w-12 text-green-600 mb-4 dark:text-green-400" />
                <CardTitle className="dark:text-slate-100">Comprehensive Database</CardTitle>
                <CardDescription className="dark:text-slate-300">
                  Access to EU-wide research opportunities, funding programs, and academic positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time opportunity updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Funding deadline tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multi-language support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4 dark:text-purple-400" />
                <CardTitle className="dark:text-slate-100">Network Building</CardTitle>
                <CardDescription className="dark:text-slate-300">
                  Connect with leading researchers, potential supervisors, and peer collaborators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Researcher profiles & contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Collaboration matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Mentorship opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">How ResearchPath Works</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Simple steps to find your next research opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-blue-700">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-slate-100">1. Create Your Profile</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Tell us about your field, skills, experience, and research interests
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-700">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-slate-100">2. Get Matched</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Our AI analyzes thousands of opportunities to find your perfect matches
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-purple-700">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-slate-100">3. Apply & Connect</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Access direct contact information and application guidelines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Start free, upgrade when you need more searches
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  selectedPlan === "monthly"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  selectedPlan === "yearly"
                    ? "bg-blue-600 text-white dark:bg-blue-700"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-700 text-xs dark:bg-green-900 dark:text-green-300">
                  Save 17%
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl dark:text-slate-100">Free Trial</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4 dark:text-slate-100">€0</div>
                <CardDescription className="dark:text-slate-300">Perfect for trying out the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>5 free searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Basic matching algorithm</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Access to opportunity database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/research-assistant" className="block">
                  <Button
                    className="w-full bg-transparent dark:bg-transparent dark:text-slate-100 dark:border-blue-700 dark:hover:bg-blue-800"
                    variant="outline"
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Monthly Plan */}
            <Card
              className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700 ${selectedPlan === "monthly" ? "ring-2 ring-blue-600 dark:ring-blue-400" : ""}`}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl dark:text-slate-100">Monthly</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4 dark:text-slate-100">€5</div>
                <CardDescription className="dark:text-slate-300">For active job seekers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced AI matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Weekly opportunity alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Researcher contact info</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  Choose Monthly
                </Button>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card
              className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm relative dark:bg-gray-800/80 dark:border-gray-700 ${selectedPlan === "yearly" ? "ring-2 ring-blue-600 dark:ring-blue-400" : ""}`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white dark:bg-green-700">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl dark:text-slate-100">Yearly</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4 dark:text-slate-100">€50</div>
                <CardDescription className="dark:text-slate-300">Best value for serious researchers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Everything in Monthly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Save €10 per year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Exclusive webinars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>1-on-1 career consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Early access to new features</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  Choose Yearly
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 dark:text-slate-300">
                  "ResearchPath helped me find my PhD position at ETH Zurich. The personalized matching was spot-on!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                    <span className="text-blue-600 font-semibold dark:text-blue-300">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold dark:text-slate-100">Sarah Martinez</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">PhD Student, Computer Science</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 dark:text-slate-300">
                  "Found three relevant funding opportunities in my first search. The platform saved me weeks of
                  research."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900">
                    <span className="text-green-600 font-semibold dark:text-green-300">MK</span>
                  </div>
                  <div>
                    <div className="font-semibold dark:text-slate-100">Michael Kim</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Master's Student, Engineering</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4 dark:text-slate-300">
                  "The researcher network feature connected me with my current supervisor. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center dark:bg-purple-900">
                    <span className="text-purple-600 font-semibold dark:text-purple-300">AL</span>
                  </div>
                  <div>
                    <div className="font-semibold dark:text-slate-100">Anna Lopez</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Research Assistant, Biology</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">
            Ready to Accelerate Your Research Career?
          </h2>
          <p className="text-xl text-slate-600 mb-8 dark:text-slate-300">
            Join thousands of students who have found their perfect research opportunities
          </p>
          <Link href="/research-assistant">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Start Your Free Search <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-slate-500 mt-4 dark:text-slate-400">No credit card required • 5 free searches</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-bold">ResearchPath</span>
              </div>
              <p className="text-slate-400">Connecting master's students with research opportunities across Europe.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/research-assistant" className="hover:text-white">
                    Research Assistant
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ResearchPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
