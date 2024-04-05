import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, GradientTexture, Box, Billboard, Text, MeshTransmissionMaterial, ContactShadows, Environment, OrbitControls, PresentationControls, Html, Decal, RenderTexture, PerspectiveCamera} from '@react-three/drei'
import SponsorCalculator from './SponsorCalculator';
import Cart from './Cart';
import Button from './Button'
import PieChart from './PieChart';

export default function WebGL({calculatorOpen, onCalculatorClose, user, userData}) {

        // Initialize the state with the default input value
        const [inputValue, setInputValue] = useState(userData.sponsored_cubes);
        const [isCalculatorOpen, setIsCalculatorOpen] = useState(calculatorOpen);
        const [isCartOpen, setIsCartOpen] = useState(false);
        const [total, setTotal] = useState(3200000)
        const [unavailable, setUnavailable] = useState(800000)
        const [sponsorship, setSponsorship] = useState(inputValue)
        const [available, setAvailable] = useState((total - unavailable) - sponsorship)
    
        useEffect(() => {
            // This effect will run whenever inputValue changes
            setSponsorship(inputValue);
    
            // Update available state based on the new inputValue
            setAvailable((total - unavailable) - inputValue);


        }, [inputValue, total, unavailable]);

        useEffect(() => {
            console.log(calculatorOpen)
            setIsCalculatorOpen(calculatorOpen);
        }, [calculatorOpen]);

    
        // Handle change event to update the state
        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

        const updateInput = (newInput) => {
            setInputValue(Number(inputValue) + Number(newInput));
        }

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
            <Model sponsorship={inputValue} unavailable={unavailable} available={available} total={total}/>
            </PresentationControls>
            {/*<OrbitControls />*/}
        </Canvas>
        </div>
        {isCalculatorOpen &&
            <SponsorCalculator inputValue={inputValue} handleChange={updateInput} handleClose={() => {setIsCalculatorOpen(false); onCalculatorClose()}}/>
        }
        {isCartOpen &&
            <Cart inputValue={inputValue} handleClose={() => setIsCartOpen(false)} user={user} userData={userData} />
        }
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
                <Button onClick={() => setIsCartOpen(true)} text='Add to Cart'/>
            </div>
        </div>
        <div className='fixed right-[2vw] top-0'>
        <PieChart unavailable={unavailable} sponsorship={inputValue} available={available} />
        </div>
        </>
    )
}


function Marker({ position, content, rotation, flex, textStyles, number }) {
    return (
        <Html distanceFactor={25} position={position}>
            <div className={`content flex ${flex}`}>
                <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg" className={rotation}>
                <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                </svg>

            <div className={`mx-[10vw] ${textStyles}`}>
                <div>{content}</div>
                <div className='flex'>
                <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                {number}
                </div>
            </div>
            </div>
        </Html>
    );
}
// Let's make the marker into a component so that we can abstract some shared logic
function Marker2({ children, ...props }) {
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

function Model({sponsorship, available, unavailable, total}) {


    const ref = useRef();
    const { nodes, materials } = useGLTF('/webgl/glb/Finca-Split-Materials.glb');
    const fontProps = { fontSize: 7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    return (
        <>
        <group ref={ref}>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0.geometry} material={materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0002.geometry} material={materials["Material.002"]} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0003.geometry} material={materials["Material.002"]} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0004.geometry} material={sponsorship >= 240000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0005.geometry} material={sponsorship >= 480000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0006.geometry} material={sponsorship >= 720000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0007.geometry} material={sponsorship >= 960000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0008.geometry} material={sponsorship >= 1200000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0009.geometry} material={sponsorship >= 1440000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0010.geometry} material={sponsorship >= 1680000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0011.geometry} material={sponsorship >= 1920000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0012.geometry} material={sponsorship >= 2160000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
        <mesh receiveShadow castShadow geometry={nodes.Mesh_0013.geometry} material={sponsorship >= 2400000 ? materials["Material.001"] : materials.Material_0} scale={0.5} position={[0, 10, 0]}/>
            <Billboard position={[-40, 40, 150]}>
                <Marker2>
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw] w-[35%]`}>
                    <div>Not Available</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        800,000
                    </div>
                    </div>
                </div>
                </Marker2>
            </Billboard>
            {sponsorship > 0 &&
            <Billboard position={sponsorship >= 960000 ? [-40, 30, -50] : [-40, 30, 0]}>
                <Marker2 >
                <div className={`content flex`}>
                    <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                    </svg>

                    <div className={`mx-[10vw]  w-[45%]`}>
                    <div>Current Sponsorship</div>
                    <div className='flex'>
                        <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                        {formatNumber(sponsorship)}
                    </div>
                    </div>
                </div>
                </Marker2>
            </Billboard>
            }
        {available > 0 &&
        <Billboard position={sponsorship >= 1200000 ? [-10, 10, -195] : [-50, 10, -105]}>
            <Marker2 >
            <div className={`content flex`}>
                <svg width="4521" height="1148" viewBox="0 0 4521 1148" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4520 3C4350.26 27.9617 2631.26 13.4007 1792.98 3L2 1145" stroke="white" stroke-width="20"/>
                </svg>

                <div className={`mx-[10vw]`}>
                <div>Available</div>
                <div className='flex'>
                    <img src='/img/greencube-minilogo.svg' className='w-[15vw] mr-[5vw]' />
                    {formatNumber(available)}
                </div>
                </div>
            </div>
            </Marker2>
        </Billboard>
        }
        
        </group>
        </>
    )
}