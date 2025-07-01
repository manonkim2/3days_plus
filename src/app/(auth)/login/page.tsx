export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center justify-center font-poppins">
        <div className="border h-[40vh] w-[60vw] md:w-[400px] p-xl flex flex-col justify-between">
          <span className="text-4xl text-fontPrimary">Sign up</span>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default Login
