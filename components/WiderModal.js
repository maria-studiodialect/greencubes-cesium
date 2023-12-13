import { motion } from "framer-motion"
import Image from "next/image"

export default function WiderModal({exploreClick, droneSelection, cameraSelection, personSelection}) {
    return (
        <>
        <motion.div 
        initial={{ x: -50,opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
        exit={{ x: -50, opacity: 0}}
        transition={{ ease: 'easeInOut', stiffness: 50, transition: 2}}
        >
        <div className="fixed top-[18vh] left-10 bg-cover z-30">
            <div><Image src='/img/bg-img-wider.jpg' width={870} height={240} className="rounded-lg w-auto h-[21vh] aspect-auto"/></div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-5">
                <Image src={'/img/finca-amable.png'} width={135} height={135} className="drop-shadow-xl ml-4 w-auto h-[12vh] aspect-auto"/> 
                <div className="text-center flex-1 mt-4 ml-3">
                    <div className="text-[3vh] font-bold">Finca Amable</div>
                    <div className="text-xs font-light mb-5 flex justify-center items-center w-full"><Image src={'/img/cr-flag.png'} width={24} height={15} className="mr-1 w-[1vw] h-fit"/> La Gamba tropicstation</div>
                    <div className="text-[1.8vh]">8°42&apos;22&quot;N, 83°10&apos;54&quot;W</div>
                    <div className="text-[1.6vh] flex items-center justify-center mt-1"><Image src={'/img/greencube-minilogo.svg'} width={18} height={21} className="mr-2"/> 3,200,000</div>
                </div>
                <div className="flex flex-col justify-between h-[16vh] mt-1">
                    <div className="flex justify-between">
                        <div className="bg-white p-2 rounded-full cursor-pointer" onClick={cameraSelection}><Image src={'/img/camera-icon.svg'} width={18} height={18} className="mt-[0.06rem]"/></div>
                        <div className="bg-white p-2 rounded-full cursor-pointer" onClick={droneSelection}><Image src={'/img/drone-icon.svg'} width={18} height={18} className="mt-0.5"/></div>
                        <div className="bg-white p-2 rounded-full px-3 cursor-pointer" onClick={personSelection}><Image src={'/img/person-icon.svg'} width={8} height={12} className="mx-[0.05rem]"/></div>
                    </div>
                    <div onClick={exploreClick} className="border border-black px-10 rounded py-1 hover:bg-greenLeaf focus:bg-greenLemon active:bg-greenLime hover:border-transparent hover:drop-shadow">Select</div>
                </div>
            </div>
        </div>
        </motion.div>
        </>
    )
}