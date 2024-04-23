import Image from "next/image"
import ChartRef from "./ChartRef"
import { RiArrowDropRightFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Button from "./Button";
import { useState, useEffect, useRef } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";


export default function SideMenu({user, type, img, title, roundImg, cubes = 3200000, selected = false, btnText, onClick, onAreaSelect, onSiteSelect, onPlotSelect, droneSelection, cameraSelection, personSelection, menuSelected, toggleProject, closeAbout, backToGlobe, backButton }) {
    const [pdfOpen, setPdfOpen] = useState(false)

    function pdfReveal() {
        setPdfOpen(true)
        closeAbout()
    }


    function aboutReveal() {
        toggleProject()
        setPdfOpen(false)
    }


    return (
        <>
        <motion.div 
        initial={{ y: 100, x: 0, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ x: -50, y: 0, opacity: 0 }}
        transition={{ ease: 'easeInOut', stiffness: 50, transition: 2}}
        >
        <div className="absolute top-0 left-0 bg-cover z-30 w-[22vw] h-full bg-lightGrey flex flex-col justify-between">
            <Image src={img} width={374} height={281} className="object-cover h-[32vh] w-full aspect-auto"/>
            {type === 'Location' && <div className="flex justify-between items-center absolute top-0 left-0 w-full pt-1 px-2 text-white text-2xl cursor-pointer hover:text-greenLemon"><IoIosArrowBack onClick={backButton}/><Image src={'/img/globe.png'} width={45} height={45} onClick={backToGlobe}/></div>}
            {type === 'Site' && <div className="flex justify-between items-center absolute top-0 left-0 w-full pt-1 px-2 text-greenLime  text-2xl cursor-pointer hover:text-greenLemon"><IoIosArrowBack onClick={backButton} /><Image src={'/img/globe.png'} width={45} height={45} onClick={backToGlobe}/></div>}

            <div className="flex-1">
                <Image src='/img/bg-img.jpg' width={374} height={281} className="object-cover h-[36vh] w-full aspect-auto"/>
                <div className="absolute top-[35vh] left-0 right-0 flex flex-col items-center justify-between mb-1 flex-1">
                    {type === 'Location' && 
                        <Location selected={selected} onSiteSelect={onSiteSelect} pdfReveal={pdfReveal} aboutReveal={aboutReveal} pdfClose={() => setPdfOpen(false)} />
                    }
                    {type === 'Site' && 
                        <Site menuSelected={menuSelected} selected={false} pdfReveal={pdfReveal} title={title} cubes={cubes} onPlotSelect={onPlotSelect} droneSelection={droneSelection} cameraSelection={cameraSelection} personSelection={personSelection}/>
                    }
                    {type === 'Welcome' && 
                        <Welcome onAreaSelect={onAreaSelect} user={user} />
                    }
                </div>
            </div>
            <div onClick={onClick} className="bg-greenLime w-full py-2.5 text-center min-h-[6vh]">{(title !== 'Estacion Tropical La Gamba' && title !== 'Finca Eduardo') && <Button text={btnText} />}</div>
        </div>
        </motion.div>
        {pdfOpen &&
        <div className="absolute top-6 right-[4vw] z-[9999999] w-[70vw] h-[87vh]">
            <div onClick={() => setPdfOpen(false)} className="flex justify-end mb-2 text-white text-2xl"><IoCloseCircle /></div>
            {/*
        <object data="/baseline_assessment.pdf" type="application/pdf" width="100%" height="100%">
            <p>Alternative text - include a link <a href="/baseline_assessment.pdf">to the PDF!</a></p>
        </object> 
        */}
        <iframe
            src={`${"https://upcdn.io/W142iUD/raw/greencubes/baseline_assessment.pdf"}#navpanes=0`}
            style={{ width: '100%', height: '100%', border: 'none' }}
        />
        </div>
        }
        </>
    )
}

function Welcome({onAreaSelect, user}) {
    return (
        <>
        <Image src={'/img/finca-amable.png'} width={125} height={125} className="mb-3 drop-shadow-xl w-auto h-[12vh] aspect-auto"/> 
            <div className="text-[3.2vh] text-center leading-tight mb-2">Welcome, {user.attributes.name}</div>
                <div className={`border-b w-full text-gray-500 mt-4 relative`}> {/* Attach the ref here */}
                    <div onClick={onAreaSelect} className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Costa Rica - La Gamba</div>
                </div>
                <div className={`border-b w-full text-gray-500`}>
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Colombia</div>
                </div>
                <div className={`border-b w-full text-gray-500`}>
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Brazil - Atlantic Costal Forest</div>
                </div>
        </>
    )
}

function Site({title, cubes, onPlotSelect, droneSelection, cameraSelection, personSelection, menuSelected, onSiteSelect, pdfReveal}) {
    return (
        <>
        <Image src={'/img/finca-amable.png'} width={125} height={125} className="mb-3 drop-shadow-xl w-auto h-[12vh] aspect-auto"/> 
            <div className="text-[3.2vh] text-center leading-tight mb-2 px-14">{title}</div>
            <div className="text-sm flex items-center"><Image src={'/img/greencube-minilogo.svg'} width={18} height={18} className="mr-2"/>{Intl.NumberFormat('en-US').format(cubes)}</div>
            <div className="flex justify-between mt-6 space-x-3">
                        <div className="cursor-pointer" onClick={cameraSelection}><Image src={'/img/camera-icon-bg.svg'} width={32} height={32} className="mt-[0.08rem] hover:opacity-50"/></div>
                        <div className="cursor-pointer" onClick={droneSelection}><Image src={'/img/drone-bg.svg'} width={32} height={32} className="mt-0.5 hover:opacity-50"/></div>
                        <div className="cursor-pointer" onClick={personSelection}><Image src={'/img/live-bg.svg'} width={32} height={32} className="mx-[0.05rem] hover:opacity-50"/></div>
                    </div>
                <div className={`border-b w-full text-gray-500 mt-4 relative`}> {/* Attach the ref here */}
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Explore</div>
                </div>
                <div className={`border-b w-full text-gray-500`}>
                    <div className={`hover:bg-greenLeaf py-3 px-8 cursor-pointer ${menuSelected === 'Sponsor' ? 'bg-greenLeaf' : ''}`} onClick={onPlotSelect}>Sponsor</div>
                </div>
                <div onClick={pdfReveal} className={`border-b w-full text-gray-500`}>
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Baseline report</div>
                </div>
        </>
    )

}

function Location({ selected, onSiteSelect, pdfReveal, aboutReveal, pdfClose}) {
    const [openSites, setOpenSites] = useState(false);
    const dropdownRef = useRef(null); // Step 1

    useEffect(() => { // Step 2
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenSites(false); // Step 3
            }
        }

        // Attach the event listener
        if (openSites) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Remove the event listener on cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSites]); // This effect should run when `openSites` changes.

    return (
        <>
            <Image src={'/img/LaGambaLogo.png'} width={125} height={125} className="mb-3 drop-shadow-xl w-auto h-[12vh] aspect-auto"/> 
            <div className="text-[3.2vh] text-center leading-tight mb-2">La Gamba<br/>Tropenstation</div>
            {!selected ?
            <>
                <div className="text-sm flex items-center"><Image src={'/img/hectares.svg'} width={20} height={20} className="mr-2"/> 500 Hectares</div>
                <div className="flex flex-col justify-center items-center space-x-5 w-full pt-5 my-4">
                    <Image src={'/img/map_gamba.png'} width={105} height={99} className="mb-3 drop-shadow-xl h-[13vh] w-auto aspect-auto"/> 
                    <div className="text-xs font-light flex items-center"><Image src={'/img/cr-flag.png'} width={30} height={30} className="mr-4 h-[2vh]"/><div className="text-lg leading-none">Costa Rica</div></div>
                </div>
            </>
            :
            <>
                <div className={`border-b w-full text-gray-500 mt-4 relative`} ref={dropdownRef}> {/* Attach the ref here */}
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer" onClick={() => {setOpenSites(true); pdfClose()}}>Available sites</div>
                    {openSites &&
                        <div className="absolute top-0 left-[22vw] bg-lightGrey w-max">
                            <div onClick={() => onSiteSelect('Finca Amable')} className="hover:bg-greenLeaf py-3 px-8 cursor-pointer border-b">Finca Amable</div>
                            <div onClick={() => onSiteSelect('Finca Eduardo')} className="hover:bg-greenLeaf py-3 px-8 cursor-pointer border-b">Finca Eduardo</div>
                            <div onClick={() => onSiteSelect('Estacion Tropical La Gamba')} className="hover:bg-greenLeaf py-3 px-8 cursor-pointer border-b">Estacion Tropical La Gamba</div>
                        </div>
                    }
                </div>
                <div className={`border-b w-full text-gray-500`}>
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Camera traps & sightings</div>
                </div>
                <div  onClick={pdfReveal}  className={`border-b w-full text-gray-500`}>
                    <div className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">Baseline reports</div>
                </div>
            </>
            }
            <div className={`${selected ? 'border-t' : 'border-b'} w-full text-gray-500`}>
                <div onClick={aboutReveal} className="hover:bg-greenLeaf py-3 px-8 cursor-pointer">About the project</div>
            </div>
        </>
    );
}

