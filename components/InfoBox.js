import Image from "next/image";
import { RiCloseCircleFill } from 'react-icons/ri';
import { motion } from "framer-motion";

export default function InfoBox({exploreClick, closeClick, country, location, coordinates, bio, cubes, img}) {
    return (
        <>
        <div className="absolute top-[14%] left-10 z-10">
        <motion.div 
        initial={{ x: -100,opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{}}
        >
        <div  onClick={closeClick} className="absolute right-[-5px] top-[-4px] text-white z-10"><RiCloseCircleFill /></div>
        <div className="grid grid-cols-2 text-white bg-black/60 backdrop-blur rounded-xl px-4 py-3 mb-2">
            <div className="mx-10"><Image src='/img/Costa_Rica.svg' alt='costa rica outline map' width={82} height={78}/></div>
            <div>
                <div className="text-xs">Central America</div>
                <div className="text-xxs opacity-80">Costa Rica</div>
                <div className="text-xs mt-5">Parcels <span className="ml-4">3</span></div>
            </div>
        </div>
        <div className="text-white bg-black/60 backdrop-blur rounded-xl px-4 py-2">
            <div className="flex justify-between space-x-5">
            <div>
                <div>Costa Rica</div>
                <div className="text-xs opacity-80">{location ? location : 'La Selva'}</div>
            </div>
            <div className="text-xxs opacity-40 pt-1">{coordinates ? coordinates : '-84.006971, 10.430623'}</div>
            </div>
            <div className="bg-white relative h-[18vh] w-[25vw] object-cover rounded-md my-3">
                <Image src={img ? img : '/img/location-img.svg'} fill alt='graphs' className="object-contain"/>
            </div>
            <div className="grid grid-cols-2 text-center pb-3">
                <div>
                    <div className="text-xs opacity-80">Biodiversity</div>
                    <div>{bio ? bio : 'High'}</div>
                </div>
                <div>
                    <div className="text-xs opacity-80">Cubes</div>
                    <div>{cubes ? cubes : '580 Million'}</div>
                </div>
            </div>
            <div onClick={exploreClick} className="bg-blue text-center py-1.5 rounded-md mb-[-1em] mx-4 drop-shadow-xl cursor-pointer">Explore</div>
        </div>
        </motion.div>
        </div>
        
        </>
    )
}