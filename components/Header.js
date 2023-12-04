import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <>
        <div className="fixed top-0 left-0 z-10 bg-black/60 text-white flex justify-between items-center w-full py-5 px-10 text-md font-light backdrop-blur">
            <div className="relative pt-3 mr-40"><a href='https://green-cubes-concept.webflow.io/'><Image alt='logo' src='/img/greenCubesLogo.svg' width={161} height={94} className="w-[7vw]"/></a></div>
            <div className="flex flex-1 justify-around mt-2 font-bold text-gray-400 mx-[10%]">
            <div className="pb-2">WHO</div>
            <div className="pb-2">WHY</div>
            <div className="pb-2">WHAT</div>
            <div className="pb-2">HOW</div>
            </div>
            <div className="flex items-center ml-14">
                <div className="relative"><img alt="avatar" className='w-10 h-10 mr-4 object-cover' src="/img/ulrika.png"/></div>
            </div>
            <div className="ml-10"><Image alt='logo' src='/img/burger_menu.svg' width={50} height={20} className="w-[2vw]" /></div>
        </div>
        </>
    )
}