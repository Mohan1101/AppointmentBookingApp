
import {
    getKindeServerSession,
    RegisterLink,
    LoginLink
  } from '@kinde-oss/kinde-auth-nextjs/server'

  import BookAppointments from './bookappointments'

    export default function Appointments() {
        const { isAuthenticated, getUser } = getKindeServerSession()
        const user = getUser()
        return (
            <div>
                <BookAppointments isAuthenticated={isAuthenticated()} user={user} />
            </div>
   
        )
    }
