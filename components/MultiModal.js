import Image from "next/image"
import ChartRef from "./ChartRef"
import { RiArrowDropRightFill } from "react-icons/ri";

export default function MultiModal({closeClick, country, flag, coordinates, cubeNr, location, img}) {
    return (
        <>
        <div className="absolute top-[16vh] left-8 bg-cover z-30">
            <div className="flex items-center mb-3 bg-white rounded-lg pl-6 py-6 pr-1">
                <div className="mb-5">
                    <div className="font-bold text-sm">Forest height profile</div>
                    <Image src={'/img/chart.svg'} width={231} height={123}/>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-4 mx-10">
                    <div className="flex items-start space-x-2">
                        <Image src={'/img/height-icon.svg'} width={25} height={25}/>
                        <div>
                            <div className="text-xs">Height Difference</div>
                            <div>23 - 28m</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Image src={'/img/area.svg'} width={25} height={25}/>
                        <div>
                            <div className="text-xs">Forest Area (Ha)</div>
                            <div>14,5 Ha</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Image src={'/img/dbh-icon.svg'} width={25} height={25}/>
                        <div>
                            <div className="text-xs">DBH variance</div>
                            <div>15 - 50m</div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Image src={'/img/cubes-est.svg'} width={25} height={25}/>
                        <div>
                            <div className="text-xs">Estimated # of Cubes</div>
                            <div>3,2 million</div>
                        </div>
                    </div>
                </div>
                {/* 
                <div className="text-sm flex items-center text-gray-400 w-[1.5vw] mr-4">
                    <svg width="56" height="66" viewBox="0 0 56 66" fill="#EDEDED" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 2.68911L54 33L1.5 63.3109L1.5 2.68911Z" stroke="#EDEDED" stroke-width="2"/>
                    </svg>
                </div>
                */}
            </div>
            <div className="bg-white rounded-lg flex justify-end px-3 py-3 space-x-3">
            <div onClick={closeClick} className="border border-black px-14 text-sm font-bold text-gray-400 border-gray-400 rounded py-1.5 hover:bg-gray-300 hover:text-white hover:border-transparent hover:drop-shadow">BACK</div>
            <div className="border border-black px-14 text-sm font-bold rounded py-1.5 hover:bg-gradient-to-r from-lime-400 to-[#F3F424] hover:text-white hover:border-transparent hover:drop-shadow"><a href="https://green-cubes-concept.webflow.io/contact">ADD TO CHECKOUT</a></div>
            </div>
        </div>
        </>
    )
}