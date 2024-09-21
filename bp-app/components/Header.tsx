import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function Header() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <header className="bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
       <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <h1 className="text-xl font-bold text-gray-900">Brand Voice Profile</h1>
            </div>
          </Link>
          <div>
            {session ? (
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="text-blue-600 hover:text-blue-800">
                  Logout
                </button>
              </form>
            ) : (
              <>
                <Link href="/signin" className="text-blue-600 hover:text-blue-800 mr-4">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}