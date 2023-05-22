/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { useEffect, useRef } from "react"
import * as dat from "dat.gui"

import { Renderer } from "./renderer"
import { Scene } from "./scene-cubes"

const WebGL = () => {
  const canvas = useRef()

  useEffect(() => {
    canvas.current.style.position = "fixed"
    canvas.current.style.top = "0px"
    canvas.current.style.left = "0px"

    const gui = new dat.GUI({ autoPlace: false })
    gui.domElement.style.position = "fixed"
    gui.domElement.style.top = "0px"
    gui.domElement.style.right = "0px"
    document.body.appendChild(gui.domElement) // TODO: disable this to hide dat.gui

    // add RENDERER
    const renderer = new Renderer({ canvas: canvas.current })

    // add SCENE
    const scene = new Scene(canvas.current)
    scene.addGui(gui)

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
