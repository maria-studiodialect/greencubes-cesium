import Image from "next/image"
import ChartRef from "./ChartRef"
import { RiArrowDropRightFill } from "react-icons/ri";
import { motion } from "framer-motion";

export default function InfoModal({country, flag, coordinates, cubeNr, location, img}) {
    return (
        <>
        <motion.div 
        initial={{ y: 100, x: 0, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ x: -50, y: 0, opacity: 0 }}
        transition={{ ease: 'easeInOut', stiffness: 50, transition: 2}}
        >
        <div className="absolute top-[18vh] left-10 bg-cover z-30">
            <div><Image src='/img/bg-img.jpg' width={374} height={281} className="rounded-lg cover h-[36vh]"/></div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center mb-1">
                <Image src={'/img/LaGambaLogo.png'} width={125} height={125} className="mb-3 drop-shadow-xl"/> 
                <div className="text-2xl font-bold">La Gamba Tropenstation</div>
                <div className="text-sm flex items-center"><Image src={'/img/hectares.svg'} width={30} height={30} className="mr-2"/> 500 Hectares</div>
                <div className="flex justify-center items-center space-x-5 border-t w-full pt-3 mt-2">
                    <Image src={'/img/map_gamba.png'} width={105} height={99} className="mb-3 drop-shadow-xl w-[5vw]"/> 
                    <div className="text-xs font-light text-center"><div className="text-3xl leading-none">🇨🇷</div> <div className="text-lg leading-none">Costa Rica</div></div>
                </div>
            </div>
        </div>
        </motion.div>
        </>
    )
}