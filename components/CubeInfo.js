import Image from "next/image";
import Chart from 'chart.js/auto';
import ChartRef from "./ChartRef";
import { RiCloseCircleFill } from 'react-icons/ri';
import { motion } from "framer-motion";

export default function CubeInfo({exploreClick, closeClick, remaining, sponsored, cubes, carbon, values}) {
    return (
        <>
        <div className="absolute top-[14%] right-10 z-10">
        <motion.div 
        initial={{ x: 20,opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ ease: 'easeInOut', stiffness: 50}}
        >
        <div  onClick={closeClick} className="absolute right-[-5px] top-[-4px] text-stone-600 z-10"><RiCloseCircleFill /></div>
        <div className="bg-white text-black backdrop-blur rounded-xl px-4 py-4">
            <div className="flex justify-between mb-7">
                <div><span className="text-3xl font-bold">5,456</span> cubes</div>  
                <div className="text-center">
                    <div className="text-xxs opacity-80">Carbon Offset Value</div>
                <div className="text-green-500">320 <span className="text-xxs">CO2e</span></div>
                </div>
            </div>
            <ChartRef values={values}/>
            <div className="flex justify-center text-sm items-center">
                <div className="text-green-500  px-4 py-1">Forest profile</div>
                <div className="text-gray-400 bg-white px-4 py-1 rounded-xl">Biodiversity</div>
            </div>
            <div className="text-2xl py-4">Select</div>
            <div className="flex text-center pb-3">
                <div className="text-gray-400 w-1/4">
                    <div>16,346</div>
                    <div className="border-2 border-gray-400"></div>
                    <div>Remaining</div>
                </div>
                <div className="text-green-500 w-3/4">
                <div>34,563</div>
                <div className="border-2 border-green-500"></div>
                <div>Sponsored</div>
                </div>
            </div>
            <div className="bg-blue text-center py-1.5 rounded-md my-5 drop-shadow-xl cursor-pointer">Purchase</div>
        </div>
        </motion.div>
        </div>
        </>
    )
}