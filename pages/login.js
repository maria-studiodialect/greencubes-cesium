import { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import Image from "next/image";
import { Auth, API } from "aws-amplify";
import { useRouter } from 'next/router';



export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('start')
    try {
        const user = await Auth.signIn(email, password);
        if (user) {
          console.log(user);
          // Check if the current path is '/' (home page)
          if (window.location.pathname === '/') {
            // Force reload the page
            window.location.reload();
          } else {
            // Navigate to the home page if not already there
            router.push('/');
          }
        }
    } catch (error) {
      let errorMsg = "";
      if (error.code === "UserNotFoundException") {
        errorMsg = "User does not exist. Please register.";
      } else if (error.code === "NotAuthorizedException") {
        errorMsg = "Incorrect username or password.";
      } else if (error.code === "UserNotConfirmedException") {
        errorMsg = "User has not been confirmed. Please confirm your account.";
      } else {
        errorMsg = "Error signing in make sure to enter user name and password";
      }
      setError(errorMsg)
      console.log(error)
    }
  };

  return (
    <>
      <div className="flex">
        <div className="bg-neutral-900 text-white flex flex-col justify-between p-5 pr-16">
            <div><Image alt='logo' src='/img/greenCubesLogo.svg' width={161} height={94} className="w-[7vw]"/></div>
            <div className="px-12">
              <div className="text-3xl mb-1.5 text-greenLime">Welcome</div>
              <div className="text-xs">You have been added to the Microsoft Green Cubes Client admin console</div>
            </div>
            <div>
            
            <form onSubmit={handleLogin} className="shadow-lg rounded-xl px-12" action="#" method="POST">
              <div className="text-xl mb-5 font-bold">Sign In</div>
              <input type="hidden" name="remember" value="true"/>
              <div className="rounded-md">
                
                <div>
                  {/*<label htmlFor="email-address" className='font-bold text-sm'>Email address</label>*/}
                  <input onChange={(e) => (setEmail(e.target.value), setError(''))} value={email} id="email-address" name="email" type="email" autoComplete="email" placeholder="Email Address" required className={`bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5  ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error ? 'border-red-600 text-red-600 ring-red-600' : 'text-white ring-gray-300'}`}/>
                </div>
                <div>
                  {/*<label htmlFor="password" className='font-bold text-sm'>Password</label>*/}
                  <input id="password"  onChange={(e) => (setPassword(e.target.value), setError(''))} name="password" type="password" autoComplete="current-password" placeholder="Password" required className={`bg-transparent px-3 relative block w-full rounded-md border-0 py-1.5 ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error ? 'border-red-600 text-red-600 ring-red-600' : 'text-white ring-gray-300'}`}/>
                </div>
              </div>
              {error && (
                  <div className='pt-1 pl-3'>
                  <p className='text-xs text-red-600'>{error}</p>
                  </div>
                )}
              <div className="flex items-center justify-end mb-10 mt-5">

                <div className="text-xs">
                  <Link href='/resetPassword'><div className="font-medium text-gray-400 hover:text-white">Forgot your password?</div></Link>
                </div>
              </div>

              <div className="pt-[15vh]">
                <button type="submit" className="mb-3 group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
                <Link href='/signup'><div className="relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
                </div></Link>
              </div>
            </form>

            </div>
            <div className="flex justify-center text-xs space-x-4 text-gray-400">
              <div className="hover:opacity-50 cursor-pointer">Terms and Conditions</div>
              <div className="hover:opacity-50 cursor-pointer">Privacy Policy</div>
            </div>
        </div>
        <div className="bg-[url('/img/login-forest.jpg')] h-screen w-full bg-cover"></div>
      </div>
    </>
  )
}
