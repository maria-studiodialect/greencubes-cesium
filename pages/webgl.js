import Head from 'next/head'
import Header from '../components/Header'
import { Canvas } from "@react-three/fiber";

export default function WebGL() {
  return (
    <>
      <Header/>
      <Canvas
        shadows
        className='w-screen h-screen'
        camera={{
          position: [-6, 7, 7],
        }}
      >

      </Canvas>
    </>
  )
}
