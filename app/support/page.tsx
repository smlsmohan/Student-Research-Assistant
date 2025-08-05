"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  Book,
  Video,
  Users,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle

export default function SupportPage() {
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 dark:text-slate-100">How Can We Help You?</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Get support, find answers, or connect with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Contact Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-medium dark:text-slate-100">Email Support</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">support@researchpath.eu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-medium dark:text-slate-100">Phone Support</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">+31 20 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <div className="font-medium dark:text-slate-100">Response Time</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Within 24 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-slate-100">
                  <Book className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Self-Help Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-gray-700">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ & Common Issues
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-gray-700">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="ghost" className="w-full justify-start dark:text-slate-300 dark:hover:bg-gray-700">
                  <Users className="h-4 w-4 mr-2" />
                  User Community
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-slate-100">Send us a Message</CardTitle>
                <CardDescription className="dark:text-slate-300">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="dark:text-slate-100">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                        className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="dark:text-slate-100">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                        className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-slate-100">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="dark:text-slate-100">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="technical" className="dark:text-slate-100">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="billing" className="dark:text-slate-100">
                          Billing & Payments
                        </SelectItem>
                        <SelectItem value="account" className="dark:text-slate-100">
                          Account Issues
                        </SelectItem>
                        <SelectItem value="data" className="dark:text-slate-100">
                          Data Questions
                        </SelectItem>
                        <SelectItem value="feature" className="dark:text-slate-100">
                          Feature Request
                        </SelectItem>
                        <SelectItem value="other" className="dark:text-slate-100">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="dark:text-slate-100">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="dark:text-slate-100">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible about your question or issue..."
                      rows={6}
                      className="dark:bg-gray-700 dark:text-slate-100 dark:border-gray-600"
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center dark:text-slate-100">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">How accurate is the matching algorithm?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Our AI-powered matching algorithm has a 95% accuracy rate based on user feedback. It considers your
                  field, experience, skills, and preferences to find the most relevant opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">Can I cancel my subscription anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your
                  billing period, and you won't be charged for the next cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">How often is the database updated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Our database is updated every 6 hours with new opportunities from our partner institutions and funding
                  agencies. You'll always have access to the latest research positions and grants.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">Is my personal data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Absolutely. We're GDPR compliant and use end-to-end encryption to protect your data. We never share
                  your personal information with third parties without your explicit consent.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">Do you offer student discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Our pricing is already student-friendly at €5/month. We also offer the first 5 searches completely
                  free, and our yearly plan provides additional savings.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-slate-100">Can I get help with my applications?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Yearly subscribers get access to 1-on-1 career consultations where we can provide guidance on
                  applications, CV optimization, and research proposal writing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
