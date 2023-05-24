import Link from "next/link"
import { motion } from "framer-motion"


const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0
    }, 
    visible: {
        opacity: 1, 
        pathLength: 1, 
        transition: {
            duration: 2, 
            ease: 'easeInOut'
        }
    }
}

const Loader = ({text, progress}) => {
    return (
        <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="h-screen w-screen fixed top-0 left-0 overflow-x-hidden flex flex-col items-center justify-center text-center bg-black text-white z-[1]">
            <motion.svg width="155" height="155" viewBox="0 0 155 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1
                    }}
                    d="M53.14,48.04c1.55,0,3.33,0,5.12,0,8.77,0,17.54-.11,26.31,.05,9.35,.17,17.85,9.16,17.43,18.13-.46,9.72-8.3,17.29-18.06,17.43-3.26,.05-6.52,.09-10.05,.14v6.94c13.3,13.28,26.62,26.57,39.9,39.84,4.2-1.38,6.48-4.57,9.22-7.13,10.58-9.88,16.87-22.17,20.22-36.13,1.57-6.53,1.35-13.31,1.12-19.74-.26-7.29-1.86-14.03-4.22-20.72-2.9-8.18-7.54-15.29-13.14-21.97-7.08-8.46-15.81-14.38-25.69-18.85C90.56,1.16,79.24-.54,67.51,.14c-8.14,.47-15.97,2.27-23.45,5.51-9.53,4.13-17.77,10.05-24.87,17.66C7.07,36.29,.86,51.76,.07,69.36c-.5,11.35,1.53,22.27,6.48,32.67,6.35,13.33,15.47,24.1,28.11,31.75,7.16,4.34,14.83,7.51,23.16,8.94,1.17,.2,2.33,.45,3.48,.75,2.23,.58,4.52,.87,6.82,.87h6.81c1.21,0,2.42-.08,3.62-.24,1.63-.22,4.07-.43,4.74-.59,4.1-.93,8.52-.81,12.32-3.6-3.11-3.54-3.62-4.2-6.95-7.47-39.7,9.25-70.27-16.52-76.96-45.84C4.98,57.16,18.17,27.29,47.89,14.64c29.88-12.72,62.94-1.94,79.37,27.24,14.86,26.39,7.12,58.17-11.26,74.33-5.24-3.55-22.13-20.24-24.07-23.8,1.63-.77,3.3-1.47,4.89-2.31,14.94-7.84,19.5-26.47,9.53-40.28-5.56-7.69-13.49-11.54-22.94-11.78-8.93-.22-21.3-.06-30.23-.03l-.03,10.02Z" strokeWidth='2' stroke="white"/>
            </motion.svg>
            {progress !== false && <div className="text-md mt-10">{progress}%</div>}
        </motion.div>
    )
}
export default Loader