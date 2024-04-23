import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, GradientTexture, Box, Billboard, Text, MeshTransmissionMaterial, ContactShadows, Environment, OrbitControls, PresentationControls, Html, Decal, RenderTexture, PerspectiveCamera} from '@react-three/drei'
import PieChart from './PieChart';


export default function WebGLMinimal({selected}) {
    const [unavailable, setUnavailable] = useState(100000)
    const [sponsorship, setSponsorship] = useState(0)
    const [available, setAvailable] = useState(200000)
    return (
        <>
        <div className='w-screen h-screen'>
        <Canvas
            shadows
            camera={{
                position: [221, 228, -580],
                fov: 29
            }}
        >
            <color attach="background" args={["#2A2A2A"]} />
            <ambientLight intensity={0.1} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
            <Environment preset="forest" background={false} blur={1} />
            <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 100 }}
            rotation={[0, 0, 0]}
            polar={[-0.5, 0.1]} 
            azimuth={[-0.5, 0.7]}>
        
            {selected === 'Finca Eduardo' ?
            <FincaEduardo/>
            :
            <LaGamba />
            }
            </PresentationControls>
            {/*<OrbitControls />*/}
        </Canvas>
        </div>
        {/*
        <div className='absolute left-0 bottom-0 w-full bg-greenLime z-10 py-2.5 px-5 flex justify-end'>
            <div>
                <input
                    type="number"
                    id="numberInput"
                    step="240000"
                    value={inputValue}
                    onChange={handleChange} // Update the value when the input changes
                    className="px-2 py-1 rounded-full text-center mx-3"
                />
                <Button onClick={() => setIsCartOpen(true)} text='Return to Map'/>
            </div>
        </div> */}
        <div className='fixed right-[2vw] top-0'>
        {selected === 'Finca Eduardo' ?
            <PieChart unavailable={400000} sponsorship={sponsorship} available={3000000} />
            :
            <PieChart unavailable={100000} sponsorship={sponsorship} available={800000} />
        }
            
        </div>
        </>
    )
}



function Marker({ children, ...props }) {
    const ref = useRef()
    // This holds the local occluded state
    const [isOccluded, setOccluded] = useState(false)
    const [isInRange, setInRange] = useState(true)
    const isVisible = isInRange && !isOccluded

    // Test distance
    const vec = new THREE.Vector3()
    /*
    useFrame((state) => {
        const range = state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <= 10
        if (range !== isInRange) setInRange(range)
    })
    */
    return (
        <group ref={ref}>
        <Html
            // 3D-transform contents
            transform
            // Hide contents "behind" other meshes
            // Tells us when contents are occluded (or not)
            onOcclude={setOccluded}
            // We just interpolate the visible state into css opacity and transforms
            style={{ transition: 'all 0.2s', opacity: isVisible ? 1 : 0, transform: `scale(${isVisible ? 1 : 0.25})` }}
            {...props}>
            {children}
        </Html>
        </group>
    )
}

function formatNumber(number) {
  // Use the Intl.NumberFormat object with 'en-US' locale for standard comma separation
    return new Intl.NumberFormat('en-US').format(number);
}

function LaGamba() {
    const ref = useRef();
    const { nodes, materials } = useGLTF('/webgl/glb/gamba-split.glb');
    const fontProps = { fontSize: 7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    console.log(nodes)
    console.log(materials)
    return (
        <>
        <group ref={ref}>
        <mesh receiveShadow castShadow geometry={nodes["1001"].geometry} material={new THREE.MeshStandardMaterial({color: '#00FFDD'})} scale={350} rotation={[0,0,0]} position={[-50, -250, 0]}/>    
        <mesh receiveShadow castShadow geometry={nodes["1002"].geometry} material={materials["Material.002"]} scale={350} rotation={[0,0,0]} position={[-50, -250, 0]}/>        
        <Billboard position={[-100, -10, -70]}>
                <Marker>
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw] w-[35%]`}>
                    <div>Not Available</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        100,000
                    </div>
                    </div>
                </div>
                </Marker>
            </Billboard>
            <Billboard position={[-130, 0, 10]}>
                <Marker>
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw] w-[35%]`}>
                    <div>Available</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        800,000
                    </div>
                    </div>
                </div>
                </Marker>
            </Billboard>
        </group>
        </>
    )
}

function FincaEduardo() {
    const ref = useRef();
    const { nodes, materials } = useGLTF('/webgl/glb/eduardo-split.glb');
    const fontProps = { fontSize: 7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    return (
        <>
        <group ref={ref}>
        <mesh receiveShadow castShadow geometry={nodes["1"].geometry} material={new THREE.MeshStandardMaterial({color: '#00FFDD'})} scale={150} rotation={[-0.05,0,0]} position={[-190, -30, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes["1001"].geometry} material={materials["Material.002"]} scale={150} rotation={[-0.05,0,0]} position={[-190, -30, 0]}/>                
        <Billboard position={[-100, -25, -100]}>
                <Marker>
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw] w-[35%]`}>
                    <div>Not Available</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        100,000
                    </div>
                    </div>
                </div>
                </Marker>
            </Billboard>
            <Billboard position={[-180, 0, 10]}>
                <Marker>
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw] w-[35%]`}>
                    <div>Available</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        800,000
                    </div>
                    </div>
                </div>
                </Marker>
            </Billboard>
        </group>
        </>
    )
}