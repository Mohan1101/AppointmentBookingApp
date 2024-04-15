export const metadata = {
  title: 'Appointment Booking App',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'
import Appointments from '@/components/appointments'

export default function Home() {
  return (
    <>
      <div id = "hero">
      <Hero />
      </div>
      <div id = "features">
      <Features />
      </div>
      <div id = "zigzag">
      <Zigzag />
      </div>
      <div id = "appointments">
      <Appointments />
      </div>
      <div id = "testimonials">
      <Testimonials />
      </div>
      <div id = "newsletter">
      <Newsletter />
      </div>
    </>
  )
}
