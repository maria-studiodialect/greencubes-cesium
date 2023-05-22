import dynamic from "next/dynamic"
import { useState } from "react"

// because dat.gui has dependencies to "window" we need to load that module on the client only.
const WebGL = dynamic(() => import("../components/webgl"), { ssr: false })

export default function Demo() {
  const [show, setShow] = useState(false)
  return <WebGL />
}
