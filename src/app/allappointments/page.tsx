'use server'

import {
  getKindeServerSession,
  RegisterLink,
  LoginLink
} from '@kinde-oss/kinde-auth-nextjs/server'

import AllAppointments from '@/components/allappointments'

  export default async function AllAppointmentsPage() {
      const { isAuthenticated, getUser } = getKindeServerSession()
      const user = getUser()
      return (
          <div>
              <AllAppointments isAuthenticated={isAuthenticated()} user={user} />
          </div>
 
      )
  }
