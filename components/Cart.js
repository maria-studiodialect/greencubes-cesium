import Button from "./Button";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { PiMedalFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";


export default function Cart({inputValue, handleChange, handleClose, user, userData}) {
    const [step, setStep] = useState(1)
    const [greenCubes, setGreenCubes] = useState(0)
    const [email, setEmail] = useState(user.attributes.email)
    const [phone, setPhone] = useState(user.attributes.phone_number)

    useEffect(() => {
        setGreenCubes(inputValue);
    }, [inputValue]);


    console.log(step)

    function getCta() {
        switch(step) {
            case 1:
                return 'Check out';
            case 2:
                return 'Submit';
            case 3:
                return 'Checkout';
            default:
                return 'Continue'; // It's a good practice to have a default case
        }
    }

    function getTitle() {
        switch(step) {
            case 1:
                return 'Shopping Cart';
            case 2:
                return 'Contact';
            case 3:
                return 'Thank you!';
            default:
                return 'Continue'; // It's a good practice to have a default case
        }
    }

    // Get today's date
    const today = new Date();

    // Add one month
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

    // Format the date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = nextMonth.toLocaleDateString('en-GB', options); 

    const updatedCubes = (Number(userData.sponsored_cubes) + Number(inputValue))

    const onFormSubmit = async (data) => {
        try {
            await fetch(`/api/updateUser`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userData.id, ...data }),
            }).then(() => {
                console.log('updated')
                console.log(data)
            })
        } catch (error) {
            console.error('Error updating the product:', error);
          // Additional error handling logic
        }
    }
    function btnClick() {
        if (step === 2) {
            setStep(step + 1)
            onFormSubmit({sponsored_cubes: updatedCubes})
        } else {
            setStep(step + 1)
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
                <div><Image src='/img/bg-img-wider.jpg' width={870} height={240} className="rounded-lg w-auto h-[22vh] aspect-auto relative z-0"/></div>
                <div onClick={handleClose} className="absolute top-2 right-2 text-md bg-white rounded-full p-1 cursor-pointer shadow hover:bg-greenLemon z-10"><IoClose /></div>
                <form name="contactForm" netlify method="POST">
                <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center">
                    <div className="text-center flex-1 mt-4 ml-3 pt-5">
                        <div className="text-[3vh] font-bold">{getTitle()} </div>
                    </div>
                    {step === 1 &&
                    <div className="flex space-x-5 mt-14 bg-lightGrey w-full px-5">
                        {/* 
                        <div>
                            <div className="flex items-center"><Image src={'/img/greencube-minilogo.svg'} width={18} height={18} className="mr-2"/><span className="text-lg font-bold">{Intl.NumberFormat('en-US').format(userData.sponsored_cubes)}</span></div>
                            <div className="text-xs block ml-7">Already Acquired</div>
                        </div>
                        <div>+</div>
                         */}
                        <div>
                            <div className="flex items-center"><Image src={'/img/greencube-minilogo.svg'} width={18} height={18} className="mr-2"/><span className="text-lg font-bold">{Intl.NumberFormat('en-US').format(greenCubes)}</span></div>
                            <div className="text-xs block ml-7">Requested</div>
                        </div>
                        <div className="text-xs">
                            <div><b>Sponsorship Offer</b>: {Intl.NumberFormat('en-US').format(greenCubes * 0.10)} USD</div>
                            <div><b>Holding Period</b>: 1 Month</div>
                            <div><b>Holding Expiry Date</b>: {formattedDate}</div>
                        </div>
                        {userData.sponsored_cubes > 0 &&
                        <div className="text-xs">
                            <div><b>Previously Acquired</b>: {Intl.NumberFormat('en-US').format(userData.sponsored_cubes)}</div>
                            <div><b>Updated Total</b>: {Intl.NumberFormat('en-US').format(Number(userData.sponsored_cubes) + Number(greenCubes))}</div>
                        </div>
                        }
                    </div>
                    }
                    
                    <input type="hidden" name="form-name" value="contactForm" />
                    {step === 2 &&
                        <div className="mt-14 bg-lightGrey w-full flex flex-col items-center px-5">
                            <div className="text-xs px-24 pb-5">On check out, your cubes will now be escrowed for one month, and an agent wil be in contact to manage the purchase order and payment.</div>
                            <div className="flex gap-y-3 mt-2 gap-x-5">
                                <div className="text-sm font-bold leading-tight mr-10">Preferred means<br/>of contact</div>
                                <div className="space-y-3">
                                <div className="flex items-center border border-solid border-black rounded-full  text-xs w-[12vw]"><input
                                    type="phone"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    step="1"
                                    placeholder='Phone'// Update the value when the input changes
                                    className="bg-transparent text-center rounded-full py-1.5 px-3 w-full"
                                /></div>
                                <div className="flex items-center border border-solid border-black rounded-full  text-xs w-[12vw]"><input
                                    type="email"
                                    id="email"
                                    step="1"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder='Email'// Update the value when the input changes
                                    className="bg-transparent text-center rounded-full py-1.5 px-3 w-full"
                                /></div>
                                </div>
                                <div className="w-[8vw]"></div>
                            </div>
                        </div>
                    }
                    {step === 3 &&
                    <div className="mt-14 bg-lightGrey w-full flex flex-col items-center">
                        <div className="text-xs px-28 pb-5 text-center">An agent will be in touch shortly. In the meantime, you can view your reserved cubes by login into your account.</div>
                    </div>
                    }
                    {step < 3 &&
                    <div className="flex justify-end space-x-4 pt-5 bg-lightGrey w-full p-5 pt-12 rounded-b-lg">
                        <Button text='Cancel' customStyle='bg-gray-200 text-gray-500 shadow-none hover:bg-gray-400'/>
                        <Button type='submit' onClick={btnClick} text={getCta()} customStyle='bg-transparent border border-solid border-black shadow-none'/>
                    </div>
                    }
                    
                </div>
                </form>
        </div>
        
        </motion.div>
        </>
    )
}
