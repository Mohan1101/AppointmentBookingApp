'use server'

import {
  getKindeServerSession,
  RegisterLink,
  LoginLink
} from '@kinde-oss/kinde-auth-nextjs/server'

import Dashboard from '@/components/dashboard'

  export default async function DashboardPage() {
      const { isAuthenticated, getUser } = getKindeServerSession()
      const user = getUser()
      return (
          <div>
              <Dashboard isAuthenticated={isAuthenticated()} user={user} />
          </div>
 
      )
  }
