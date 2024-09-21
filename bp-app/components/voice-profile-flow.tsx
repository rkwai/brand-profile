'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon, ArrowRightIcon } from 'lucide-react'
import axios from 'axios'

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
  const [isGeneratingVoiceProfile, setIsGeneratingVoiceProfile] = useState(false)
  const [isGeneratingPost, setIsGeneratingPost] = useState(false)

  const generateVoiceProfile = async () => {
    setIsGeneratingVoiceProfile(true)
    try {
      const response = await axios.post('/api/generate-voice-profile', { contentPillars, uvp })
      setVoiceProfile(response.data.voiceProfile)
      setCurrentStep(currentStep + 1) // Move to the next step after generating
    } catch (error) {
      console.error('Error generating voice profile:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsGeneratingVoiceProfile(false)
    }
  }

  const generatePost = async () => {
    setIsGeneratingPost(true)
    try {
      const response = await axios.post('/api/generate-post', { voiceProfile, postNotes })
      setGeneratedPost(response.data.generatedPost)
      setCurrentStep(currentStep + 1) // Move to the next step after generating
    } catch (error) {
      console.error('Error generating post:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsGeneratingPost(false)
    }
  }

  useEffect(() => {
    if (currentStep === 3) {
      generateVoiceProfile()
    } else if (currentStep === 6) {
      generatePost()
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 2 || currentStep === 5) {
        setCurrentStep(currentStep + 1) // Move to the "Generating" step
      } else {
        setCurrentStep(currentStep + 1)
      }
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
          <div className="text-center h-full flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">Welcome to Voice Profile Creator</h2>
            <p className="mb-4 text-stone-600 max-w-md">Create your personalized voice profile and generate posts effortlessly.</p>
            <Button onClick={handleNext} className="bg-stone-700 hover:bg-stone-600 text-stone-100 px-6 py-3 rounded-full flex items-center space-x-2">
              <span>Get Started</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )
      case 1:
        return (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-stone-800">Content Pillars</h3>
            <p className="text-stone-600">Define the key themes or topics that form the foundation of your content strategy.</p>
            <div className="flex-grow flex flex-col">
              <Label htmlFor="contentPillars" className="text-stone-700 mb-2">Your Content Pillars</Label>
              <Textarea
                id="contentPillars"
                placeholder="E.g., Personal Development, Technology Trends, Health & Wellness"
                value={contentPillars}
                onChange={(e) => setContentPillars(e.target.value)}
                className="flex-grow bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400 resize-none rounded-lg shadow-inner"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-stone-800">Unique Value Proposition</h3>
            <p className="text-stone-600">Describe what sets you apart from others in your field.</p>
            <div className="flex-grow flex flex-col">
              <Label htmlFor="uvp" className="text-stone-700 mb-2">Your Unique Value Proposition</Label>
              <Textarea
                id="uvp"
                placeholder="E.g., I combine cutting-edge tech insights with practical personal development strategies."
                value={uvp}
                onChange={(e) => setUvp(e.target.value)}
                className="flex-grow bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400 resize-none rounded-lg shadow-inner"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="text-center h-full flex flex-col justify-center items-center space-y-6">
            <h3 className="text-2xl font-semibold text-stone-800">Generating Your Voice Profile</h3>
            <p className="mb-4 text-stone-600">Please wait while we create your personalized voice profile...</p>
            <div className="w-full max-w-md">
              <div className="animate-pulse bg-stone-300 h-2 w-full rounded-full">
                <div className="bg-stone-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-stone-800">Your Voice Profile</h3>
            <p className="text-stone-600">Review and edit your generated voice profile if needed.</p>
            <div className="flex-grow flex flex-col">
              <Label htmlFor="voiceProfile" className="text-stone-700 mb-2">Generated Voice Profile</Label>
              <Textarea
                id="voiceProfile"
                value={voiceProfile || "Your generated voice profile will appear here."}
                onChange={(e) => setVoiceProfile(e.target.value)}
                className="flex-grow bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400 resize-none rounded-lg shadow-inner"
              />
            </div>
          </div>
        )
      case 5:
        return (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-stone-800">Post Notes</h3>
            <p className="text-stone-600">Enter your ideas or notes for the post.</p>
            <div className="flex-grow flex flex-col">
              <Label htmlFor="postNotes" className="text-stone-700 mb-2">Your Post Notes</Label>
              <Textarea
                id="postNotes"
                placeholder="Enter your ideas or notes for the post"
                value={postNotes}
                onChange={(e) => setPostNotes(e.target.value)}
                className="flex-grow bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400 resize-none rounded-lg shadow-inner"
              />
            </div>
          </div>
        )
      case 6:
        return (
          <div className="text-center h-full flex flex-col justify-center items-center space-y-6">
            <h3 className="text-2xl font-semibold text-stone-800">Generating Your Post</h3>
            <p className="mb-4 text-stone-600">Please wait while we generate your post...</p>
            <div className="w-full max-w-md">
              <div className="animate-pulse bg-stone-300 h-2 w-full rounded-full">
                <div className="bg-stone-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="h-full flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold text-stone-800">Your Generated Post</h3>
            <p className="text-stone-600">Review and edit your generated post if needed.</p>
            <div className="flex-grow flex flex-col">
              <Label htmlFor="generatedPost" className="text-stone-700 mb-2">Generated Post</Label>
              <Textarea
                id="generatedPost"
                value={generatedPost || "Your generated post will appear here."}
                onChange={(e) => setGeneratedPost(e.target.value)}
                className="flex-grow bg-stone-50 border-stone-200 text-stone-800 focus:border-stone-400 focus:ring-stone-400 resize-none rounded-lg shadow-inner"
              />
            </div>
          </div>
        )
      case 8:
        return (
          <div className="text-center h-full flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-stone-800">Congratulations!</h2>
            <p className="mb-4 text-stone-600 max-w-md">Your voice profile has been created and your post has been generated.</p>
            <Button onClick={() => setCurrentStep(0)} className="bg-stone-700 hover:bg-stone-600 text-stone-100 px-6 py-3 rounded-full">Start Over</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full h-full max-w-none mx-auto bg-stone-100 border-stone-200 shadow-md flex flex-col">
      <CardHeader className="border-b border-stone-200 pb-6">
        <CardTitle className="text-2xl font-bold text-stone-800">Create Your Voice Profile</CardTitle>
        <CardDescription className="text-stone-600 mt-1">Follow the steps to create your personalized voice profile and generate posts.</CardDescription>
        <div className="mt-6">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-stone-200">
            <div 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-stone-600 transition-all duration-300 ease-in-out"
            ></div>
          </div>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    index <= currentStep ? 'bg-stone-600 text-stone-100' : 'bg-stone-300 text-stone-600'
                  } transition-all duration-300 ease-in-out`}
                >
                  {index < currentStep ? <CheckIcon className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs mt-2 text-stone-600 hidden sm:inline">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 flex-grow overflow-y-auto">
        <div className="h-4/5 flex flex-col">
          {renderStepContent()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-stone-200 pt-4 sticky bottom-0 bg-stone-100">
        <Button 
          onClick={handleBack} 
          disabled={currentStep === 0} 
          className="bg-stone-200 text-stone-800 hover:bg-stone-300 px-6 py-2 rounded-full"
        >
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={currentStep === steps.length - 1 || isGeneratingVoiceProfile || isGeneratingPost} 
          className="bg-stone-700 hover:bg-stone-600 text-stone-100 px-6 py-2 rounded-full"
        >
          {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}