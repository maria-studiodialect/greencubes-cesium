/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from "react"
import dat from "dat.gui"
import datGuiImage from "dat.gui.image"

import { Renderer } from "./renderer"
import { Scene } from "./scene-cubes"
import { useRouter } from "next/router"

datGuiImage(dat)

const WebGL = () => {
  const router = useRouter()
  const canvas = useRef()

  useEffect(() => {
    const debug = router.query.debug !== undefined
    canvas.current.style.position = "fixed"
    canvas.current.style.top = "0px"
    canvas.current.style.left = "0px"

    const gui = new dat.GUI({ autoPlace: false })
    gui.domElement.style.position = "fixed"
    gui.domElement.style.top = "0px"
    gui.domElement.style.right = "0px"
    if (debug) document.body.appendChild(gui.domElement)

    // add RENDERER
    const renderer = new Renderer({ canvas: canvas.current })
    renderer.toggleDebug(debug)
    renderer.addGui(gui)

    // add SCENE
    const scene = new Scene(canvas.current)
    scene.addGui(gui)

    // scene.addNoise(noise);
    // scene.addMatcap(matcap)

    renderer.addScene(scene)

    return () => {
      document.body.removeChild(gui.domElement)

      scene.destroy()

      renderer.removeScene(scene)
      renderer.destroy()
    }
  }, [])

  return <canvas ref={canvas} />
}

export default WebGL
