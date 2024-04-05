import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image"
import Link from "next/link";

export default function Success() {
   return (
    <div className="bg-neutral-900 w-screen h-screen">
        <div className="fixed h-[80vh] inset-0 z-[9999999] flex items-center justify-center">
        <div className="bg-cover relative">
        <div><Image src='/img/bg-img-wider.jpg' width={870} height={240} className="rounded-lg w-auto h-[22vh] aspect-auto relative z-0"/></div>
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
                    <div className="text-center flex-1 mt-4 ml-3 pt-5">
                        <div className="text-[3vh] font-bold">Thank you!</div>
                    </div>
                    <div className="mt-14 bg-lightGrey w-full flex flex-col items-center pb-4 rounded-b-lg">
                        <div className="text-xs px-28 pb-5 text-center">An agent will be in touch shortly. In the meantime, you can view your reserved cubes in your dashboard.</div>
                        <Link href='/'><div className="flex items-center text-sm font-bold"><FaArrowLeft className="mr-2"/> Back to map</div></Link>
                    </div>
        </div>    
        </div>
        </div>
    </div>
   ) 
}