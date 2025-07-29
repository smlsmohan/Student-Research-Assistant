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

export default function SupportPage() {
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
              <Link href="/research-assistant">
                <Button className="bg-blue-600 hover:bg-blue-700">Try Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How Can We Help You?</h1>
          <p className="text-xl text-slate-600">Get support, find answers, or connect with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Contact Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-slate-600">support@researchpath.eu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-slate-600">+31 20 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-slate-600">Within 24 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-green-600" />
                  Self-Help Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ & Common Issues
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Community
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@university.edu" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="data">Data Questions</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible about your question or issue..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">How accurate is the matching algorithm?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our AI-powered matching algorithm has a 95% accuracy rate based on user feedback. It considers your
                  field, experience, skills, and preferences to find the most relevant opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your
                  billing period, and you won't be charged for the next cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">How often is the database updated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our database is updated every 6 hours with new opportunities from our partner institutions and funding
                  agencies. You'll always have access to the latest research positions and grants.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Is my personal data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Absolutely. We're GDPR compliant and use end-to-end encryption to protect your data. We never share
                  your personal information with third parties without your explicit consent.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer student discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Our pricing is already student-friendly at €5/month. We also offer the first 5 searches completely
                  free, and our yearly plan provides additional savings.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Can I get help with my applications?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
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
