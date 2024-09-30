'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Send, CheckCircle, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import { createFeedback } from '~/actions/feedbackActions'

export default function FeedbackSubmission({id}:{id:number}) {
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async() => {
    if (feedback) {
      //use feedback actions
      const response = await createFeedback(id, feedback)
      if (response) {
        setIsSubmitted(true)
        setFeedback('')
        
      }

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Link href={`/post/${id}`} passHref>
              <Button variant="outline" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Post
              </Button>
            </Link>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">Provide Feedback</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">Your feedback will be anonymous and help improve the project</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <>
              <Textarea
                placeholder="Enter your feedback here. Be honest and constructive!"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[200px] bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg p-4 mb-4"
              />
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                Your feedback is anonymous and secure
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-green-600 dark:text-green-400 text-xl py-8">
              <CheckCircle className="h-16 w-16 mb-4" />
              <p className="text-center">Thank you for your valuable feedback!</p>
              <p className="text-center text-base mt-2 text-gray-600 dark:text-gray-400">Your insights will help improve the project.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!isSubmitted && (
            <Button 
              onClick={handleSubmit} 
              disabled={!feedback}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 text-white text-lg py-6"
            >
              <Send className="mr-2 h-5 w-5" />
              Submit Feedback
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}