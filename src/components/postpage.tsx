'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"
import Link from 'next/link'
import { MessageSquare, ArrowLeft, ThumbsUp, Calendar, User, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from "~/hooks/use-toast"
import { getPost } from '~/actions/PostActions'
import { getFeedbacks } from '~/actions/feedbackActions'


interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  feedbacks:Feedback[];
}
interface Feedback {
  id: number;
  content: string;
  createdAt: Date;
  postId: number;
  nickname: string | null;
  isAnonymous: boolean;
}


export default function PostPage({id}:{id:number}) {
  const [post, setPost] = useState<Post | null>(null)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    getCurrentPost(id);
    getCurrentFeedbacks(id);
  }, [id])

  const getCurrentFeedbacks = async(id:number) => {
    // use getFeedbacks action
  const response = await getFeedbacks(id);
  if (response) {
    setFeedbacks(response as Feedback[]);
  } else {
    toast({
      title: "Error",
      description: "Failed to fetch the feedbacks.",
    });
  }

  }

  const getCurrentPost = async(id:number) => {
    // use getPost action
  const response = await getPost(id);
//   console.log(response);
  if (response) {
    setPost(response as Post);
  } else {
    toast({
      title: "Error",
      description: "Failed to fetch the post.",
    });
  }
    
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true)
      toast({
        title: "URL Copied",
        description: "The page URL has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!post) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" passHref>
          <Button variant="outline" className="mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">{post.title}</CardTitle>
            <CardDescription className="text-xl text-gray-600 dark:text-gray-400">{post.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                {/* <span>{post.date}</span> */}
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                {/* <span>{post.likes} likes</span> */}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={pageUrl}
                readOnly
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Feedbacks</h2>
          <Link href={`/feedback/${id}`} passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Provide Feedback
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Card key={feedback.id} className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{feedback.id}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardDescription className="text-gray-700 dark:text-gray-300 text-lg">{feedback.content}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Anonymous User</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                      {/* <span>{feedback.date}</span> */}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                      {/* <span>{feedback.likes} likes</span> */}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-4 mb-4">
              <h2 className="text-lg font-semibold">No Feedbacks Yet</h2>
              <p>It's quiet for now... Be the first to provide feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}