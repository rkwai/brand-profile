/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        router.refresh()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Let LLMs Write Like You</h1>
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Your Brand Voice Profile Today</h2>
        <h3 className="text-xl mb-12 text-center">Save up to 2 hours a day on content creation while keeping your unique brand voice</h3>

        <div className="bg-white shadow-md rounded-lg p-6 mb-12">
          <p className="mb-6">Content creation is time-consuming, but it's essential for acquiring new customers. While Large Language Models (LLMs) can generate content quickly, they lack your brand's unique voice, making your content feel generic and impersonal.</p>
          <h3 className="text-2xl font-semibold mb-4">Introducing the Brand Voice Profile</h3>
          <p>A tool that teaches LLMs to write just like you. Free up 1-2 hours a day and maintain your brand's unique identity.</p>
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Why You Need a Brand Voice Profile</h3>
          <ul className="list-disc list-inside">
            <li><strong>Save Time:</strong> Automate your content creation without losing your brand's personality.</li>
            <li><strong>Consistency:</strong> Maintain a consistent brand voice across all platforms.</li>
            <li><strong>Engagement:</strong> Increase customer engagement with personalized, authentic content.</li>
            <li><strong>Growth:</strong> Focus on scaling your business instead of spending hours writing.</li>
          </ul>
        </section>

        {/* Add more sections here based on the markdown content */}

        <div className="text-center mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div>
              <p>Welcome, {user.email}</p>
              <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors mt-2">Sign Out</button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}