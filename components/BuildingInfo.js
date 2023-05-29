import Image from "next/image";
import { RiCloseCircleFill } from 'react-icons/ri';
import { motion } from "framer-motion";

export default function BuildingInfo({exploreClick, closeClick, country, location, coordinates, bio, cubes, img}) {
    return (
        <>
        <div className="mt-14">
        <motion.div 
        initial={{ x: -50,opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ ease: 'easeInOut', stiffness: 50}}
        >
        {/*
        <div  onClick={closeClick} className="absolute right-[-5px] top-[-4px] text-black z-10 cursor-pointer font-2xl"><RiCloseCircleFill /></div>
        
        <div className="grid grid-cols-2 text-white bg-white/80 backdrop-blur rounded-xl px-4 py-3 mb-2">
            <div className="mx-10"><Image src='/img/Costa_Rica.svg' alt='costa rica outline map' width={82} height={78}/></div>
            <div>
                <div className="text-xs">Central America</div>
                <div className="text-xxs opacity-80">Costa Rica</div>
                <div className="text-xs mt-5">Parcels <span className="ml-4">3</span></div>
            </div>
        </div>
        */}
        <div className="text-black bg-white backdrop-blur rounded-xl px-6 py-4">
            <div className="flex justify-between space-x-5">
            <div>
                <div className="text-2xl font-bold">Google Data-centre</div>
                <div className="text-xs opacity-80">{location ? location : 'The Dalles, Oregon'}</div>
            </div>
            <div className="text-xxs opacity-40 pt-1">{coordinates ? coordinates : '-121.178682, 45.594564'}</div>
            </div>
            <div className="flex mt-3">
            <div className="bg-white relative h-[18vh] w-[19vw] object-cover rounded-md mr-2">
                <Image src='/img/google-datacentre.webp' fill alt='graphs' className="object-cover" priority/>
            </div>
            <div className="space-y-5">
                <div>
                    <div className="text-xs opacity-80">Biodiversity</div>
                    <div className="font-bold">{bio ? bio : 'High'}</div>
                </div>
                <div>
                    <div className="text-xs opacity-80">Cubes</div>
                    <div className="font-bold">{cubes ? cubes : '460,000 m3'}</div>
                </div>
            </div>
            </div>
        </div>
        </motion.div>
        </div>
        
        </>
    )
}