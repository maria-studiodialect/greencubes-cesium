import dynamic from "next/dynamic"
import { useRef } from "react"

// because dat.gui has dependencies to "window" we need to load that module on the client only.
const WebGL = dynamic(() => import("../components/webgl"), { ssr: false })

export default function Demo() {
  const container = useRef(null)
  const image = "/img/test.jpg"

  const handleHover = (cube) => {
    console.log("hover on cube", cube)
  }

  const handleOut = () => {
    console.log("out")
  }

  return (
    <div ref={container}>
      <WebGL map={image} onHover={handleHover} onOut={handleOut} />
    </div>
  )
}
