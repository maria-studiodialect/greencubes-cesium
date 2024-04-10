import { useState } from "react";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { useRouter } from 'next/router';
import Image from "next/image";

export default function Signup() {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email && password) {
      createUser();
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
          phone_number
          // other custom attributes can go here
        },
      });
      setRegisterd(true); // Redirect to a confirmation page
    } catch (error) {
      console.log('error signing up:', error);
      setError(error.message || "An error occurred during sign up.");
    }
  };

  const confirmRegistration = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(email, code);
      await Auth.signIn(email, password);
      router.push('/')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  };

  const resendSignUpInfo = async () => {
    try {
      await Auth.resendSignUp(email);
      setResent(true);
    } catch (error) {
      console.log('error resending registration code', error);
    }
  };

  const createUser = async () => {
    try {
      await fetch(`/api/createUser`, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, sponsored_cubes: 0}),
      }).then(() => {
          console.log('updated')
      })
    } catch (error) {
        console.error('Error updating the user:', error);
      // Additional error handling logic
    }
  }


  return (
    <>
      <div className="flex">
        <div className="bg-neutral-900 text-white flex flex-col justify-between p-5 pr-16">
          <div><Image alt='logo' src='/img/greenCubesLogo.svg' width={161} height={94} className="w-[7vw]"/></div>
          <div className="px-12">
            <div className="text-3xl mb-1.5 text-greenLime">Join Us</div>
            <div className="text-xs">Sign up to access the Microsoft Green Cubes Client admin console</div>
          </div>
          {registered ?
            <div>
              <form onSubmit={confirmRegistration} className="shadow-lg rounded-xl px-12 max-w-[400px]" action="#" method="POST">
                <div className="text-xl font-bold mb-1">Enter confirmation code</div>
                <div className="mb-5 text-xs">Please check your inbox for a confirmation code and enter it below.</div>
                <div className="rounded-md">
                  <div>
                    <input onChange={(e) => setCode(e.target.value)} value={code} id="code" name="code" type="number" placeholder="Confirmation Code" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                  </div>
                </div>

                <div className="space-y-3 pt-[15vh]">
                  <button type="submit" className="group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Confirm
                  </button>
                  <div className="text-sm text-gray-400 hover:text-white text-center">
                  <div onClick={resendSignUpInfo}>{resent ? 'Code sent. Please check your inbox.' : 'Re-send code?'}</div>
                  </div>
                </div>
              </form>
            </div>
            :
          <div>
            <form onSubmit={handleSignUp} className="shadow-lg rounded-xl px-12" action="#" method="POST">
              <div className="text-xl mb-5 font-bold">Register Your Account</div>
              {error && (
                <div className='bg-red-100 px-4 py-2 mb-3'>
                  <p className='text-xs text-red-600'>{error}</p>
                </div>
              )}
              <div className="rounded-md">
                <div>
                  <input onChange={(e) => setName(e.target.value)} value={name} id="name" name="name" type="text" autoComplete="name" placeholder="Name" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                <div>
                  <input onChange={(e) => setPhoneNumber(e.target.value)} id="phone" name="phone" type="tel" autoComplete="phone" placeholder="Phone Number" className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                <div>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" autoComplete="email" placeholder="Email Address" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                <div>
                  <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="new-password" placeholder="Password" required className="bg-transparent px-3 mb-5 relative block w-full rounded-md border-0 py-1.5 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div className="space-y-3 pt-[15vh]">
                <button type="submit" className="group relative flex w-full justify-center rounded-full bg-greenLime px-3 py-2 text-sm text-black hover:ring-2 ring-slate-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Register
                </button>
                <div className="text-sm text-gray-400 hover:text-white text-center">
                <Link href='/login'>Already have an account?</Link>
                </div>
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
