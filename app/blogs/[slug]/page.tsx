"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Tag,
  Twitter,
  User,
  X,
} from "lucide-react"

// Dummy blog data (same as in blogs/page.tsx)
const blogs = [
  {
    id: 1,
    slug: "benefits-of-robotic-roof-inspections",
    title: "5 Key Benefits of Robotic Roof Inspections for Commercial Buildings",
    excerpt:
      "Discover how robotic roof inspections are revolutionizing the commercial building maintenance industry with increased accuracy, safety, and cost savings.",
    content: `
      <p>Traditional roof inspections have long been a necessary but challenging aspect of commercial building maintenance. They often involve sending workers onto rooftops, which presents safety risks, takes considerable time, and can miss critical issues hidden beneath the surface. Enter robotic roof inspection technology – a game-changing approach that's transforming how building owners and facility managers maintain their properties.</p>
      
      <h2>1. Superior Accuracy and Detection</h2>
      <p>Robotic inspection systems utilize advanced sensors, thermal imaging, and moisture detection technology that can identify problems invisible to the human eye. Our robots can detect water intrusion, insulation issues, and structural weaknesses with 99% accuracy – far surpassing the capabilities of traditional visual inspections.</p>
      <p>This precision means building owners can address problems before they escalate into major issues, potentially saving tens of thousands in repair costs. One of our clients, a property management company in Chicago, identified moisture intrusion that would have caused an estimated $120,000 in structural damage if left undetected for another six months.</p>
      
      <h2>2. Comprehensive Data Collection</h2>
      <p>Unlike manual inspections that might focus on obvious trouble spots, robotic systems methodically scan every square inch of your roof. The result is a complete digital record of your roof's condition, including:</p>
      <ul>
        <li>High-resolution imagery</li>
        <li>Thermal mapping showing temperature variations</li>
        <li>Moisture concentration data</li>
        <li>3D modeling of the entire roof system</li>
        <li>Historical comparisons with previous inspections</li>
      </ul>
      <p>This wealth of data allows for more informed decision-making about maintenance priorities and capital planning.</p>
      
      <h2>3. Enhanced Safety</h2>
      <p>Roof inspections rank among the more dangerous maintenance activities for commercial buildings. By deploying robots instead of human inspectors, building owners eliminate the risk of falls and other rooftop accidents. This not only protects workers but also reduces liability concerns and potential workers' compensation claims.</p>
      
      <h2>4. Significant Cost Savings</h2>
      <p>While the technology behind robotic inspections is sophisticated, the overall cost is typically 50-65% lower than traditional inspection methods. These savings come from:</p>
      <ul>
        <li>Reduced labor costs</li>
        <li>Faster inspection times (hours instead of days)</li>
        <li>More accurate repair scoping, preventing unnecessary work</li>
        <li>Early detection of issues before they require costly repairs</li>
        <li>Extended roof lifespan through better preventative maintenance</li>
      </ul>
      <p>Many building owners report that the cost savings from a single avoided major repair can pay for years of robotic inspection services.</p>
      
      <h2>5. Minimal Business Disruption</h2>
      <p>Traditional roof inspections often require sections of a building to be temporarily closed or evacuated. Robotic inspections are far less intrusive, with most of the work happening quietly overhead without disrupting normal business operations. For retail, healthcare, and other facilities where downtime is costly, this benefit alone can justify the switch to robotic technology.</p>
      
      <h2>The Future of Roof Maintenance</h2>
      <p>As robotic technology continues to advance, we're seeing increasing integration with building management systems, predictive maintenance algorithms, and even automated repair capabilities. Forward-thinking building owners are already incorporating these technologies into their standard maintenance protocols, gaining a competitive edge in property management efficiency.</p>
      
      <p>At Building Diagnostic Robotics, we're committed to helping commercial property owners leverage these advantages through our state-of-the-art inspection systems. Contact us today to learn how our robotic inspection services can transform your roof maintenance program while delivering substantial ROI.</p>
    `,
    author: "Michael Chen",
    authorRole: "Chief Technology Officer",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Technology",
    tags: ["Roof Inspection", "Commercial Buildings", "Cost Savings", "Preventative Maintenance"],
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 2,
    slug: "detecting-moisture-with-ai",
    title: "How AI is Revolutionizing Moisture Detection in Building Envelopes",
    excerpt:
      "Artificial intelligence and machine learning algorithms are transforming how we detect and address moisture issues in commercial buildings.",
    author: "Sarah Johnson",
    authorRole: "Data Science Director",
    date: "March 10, 2025",
    readTime: "6 min read",
    category: "Technology",
    tags: ["Artificial Intelligence", "Moisture Detection", "Building Maintenance"],
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 3,
    slug: "extending-roof-lifespan",
    title: "Extending Your Commercial Roof's Lifespan: Strategies That Work",
    excerpt:
      "Learn proven methods to add 5-20 years to your commercial roof's useful life through strategic maintenance and early intervention.",
    author: "Robert Williams",
    authorRole: "Building Systems Engineer",
    date: "March 5, 2025",
    readTime: "10 min read",
    category: "Maintenance",
    tags: ["Roof Maintenance", "Commercial Buildings", "Cost Savings"],
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 4,
    slug: "tax-incentives-for-roof-repairs",
    title: "2025 Tax Incentives for Commercial Roof Repairs and Replacements",
    excerpt:
      "Discover the latest tax credits and incentives available to commercial building owners for roof maintenance and energy-efficient upgrades.",
    author: "Jennifer Martinez",
    authorRole: "Financial Analyst",
    date: "February 28, 2025",
    readTime: "7 min read",
    category: "Finance",
    tags: ["Tax Credits", "Commercial Buildings", "Energy Efficiency"],
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 5,
    slug: "case-study-retail-chain",
    title: "Case Study: How a National Retail Chain Saved $2.3M with Robotic Roof Inspections",
    excerpt:
      "An in-depth look at how one of our clients implemented robotic inspection technology across 130 locations with remarkable ROI.",
    author: "David Thompson",
    authorRole: "Client Success Manager",
    date: "February 20, 2025",
    readTime: "12 min read",
    category: "Case Study",
    tags: ["Retail", "ROI", "Success Story"],
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 6,
    slug: "future-of-building-diagnostics",
    title: "The Future of Building Diagnostics: Trends to Watch in 2025 and Beyond",
    excerpt:
      "Explore emerging technologies and methodologies that will shape the future of commercial building diagnostics and maintenance.",
    author: "Michael Chen",
    authorRole: "Chief Technology Officer",
    date: "February 15, 2025",
    readTime: "9 min read",
    category: "Industry Trends",
    tags: ["Future Technology", "Industry Trends", "Innovation"],
    image: "/placeholder.svg?height=600&width=1200",
  },
]

