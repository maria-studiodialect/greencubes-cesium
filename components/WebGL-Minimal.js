import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, GradientTexture, Box, Billboard, Text, MeshTransmissionMaterial, ContactShadows, Environment, OrbitControls, PresentationControls, Html, Decal, RenderTexture, PerspectiveCamera} from '@react-three/drei'
import SponsorCalculator from './SponsorCalculator';
import Cart from './Cart';
import Button from './Button'

export default function WebGLMinimal({selected}) {
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
        </div>
        </>
    )
}




function LaGamba() {
    const ref = useRef();
    const { nodes, materials } = useGLTF('/webgl/glb/laGamba.glb');
    const fontProps = { fontSize: 7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    return (
        <>
        <group ref={ref}>
        <mesh receiveShadow castShadow geometry={nodes["1"].geometry} material={materials["Material.001"]} scale={350} rotation={[0,0,0]} position={[-100, -250, 0]}/>        
        </group>
        </>
    )
}

function FincaEduardo() {
    const ref = useRef();
    const { nodes, materials } = useGLTF('/webgl/glb/fincaEduardo.glb');
    const fontProps = { fontSize: 7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }

    return (
        <>
        <group ref={ref}>
        <mesh receiveShadow castShadow geometry={nodes["1"].geometry} material={materials["Material.001"]} scale={150} rotation={[-0.05,0,0]} position={[-190, 0, 0]}/>        
        </group>
        </>
    )
}