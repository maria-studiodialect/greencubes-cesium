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
                    d="M138.82,23.82C124.09,9.1,103.78,0,81.32,0,58.85,0,38.54,9.1,23.82,23.82,9.1,38.54,0,58.85,0,81.32c0,8.39,1.27,16.48,3.63,24.1,9.54,30.55,36.57,53.38,69.37,56.75,.1,.01,.2,.02,.3,.03,1.19,.12,2.4,.21,3.61,.27,.28,.02,.57,.03,.85,.04,.73,.03,1.48,.04,2.21,.06,.49,0,.98,.04,1.47,.04,9.13,0,17.9-1.53,26.09-4.3l-7.88-7.89c-5.82,1.53-11.92,2.37-18.22,2.37-.49,0-.98-.03-1.47-.04-38.91-.79-70.22-32.55-70.22-71.65S41.85,9.41,81.44,9.41s71.69,32.1,71.69,71.69c0,20.55-8.65,39.07-22.5,52.14l-29.55-28.84,1.93-.76,2.53-1c11.41-4.5,19.56-15.61,19.55-28.53h0s0-.01,0-.01c0-.76-.03-1.53-.09-2.31h0c-.6-8.05-4.37-15.12-10.06-20.22-5.69-5.1-13.27-8.17-21.41-8.17H59.14v9.57h34.55c5.6,0,10.85,2.1,14.8,5.61,3.96,3.51,6.65,8.49,7.01,14.16h0s0,0,0,0c0,0,0,0,0,0,.03,.47,.04,.92,.04,1.36,0,11.66-9.47,21.13-21.14,21.14h-10.73v6.95s45.06,45.12,45.06,45.12c20.52-14.77,33.91-38.79,33.91-65.99,0-22.47-9.1-42.77-23.82-57.5Z" strokeWidth='2' stroke="white"/>
            </motion.svg>
            {progress !== false && <div className="text-md mt-10">{progress}%</div>}
        </motion.div>
    )
}
export default Loader