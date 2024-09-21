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
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <VoiceProfileFlow />
    </div>
  )
}