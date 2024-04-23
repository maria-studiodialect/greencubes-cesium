import Image from "next/image";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { motion } from 'framer-motion'

export default function Project({toggleProject}) {
    return (
        <>
        <motion.div 
        initial={{opacity: 0 }}
        animate={{ opacity: 1}}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bg-lightGrey h-[100vh] ml-[22vw] overflow-y-scroll">
        <div className="border-l border-black pt-5 px-8 ml-8 pb-10">
            <div onClick={toggleProject} className="fixed top-5 right-5 flex justify-end"><div className="border border-solid border-black px-10 py-0.5 rounded-full text-sm hover:bg-gray-200 cursor-pointer">Close</div></div>
            <div className="pr-[10vw]">
                <div className="text-[7vh] font-extralight">La Gamba Tropenstation</div>
                <div className="pt-3 pb-6">The La Gamba Field Station is a research and teaching facility of the University of Vienna and is the custodian of 500 hectares of rainforst  in the COBIGA corridor.</div>
                <Image src='/img/project-img.jpg' width={928} height={434} className="object-cover h-[52vh] w-full aspect-auto"/>
                <div className="my-8 w-2/3">La Gamba biological corridor (COBIGA) is being developed to connect the lowland rainforests of the Golfo Dulce region with the upland rainforests of the Fila Cal, a mountain range north of the &quot;Regenwald der Österreicher&quot;. There is currently 500 hectares under management representing 125 Million Green Cubes. </div>
                <a href="https://r-evolution.com/r-initiatives/forest" target="_blank"><div className="flex items-center hover:text-greenLime cursor-pointer">Learn More <IoArrowForwardCircleOutline className="ml-5 text-2xl"/></div></a>
            </div>
        </div>
        </motion.div>
        </>
    )
}