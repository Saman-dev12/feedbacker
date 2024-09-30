"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import FeedbackSubmission from '~/components/feedbacksubmission'

function page() {
    const {id} = useParams();
  return (
    <div>
      <FeedbackSubmission id={Number(id)}/>
    </div>
  )
}

export default page
