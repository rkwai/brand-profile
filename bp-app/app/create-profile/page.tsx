"use client";

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { VoiceProfileFlow } from '@/components/voice-profile-flow'

export default function CreateProfile() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/signin')
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [supabase, router])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <VoiceProfileFlow />
    </div>
  )
}