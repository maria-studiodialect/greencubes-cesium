import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <>
        <div className="fixed top-0 left-0 z-10 bg-black/60 text-white flex justify-end items-center w-full py-5 px-10 text-md font-light backdrop-blur">
            <div className="relative flex-1"><a href='https://green-cubes-concept.webflow.io/'><Image alt='logo' src='/img/logo.svg' width={45} height={45}/></a></div>
            <div className="flex space-x-14 mt-2">
            <div className="pb-2">Assess</div>
            <div className="border-b-2 px-5 pb-2 font-normal">Explore</div>
            <div className="pb-2">My Forests</div>
            <div className="pb-2">Report</div>
            </div>
            <div className="flex items-center ml-14">
                <div className="relative"><img alt="avatar" className='w-14 h-14 mr-4 object-cover' src="/img/ulrika.png"/></div>
                <div className="font-bold text-xl">Ulrika</div>
            </div>
        </div>
        </>
    )
}