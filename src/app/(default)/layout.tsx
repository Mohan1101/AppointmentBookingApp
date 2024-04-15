'use client'

import { useEffect } from 'react'

import AOS from 'aos'


import 'aos/dist/aos.css'



import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/Footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: false,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">

        <PageIllustration />

        {children}

      </main>

      <Footer />
    </>
  )
}
