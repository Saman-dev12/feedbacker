"use client"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import Link from "next/link"
import { MessageSquare, Zap, Shield, ChevronRight, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950 max-h-[calc(100vh-4.1rem)] flex flex-col justify-center">
      <div className="absolute inset-0">
        <svg
          className="absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="svg-pattern-squares-1"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-blue-200 dark:text-blue-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#svg-pattern-squares-1)" />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform translate-x-1/2 translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="svg-pattern-squares-2"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-blue-200 dark:text-blue-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#svg-pattern-squares-2)" />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <div className="inline-flex items-center text-white bg-blue-600 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-500 rounded-full">
                      New
                    </span>
                    <span className="ml-4 text-sm">Advanced analytics now available</span>
                    <ChevronRight className="ml-2 w-5 h-5 text-white" />
                  </div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Revolutionize your</span>{' '}
                    <span className="text-blue-600 dark:text-blue-400 md:block">feedback process</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Empower your decision-making with honest, unfiltered feedback. Create posts, share links, and gather insights to drive your projects forward with unprecedented clarity.
                  </p>
                  <div className="mt-8 sm:mt-12">
                    <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                      <div className="sm:flex">
                        <div className="min-w-0 flex-1">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-blue-700"
                          />
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <Button className="block w-full py-3 px-4 rounded-md shadow bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-blue-700">
                            Get started
                          </Button>
                        </div>
                      </div>
                    </form>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-4">
                      Start your free 14-day trial, no credit card necessary. By providing your email, you agree to
                      our{' '}
                      <a href="#" className="font-medium text-gray-900 dark:text-gray-200 underline">
                        terms of service
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="bg-white dark:bg-gray-800 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden shadow-2xl">
                  <div className="px-4 py-8 sm:px-10">
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                        <p className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">Create feedback posts with ease</p>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-8 w-8 text-blue-500" />
                        <p className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">Instant anonymous responses</p>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-8 w-8 text-blue-500" />
                        <p className="ml-3 text-base font-medium text-gray-700 dark:text-gray-300">Secure and confidential feedback</p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            Trusted by industry leaders
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                            <Star className="h-6 w-6 text-blue-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-6 bg-gray-50 dark:bg-gray-700 border-t-2 border-gray-200 dark:border-gray-600 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                      By signing up, you agree to our{' '}
                      <a href="#" className="font-medium text-gray-900 dark:text-gray-200 hover:underline">
                        Terms
                      </a>
                      ,{' '}
                      <a href="#" className="font-medium text-gray-900 dark:text-gray-200 hover:underline">
                        Data Policy
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium text-gray-900 dark:text-gray-200 hover:underline">
                        Cookies Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}