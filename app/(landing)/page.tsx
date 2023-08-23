import { Button } from '@/components/ui/button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import { NavigationMenuDemo } from '@/components/landingNavbar'

export default function LandingPage () {
  const supabase = createServerComponentClient({cookies})
  return (
    <div className=''>
      <NavigationMenuDemo />
    </div>
  )
}
