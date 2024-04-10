import { useState } from "react";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";



export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [registered, setRegisterd] = useState(false);
  const [code, setCode] = useState('');
  const [resent, setResent] = useState(false);
  const [success, setSuccess] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await Auth.forgotPassword(email);
      setRegisterd(true); // Redirect to a confirmation page
    } catch (error) {
      console.log('error submitting reset:', error);
      setError(error.message || "An error occurred during reset.");
    }
  };

  const confirmRegistration = async (e) => {
    e.preventDefault();
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      setSuccess(true)
    } catch (error) {
      console.log('error confirming reset', error);
      setError('Invalid verification code provided, please try again');
    }
  };



  return (
    <>
      <div className="flex">
        <div className="bg-neutral-900 text-white flex flex-col justify-between p-5 pr-16">
          <div><Image alt='logo' src='/img/greenCubesLogo.svg' width={161} height={94} className="w-[7vw]"/></div>
          <div className="px-12">
            <div className="text-3xl mb-1.5 text-greenLime">Recover Password</div>
            <div className="text-xs">Update your password to access the Microsoft Green Cubes Client admin console</div>
          </div>
          {registered ?
          (success ? 
            <div>
              <form className="shadow-lg rounded-xl px-12 max-w-[400px]" action="#" method="POST">
              <div className="flex text-greenLime text-3xl mb-3"><IoIosCheckmarkCircle /></div>
              <div className="text-xl font-bold mb-1">Password Reset Complete</div>
                <div className="mb-5 text-xs">Your password reset was successful.</div>
                <div className="space-y-3 pt-[15vh]">
                  <Link href='/'><button className="group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Go to Login
                  </button></Link>
                </div>
              </form>
              
            </div>
            :
            <div>
              <form onSubmit={confirmRegistration} className="shadow-lg rounded-xl px-12 max-w-[400px]" action="#" method="POST">
                <div className="text-xl font-bold mb-1">Password Reset</div>
                <div className="mb-5 text-xs">Please check your inbox for a confirmation code and enter it below.</div>
                <div className="rounded-md">
                  <div>
                    <input onChange={(e) => setCode(e.target.value)} value={code} id="code" name="code" type="number" placeholder="Confirmation Code" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </div>
                  <div>
                    <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="new-password" placeholder="New Password" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </div>
                </div>

                <div className="space-y-3 pt-[15vh]">
                  <button type="submit" className="group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
            )
            :
          <div>
            <form onSubmit={handleReset} className="shadow-lg rounded-xl px-12 max-w-[400px]" action="#" method="POST">
              <div className="text-xl font-bold mb-1">Enter your email</div>
              <div className="mb-5 text-xs">Enter the email address associated with your account.</div>
              <div className="rounded-md">
                <div>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" autoComplete="email" placeholder="Email Address" required className={`bg-transparent px-3 relative block w-full rounded-md border-0 py-1.5  ring-1 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error ? 'border-red-600 text-red-600 ring-red-600' : 'text-white ring-gray-300'}`}/>
                </div>
              </div>
              {error && (
                  <div className='pt-1 pl-3'>
                  <p className='text-xs text-red-600'>{error}</p>
                  </div>
                )}

              <div className="space-y-3 pt-[15vh]">
                <button type="submit" className="group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Send Code
                </button>
              </div>
            </form>
          </div>
          }
          <div className="flex justify-center text-xs space-x-4 text-gray-400">

              <div className="hover:opacity-50 cursor-pointer">Terms and Conditions</div>

              <div className="hover:opacity-50 cursor-pointer">Privacy Policy</div>

          </div>
        </div>
        <div className="bg-[url('/img/login-forest.jpg')] h-screen w-full bg-cover"></div>
      </div>
    </>
  );
}