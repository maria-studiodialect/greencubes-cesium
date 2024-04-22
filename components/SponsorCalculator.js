import Button from "./Button";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { PiMedalFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";



export default function SponsorCalculator({inputValue, handleClose, handleChange, available }) {
    const [step, setStep] = useState(1);
    const [size, setSize] = useState(0); // Size in sqm
    const [employees, setEmployees] = useState(0); // Number of employees
    const [data, setData] = useState(0); // Data consumption in GB
    const [greenCubes, setGreenCubes] = useState(0);
    const [sqm, setSqm] = useState(0);
    const [selectedLevel, setSelectedLevel] = useState('Gold'); 
    const [baseGreenCubes, setBaseGreenCubes] = useState(0); // New state to store the base calculation for green cubes
    const [message, setMessage] = useState(""); 

    const calculateGreenCubes = () => {
        const sizeImpact = size * 3;
        const employeesImpact = employees * 36;
        const dataImpact = data * 500;
        
        // Calculate total impact
        let totalImpact = Number(sizeImpact) + Number(employeesImpact) + Number(dataImpact);
        console.log("Calculating total impact:", totalImpact);
    
        // Check if total impact exceeds the maximum allowed value
        if (totalImpact > available) {
            console.log("Total exceeds the maximum available value of cubes. Adjusting to available.");
            totalImpact = available; // Set to maximum value
            setMessage("The maximum amount of cubes is available"); // Set message
        } else {
            setMessage(""); // Reset message if within limit
        }
        
        setBaseGreenCubes(totalImpact); // Store this as the base calculation, adjusted if necessary
        adjustGreenCubesAndSqmForLevel(selectedLevel); // Adjust according to the current level
    };
    
    // Ensure this function is dependent on the latest baseGreenCubes
    useEffect(() => {
        adjustGreenCubesAndSqmForLevel(selectedLevel);
    }, [baseGreenCubes, selectedLevel]); // Recalculate whenever baseGreenCubes or selectedLevel changes
    
    const adjustGreenCubesAndSqmForLevel = (level) => {
        // Now this function directly uses baseGreenCubes which should be up-to-date
        const newGreenCubes = Math.round(baseGreenCubes * levels[level]);
        console.log(`Adjusting for level ${level}:`, newGreenCubes);
    
        setGreenCubes(newGreenCubes);
        setSqm(Math.round(newGreenCubes / 25));
    };
    
    const handleSelectLevel = (level) => {
        setSelectedLevel(level);
        // No need to call adjustGreenCubesAndSqmForLevel here directly if useEffect is used
    };

    const levels = {
        Gold: 1,
        Silver: 0.6,
        Bronze: 0.4,
    };

    
    function getCta() {
        switch(step) {
            case 1:
                return 'Calculate';
            case 2:
                return 'Populate';
            case 3:
                return 'Checkout';
            default:
                return 'Continue'; // It's a good practice to have a default case
        }
    }

    function btnClick() {
        if (step === 1) {
            calculateGreenCubes();
            setStep(step + 1)
        } else {
            handleChange(greenCubes);
            handleClose()
        }
    }

    return (
        <>
        <motion.div 
        initial={{ x: -50,opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
        exit={{ x: -50, opacity: 0}}
        transition={{ ease: 'easeInOut', stiffness: 50, transition: 2}}
        className="fixed h-[80vh] inset-0 z-[9999999] flex items-center justify-center"
        >
        <div className="bg-cover relative">
                <div onClick={handleClose} className="absolute top-2 right-2 text-md bg-white rounded-full p-1 cursor-pointer shadow hover:bg-greenLemon z-10"><IoClose /></div>

                <div><Image src='/img/bg-img-wider.jpg' width={870} height={240} className="rounded-lg w-auto h-[21vh] aspect-auto relative z-0"/></div>
                <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
                    <div className="text-center flex-1 mt-4 ml-3 pt-5">
                        <div className="text-[3vh] font-bold">Sponsor Calculator</div>
                    </div>
                    {step === 1 &&
                    <div className="mt-14 bg-lightGrey w-full flex flex-col items-center pl-5 pr-2">
                        <div className="grid grid-cols-2 items-center gap-y-3 mt-2 gap-x-5">
                            <div>Size in sqm</div>
                            <div className="flex items-center border border-solid border-black rounded-full py-0.5"><input
                                type="number"
                                id="size"
                                value={size} 
                                onChange={(e) => setSize(e.target.value)}
                                className="bg-transparent text-center rounded-full"
                            /></div>
                            
                            <div className="w-full">Data Consumption</div>
                            <div className="flex items-center border border-solid border-black rounded-full py-0.5"><input
                                type="number"
                                id="numberInput"
                                step="1"
                                value={data}
                                onChange={(e) => setData(e.target.value)}// Update the value when the input changes
                                className="bg-transparent text-center rounded-full"
                            /></div>
                            {/*<div className="text-[0.6em] text-gray-500">How do I calculate this?</div>*/}
                            <div>No of employees</div>
                            <div className="flex items-center border border-solid border-black rounded-full py-0.5"><input
                                type="number"
                                id="numberInput"
                                step="1"
                                value={employees}
                                onChange={(e) => setEmployees(e.target.value)}// Update the value when the input changes
                                className="bg-transparent text-center rounded-full"
                            /></div>
                            
                            
                        </div>
                    </div>
                    }
                    {step === 2 &&
                    <div className="mt-14 bg-lightGrey w-full px-32 flex flex-col items-center">
                        <div className="flex space-x-5 mb-4">
                            {/* Implement onClick handlers to select the level */}
                            <div onClick={() => handleSelectLevel('Bronze')} className={`flex flex-col items-center`}>
                                <div className={`rounded-full border border-solid p-2 w-fit ${selectedLevel === 'Bronze' ? 'bg-greenLemon text-greenOlive border-greenOlive' : 'border-black'}`}>
                                    <PiMedalFill />
                                </div>
                                <div className={`${selectedLevel === 'Bronze' && 'font-bold'} text-sm mt-2.5`}>Bronze</div>
                            </div>
                            <div onClick={() => handleSelectLevel('Silver')} className={`flex flex-col items-center`}>
                                <div className={`rounded-full border border-solid p-2 w-fit ${selectedLevel === 'Silver' ? 'bg-greenLemon text-greenOlive border-greenOlive' : 'border-black'}`}>
                                    <PiMedalFill />
                                </div>
                                <div className={`${selectedLevel === 'Silver' && 'font-bold'} text-sm mt-2.5`}>Silver</div>
                            </div>
                            <div onClick={() => handleSelectLevel('Gold')} className={`flex flex-col items-center`}>
                                <div className={`rounded-full border border-solid p-2 w-fit ${selectedLevel === 'Gold' ? 'bg-greenLemon text-greenOlive border-greenOlive' : 'border-black'}`}>
                                    <PiMedalFill />
                                </div>
                                <div className={`${selectedLevel === 'Gold' && 'font-bold'} text-sm mt-2.5`}>Gold</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-3 mt-2">
                            <div>Size in sqm</div>
                            <div className="flex items-center justify-start border border-solid border-black rounded-full px-14 py-0.5"><span className="flex-1 ">{Intl.NumberFormat('en-US').format(sqm)}</span></div>
                            <div>Green Cubes</div>
                            <div className="flex items-center justify-start border border-solid border-black rounded-full px-2 py-0.5"><Image src={'/img/greencube-minilogo.svg'} width={12} height={12} className="mr-2"/><span className="flex-1 pl-7">{Intl.NumberFormat('en-US').format(greenCubes)}</span></div>
                            
                        </div>
                    </div>
                    }

                    <div className="flex justify-end space-x-4 pt-5 bg-lightGrey w-full p-5 pt-12 rounded-b-lg">
                        <Button onClick={handleClose} text='Cancel' customStyle='bg-gray-200 text-gray-500 shadow-none hover:bg-gray-400'/>
                        <Button onClick={btnClick} text={getCta()} customStyle='bg-transparent border border-solid border-black shadow-none'/>
                    </div>
                </div>
        </div>
        </motion.div>
        </>
    )
}