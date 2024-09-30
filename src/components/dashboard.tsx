'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import Link from 'next/link'
import { PlusCircle, MessageSquare, ThumbsUp, Calendar, Sparkles } from 'lucide-react'

interface Post {
  id: number;
  title: string;
  description: string;
  feedbacks: number;
  likes: number;
  date: string | undefined;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "First Feedback Request", description: "Please provide feedback on our new feature.", feedbacks: 5, likes: 12, date: "2023-06-15" },
    { id: 2, title: "Website Redesign Feedback", description: "We'd love to hear your thoughts on our new website design.", feedbacks: 8, likes: 20, date: "2023-06-10" },
    { id: 3, title: "New Product Idea", description: "What do you think about our upcoming product?", feedbacks: 3, likes: 7, date: "2023-06-18" },
  ])
  const [newPost, setNewPost] = useState<{ title: string; description: string }>({ title: '', description: '' })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleCreatePost(): void {
    if (newPost.title && newPost.description) {
      setPosts([{ id: posts.length + 1, ...newPost, feedbacks: 0, likes: 0, date: new Date().toISOString().split('T')[0] }, ...posts])
      setNewPost({ title: '', description: '' })
      setIsOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Feedback Dashboard</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Create a new post to receive feedback. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Textarea
                  placeholder="Description"
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">Save Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{post.feedbacks} feedbacks</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/post/${post.id}`} passHref className="w-full">
                  <Button variant="outline" className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
                    <Sparkles className="mr-2 h-4 w-4" />
                    View Feedback
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}