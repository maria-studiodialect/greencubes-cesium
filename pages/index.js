import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Auth } from 'aws-amplify';
import { IoIosLogOut } from "react-icons/io";


// Dynamic imports
const Cesium = dynamic(() => import('../components/Cesium'), { ssr: false });
const Login = dynamic(() => import('./login')); // Assuming your Login component is in the pages directory

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // State to keep track of authentication checking process
  const [user, setUser] = useState()

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user)
      setUser(user)
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false); // Ensures we're done checking authentication status
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      // Optionally, redirect to login or another page
      router.push('/login'); // Adjust the route as needed
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };


  // If we're still checking the auth status, you might want to render nothing or a loader
  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  // If not authenticated, render the Login component
  if (!isAuthenticated) {
    return <Login />;
  }

  // Authenticated users see the main content
  return (
    <>
      {/*<Header/>*/}
      <div className='parent-container'><Cesium user={user} /></div>

      <div className="fixed top-2 right-2 text-white text-sm cursor-pointer flex items-center space-x-1">
        <div onClick={handleSignOut}><IoIosLogOut/></div>
      </div>
    </>
  );
}