export default function BlogPostPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  // Find the blog post with the matching slug
  const blogPost = blogs.find((blog) => blog.slug === slug)

  // If no matching blog post is found, redirect to the blogs page
  useEffect(() => {
    if (!blogPost) {
      router.push("/blogs")
    }
  }, [blogPost, router])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  // Get the index of the current blog post
  const currentIndex = blogPost ? blogs.findIndex((blog) => blog.slug === blogPost.slug) : -1

  // Get the previous and next blog posts
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null

  if (!blogPost) {
    return null // Return null while redirecting
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2 px-4">
        <div className="container flex justify-between items-center">
          <p className="text-sm md:text-base font-medium">
            Save 50% or more compared to traditional roof inspections! Serving businesses nationwide.
          </p>
          <a href="tel:5105149518" className="text-white font-bold hover:underline whitespace-nowrap">
            Call: (510) 514-9518
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-black/50 backdrop-blur-sm"
        }`}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-50">
            <div className="relative size-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white absolute" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg blur-lg opacity-50"></div>
            </div>
            <span className="font-bold text-xl tracking-tight">BDR</span>
          </Link>

          {/* Contact Points in Header */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a
              href="tel:5105149518"
              className="flex items-center space-x-1 text-white hover:text-teal-400 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>(510) 514-9518</span>
            </a>
            <a
              href="mailto:info@bdx-robotics.com"
              className="flex items-center space-x-1 text-white hover:text-teal-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>info@bdx-robotics.com</span>
            </a>
            <a
              href="https://maps.google.com/?q=19+Morris+Ave,+Brooklyn,+NY+11205"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-white hover:text-teal-400 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              <span>Brooklyn, NY</span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {["solutions", "benefits", "coverage", "technology", "about", "contact"].map((item) => (
              <a
                key={item}
                href={`/#${item}`}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Link
              href="/blogs"
              className="relative text-sm font-medium text-white hover:text-white transition-colors group"
            >
              Blogs
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-600"></span>
            </Link>
            <Link
              href="/careers"
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
            >
              Careers
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4 z-50">
            <Button
              onClick={() => (window.location.href = "/#contact")}
              className="hidden md:flex bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <button onClick={toggleMobileMenu} className="lg:hidden text-white p-2" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <a href="tel:5105149518" className="flex items-center space-x-2 text-white text-xl">
              <Phone className="h-5 w-5" />
              <span>(510) 514-9518</span>
            </a>
            <a href="mailto:info@bdx-robotics.com" className="flex items-center space-x-2 text-white text-xl">
              <Mail className="h-5 w-5" />
              <span>info@bdx-robotics.com</span>
            </a>
            <a
              href="https://maps.google.com/?q=19+Morris+Ave,+Brooklyn,+NY+11205"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white text-xl"
            >
              <MapPin className="h-5 w-5" />
              <span>19 Morris Ave, Brooklyn, NY</span>
            </a>
          </div>

          {["solutions", "benefits", "coverage", "technology", "about", "contact"].map((item) => (
            <a
              key={item}
              href={`/#${item}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <Link
            href="/blogs"
            className="text-2xl font-medium text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/careers"
            className="text-2xl font-medium text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Careers
          </Link>
          <Button
            onClick={() => {
              window.location.href = "/#contact"
              setMobileMenuOpen(false)
            }}
            className="mt-8 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full px-8 py-6 text-lg"
          >
            Get a Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <main className="flex-1">
        {/* Blog Header */}
        <section className="relative w-full py-24 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-teal-900/20 to-black/90"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-teal-500/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/10 blur-3xl rounded-full"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blogs"
                className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>

              <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-teal-500/80 text-white backdrop-blur-sm">
                  {blogPost.category}
                </span>
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-6">
                {blogPost.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <p className="font-medium">{blogPost.author}</p>
                  <p className="text-sm text-white/60">{blogPost.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative w-full mb-12">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="relative w-full py-12">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
                {/* Main Content */}
                <div>
                  <div
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 flex flex-wrap gap-2">
                    {blogPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-white/70 mb-4">Share this article</p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Share on Twitter</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Share on Facebook</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">Share on LinkedIn</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Share via Email</span>
                      </Button>
                    </div>
                  </div>

                  {/* Navigation between posts */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevBlog && (
                      <Link
                        href={`/blogs/${prevBlog.slug}`}
                        className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                          <ArrowLeft className="h-4 w-4" />
                          <span>Previous Article</span>
                        </div>
                        <h3 className="font-medium line-clamp-2 group-hover:text-teal-400 transition-colors">
                          {prevBlog.title}
                        </h3>
                      </Link>
                    )}

                    {nextBlog && (
                      <Link
                        href={`/blogs/${nextBlog.slug}`}
                        className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-right"
                      >
                        <div className="flex items-center justify-end gap-2 text-sm text-white/60 mb-2">
                          <span>Next Article</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium line-clamp-2 group-hover:text-teal-400 transition-colors">
                          {nextBlog.title}
                        </h3>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Author */}
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-4">About the Author</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-16 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <User className="h-8 w-8 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium">{blogPost.author}</p>
                        <p className="text-sm text-white/60">{blogPost.authorRole}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/70">
                      {blogPost.author} is a leading expert in building diagnostics and robotic inspection technology
                      with over 15 years of experience in the industry.
                    </p>
                  </div>

                  {/* Related Articles */}
                  <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {blogs
                        .filter((blog) => blog.id !== blogPost.id && blog.category === blogPost.category)
                        .slice(0, 3)
                        .map((blog) => (
                          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="flex gap-3 group">
                            <div className="relative size-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={blog.image || "/placeholder.svg"}
                                alt={blog.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-teal-400 transition-colors">
                                {blog.title}
                              </h4>
                              <p className="text-xs text-white/60 mt-1">{blog.date}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-600/20 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-bold mb-2">Ready to Transform Your Roof Inspections?</h3>
                    <p className="text-sm text-white/70 mb-4">
                      Contact us today to learn how our robotic inspection technology can save you time and money.
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/#contact")}
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white"
                    >
                      Get a Free Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Articles Section */}
        <section className="relative w-full py-24 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-950/30 to-black"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-12 text-center">
                More Articles You Might Like
              </h2>

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {blogs
                  .filter((blog) => blog.id !== blogPost.id)
                  .slice(0, 3)
                  .map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group flex flex-col h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-teal-500/80 text-white backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-grow p-6">
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>{blog.date}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-3 line-clamp-2">{blog.title}</h3>
                        <p className="text-white/70 mb-4 line-clamp-2">{blog.excerpt}</p>

                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="mt-auto inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
                        >
                          Read Article
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
              </div>

              <div className="mt-12 text-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full px-8 py-6"
                >
                  <Link href="/blogs">
                    View All Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative w-full border-t border-white/10 py-12 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-teal-500/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/10 blur-3xl rounded-full"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative size-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white absolute" />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg blur-lg opacity-50"></div>
                </div>
                <span className="font-bold text-lg">BDR</span>
              </Link>
              <p className="text-sm text-white/70">
                Building Diagnostic Robotics (BDR) provides advanced robotic roof inspection services that save clients
                50% or more compared to traditional methods while delivering superior accuracy.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    Moisture Detection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    Roof Mapping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    Leak Prevention
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    Flat Roof Inspections
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/70 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white/70 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white text-sm">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-teal-500" />
                  <a href="tel:5105149518" className="text-white/70 hover:text-white text-sm">
                    (510) 514-9518
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-teal-500" />
                  <a href="mailto:info@bdx-robotics.com" className="text-white/70 hover:text-white text-sm">
                    info@bdx-robotics.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-teal-500" />
                  <a
                    href="https://maps.google.com/?q=19+Morris+Ave,+Brooklyn,+NY+11205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white text-sm"
                  >
                    19 Morris Ave, Brooklyn, NY
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} Building Diagnostic Robotics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-white/50 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-white/50 hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-white/50 hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

