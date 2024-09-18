'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon } from 'lucide-react'

const steps = [
  "Welcome",
  "Content Pillars",
  "UVP",
  "Generate Profile",
  "Review Profile",
  "Post Notes",
  "Generate Post",
  "Review Post",
  "Confirmation"
]

export function VoiceProfileFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [contentPillars, setContentPillars] = useState('')
  const [uvp, setUvp] = useState('')
  const [voiceProfile, setVoiceProfile] = useState('')
  const [postNotes, setPostNotes] = useState('')
  const [generatedPost, setGeneratedPost] = useState('')

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-stone-800">Welcome to Voice Profile Creator</h2>
            <p className="mb-4 text-stone-600">Create your personalized voice profile and generate posts effortlessly.</p>
            <Button onClick={handleNext} className="bg-stone-700 hover:bg-stone-600 text-stone-100">Get Started</Button>
          </div>
        )
      case 1:
        return (
          <div>
            <Label htmlFor="contentPillars" className="text-stone-700">Content Pillars</Label>
            <Textarea
              id="contentPillars"
              placeholder="Enter your key themes or topics"
              value={contentPillars}
              onChange={(e) => setContentPillars(e.target.value)}
              className="mt-1 bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400"
            />
          </div>
        )
      case 2:
        return (
          <div>
            <Label htmlFor="uvp" className="text-stone-700">Unique Value Proposition</Label>
            <Textarea
              id="uvp"
              placeholder="What sets you apart?"
              value={uvp}
              onChange={(e) => setUvp(e.target.value)}
              className="mt-1 bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400"
            />
          </div>
        )
      case 3:
        return (
          <div className="text-center">
            <p className="mb-4 text-stone-600">Generating your voice profile...</p>
            <div className="animate-pulse bg-stone-300 h-4 w-full rounded"></div>
          </div>
        )
      case 4:
        return (
          <div>
            <Label htmlFor="voiceProfile" className="text-stone-700">Your Voice Profile</Label>
            <Textarea
              id="voiceProfile"
              value={voiceProfile || "Your generated voice profile will appear here."}
              onChange={(e) => setVoiceProfile(e.target.value)}
              className="mt-1 bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400"
            />
          </div>
        )
      case 5:
        return (
          <div>
            <Label htmlFor="postNotes" className="text-stone-700">Notes for Your Post</Label>
            <Textarea
              id="postNotes"
              placeholder="Enter your ideas or notes for the post"
              value={postNotes}
              onChange={(e) => setPostNotes(e.target.value)}
              className="mt-1 bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400"
            />
          </div>
        )
      case 6:
        return (
          <div className="text-center">
            <p className="mb-4 text-stone-600">Generating your post...</p>
            <div className="animate-pulse bg-stone-300 h-4 w-full rounded"></div>
          </div>
        )
      case 7:
        return (
          <div>
            <Label htmlFor="generatedPost" className="text-stone-700">Your Generated Post</Label>
            <Textarea
              id="generatedPost"
              value={generatedPost || "Your generated post will appear here."}
              onChange={(e) => setGeneratedPost(e.target.value)}
              className="mt-1 bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400"
            />
          </div>
        )
      case 8:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-stone-800">Congratulations!</h2>
            <p className="mb-4 text-stone-600">Your voice profile has been created and your post has been generated.</p>
            <Button onClick={() => setCurrentStep(0)} className="bg-stone-700 hover:bg-stone-600 text-stone-100">Start Over</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-stone-100 border-stone-200 shadow-md">
      <CardHeader className="border-b border-stone-200">
        <CardTitle className="text-stone-800">Create Your Voice Profile</CardTitle>
        <CardDescription className="text-stone-600">Follow the steps to create your personalized voice profile and generate posts.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative mb-8">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-stone-200">
            <div style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-stone-700"></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    index <= currentStep ? 'bg-stone-700 text-stone-100' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {index < currentStep ? <CheckIcon className="w-3 h-3" /> : index + 1}
                </div>
                <span className="text-xs mt-1 text-stone-600 hidden sm:inline">{step}</span>
              </div>
            ))}
          </div>
        </div>
        {renderStepContent()}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-stone-200 pt-4">
        <Button onClick={handleBack} disabled={currentStep === 0} className="bg-stone-200 text-stone-800 hover:bg-stone-300">
          Back
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1} className="bg-stone-700 hover:bg-stone-600 text-stone-100">
          {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}