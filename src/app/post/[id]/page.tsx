"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import PostPage from '~/components/postpage';

const Post: React.FC = () => {
    const {id} = useParams();
  return (
    <div>
      <PostPage id={Number(id)}/>
    </div>
  )
}

export default Post
