import Head from 'next/head'
import Header from '../components/Header'
import dynamic from 'next/dynamic'


const Cesium = dynamic(
  () => import('../components/Cesium'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Header/>
      <Cesium />
    </>
  )
}
