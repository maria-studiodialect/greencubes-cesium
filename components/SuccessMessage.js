import { motion } from "framer-motion"
import Image from "next/image"

export default function SuccessMessage({}) {
    return (
        <>
        <div className="absolute top-[16vh] left-10 bg-cover z-40 flex flex-col space-y-4">
                <div className="relative">
                    <div><Image src='/img/bg-img-wider.jpg' width={870} height={240} className="rounded-lg w-auto h-[21vh] aspect-auto"/></div>
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-5">
                        <Image src={'/img/report_download.png'} width={135} height={135} className="drop-shadow-xl ml-4 w-auto h-[12vh] aspect-auto"/> 
                        <div className="text-center flex-1 ml-3 flex flex-col justify-between">
                            <div>
                            <div className="text-[3vh] font-bold leading-tight">Success!</div>
                            <div className="text-xs font-light mb-5">Purchase Completed</div>
                            </div>
                            <div>
                            <div className="text-[1.8vh] flex items-center justify-center mt-1"><Image src={'/img/greencube-minilogo.svg'} width={18} height={21} className="mr-2"/> 24,000,000</div>
                            <div className="text-xs font-light">Cubes added to your account</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between h-[16vh] mt-1">
                            <div className="flex justify-between">
                            </div>
                            <div className="text-[1.8vh] flex items-center justify-center mt-1">
                                <Image src={'/img/finca_amable_outline.png'} width={48} height={55} className="mr-2"/> 
                                <div className="text-xs">
                                    <div className="font-bold">🇨🇷 Costa Rica</div>
                                    <div>Finca Amable</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg flex justify-end px-3 py-3 space-x-3">
                    <div className="border border-black px-14 text-sm font-bold rounded py-1.5 hover:bg-greenLeaf focus:bg-greenLemon active:bg-greenLime hover:border-transparent hover:drop-shadow"><a href="https://green-cubes-concept.webflow.io/contact">MY FOREST</a></div>
                </div>
        </div>
        </>
    )
}