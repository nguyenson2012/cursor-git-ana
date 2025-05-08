import Link from "next/link"
import { Github, Check } from "lucide-react"
import Navigation from "./components/Navigation"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Github className="h-6 w-6" />
          <span className="font-bold text-lg">GitHub Analyzer</span>
        </div>
        <Navigation />
        <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Unlock GitHub Insights
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-center text-lg md:text-xl mb-10">
              Get powerful insights, summaries, and analytics for open source GitHub repositories. Discover trends,
              track important updates, and stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="px-8 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/learn-more"
                className="px-8 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Repository Insights</h3>
                <p className="text-gray-600">Get comprehensive summaries and analytics for any GitHub repository.</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Important PRs</h3>
                <p className="text-gray-600">Track and analyze the most impactful pull requests in real-time.</p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Version Updates</h3>
                <p className="text-gray-600">Stay informed about the latest version releases and changelogs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Try It Out
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">API Request</h3>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm">
                    {`{
  "githubUrl": "https://github.com/assafelovic/gpt-researcher"
}`}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/playground"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Try it out
                    </Link>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">API Response</h3>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm overflow-auto max-h-[200px]">
                    {`{
  "summary": "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to provide detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
  "cool_facts": [
    "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128k context) to complete research tasks, optimizing costs",
    "Implements autonomous agents for web scraping and research",
    "Uses vector embeddings for better context understanding"
  ]
}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-blue-50 py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Pricing Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Free</h3>
                  <p className="text-gray-600">For individual developers</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-600 block mt-1">per month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Basic repository insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Limited to 200 requests</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Daily updates</span>
                  </li>
                </ul>
                <Link
                  href="/get-started"
                  className="block w-full py-3 px-4 bg-black text-white text-center rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Coming Soon
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Pro</h3>
                  <p className="text-gray-600">For professional developers</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$19</span>
                  <span className="text-gray-600 block mt-1">per month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Advanced repository insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Unlimited repositories</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Real-time updates</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="block w-full py-3 px-4 bg-gray-500 text-white text-center rounded-md font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Coming Soon
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-gray-600">For large teams and organizations</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold">Custom</span>
                  <span className="text-gray-600 block mt-1">contact for pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <button
                  disabled
                  className="block w-full py-3 px-4 bg-gray-500 text-white text-center rounded-md font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white py-8 px-4 border-t border-gray-200">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">© 2024 Github Analyzer. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
