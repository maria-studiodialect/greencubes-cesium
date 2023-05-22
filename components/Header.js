import Image from "next/image"

export default function Header() {
    return (
        <>
        <div className="fixed top-0 left-0 z-10 bg-black/60 text-white flex justify-between items-center w-full py-5 px-10 font-extralight backdrop-blur">
            <div className="relative"><Image alt='logo' src='/img/logo.png' width={45} height={45}/></div>
            <div className="pb-2">Assess</div>
            <div className="border-b-2 px-5 pb-2 font-normal">Explore</div>
            <div className="pb-2">My Forests</div>
            <div className="pb-2">Report</div>
            <div className="flex items-center">
                <div className="relative"><img  className='w-10 h-10 bg-white rounded-full mr-4 object-cover' src="/img/avatar.jpg"/></div>
                <div>Ulrika</div>
            </div>
        </div>
        </>
    )
}