import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js"
import { settings } from "./settings"

import { calculateRendererSize } from "./utils/gl"

const dummy = new THREE.Vector3()

export class Renderer {
  constructor({ canvas }) {
    this.scenes = []

    this.debug = true

    if (canvas) {
      this.setup(canvas)
      this.updateGui()
      this.update(0)
      window.addEventListener("resize", this.resize, false)
    }
  }

  destroy() {
    if (this.renderer) this.renderer.dispose()

    cancelAnimationFrame(this.raf)
    window.removeEventListener("resize", this.resize, false)
  }

  setup(canvas) {
    if (!canvas) return

    const width = window.innerWidth
    const height = window.innerHeight
    const renderSize = calculateRendererSize(width, height)

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.useLegacyLights = true
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ReinhardToneMapping

    this.scene = new THREE.Scene()

    if (settings.postprocessing.enabled) {
      this.camera = new THREE.PerspectiveCamera(
        25,
        renderSize.width / renderSize.height,
        1,
        500
      )
    } else {
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000)
    }

    this.camera.position.set(20, 20, 20)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.composer = new EffectComposer(this.renderer)

    this.axesHelper = new THREE.AxesHelper(100)
    this.scene.add(this.axesHelper)
  }

  addGui(gui) {
    const pp = gui.addFolder("Post Processing")
    pp.open()

    pp.add(settings.postprocessing, "enabled").onChange(this.updateGui)
    pp.add(settings.postprocessing, "pixelDensity", [1, 2]).onChange(
      this.updateGui
    )
  }

  updateGui = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const renderSize = calculateRendererSize(width, height)

    if (settings.postprocessing.enabled) {
      this.camera = new THREE.PerspectiveCamera(
        25,
        renderSize.width / renderSize.height,
        1,
        500
      )

      this.ssrPass = new SSRPass({
        renderer: this.renderer,
        scene: this.scene,
        camera: this.camera,
      })

      this.composer.addPass(this.ssrPass)
    } else {
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -120, 120)

      if (this.ssrPass) {
        this.composer.removePass(this.ssrPass)
        this.ssrPass.dispose()
        this.ssrPass = null
      }
    }

    this.camera.position.set(20, 20, 20)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    const pixelRatio = Math.min(
      global.devicePixelRatio,
      settings.postprocessing.pixelDensity
    )
    this.renderer.setPixelRatio(pixelRatio)
    this.composer.setPixelRatio(pixelRatio)

    this.resize()
  }

  toggleDebug(value) {
    this.axesHelper.visible = value
  }

  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const renderSize = calculateRendererSize(width, height)

    if (this.renderer && this.camera) {
      this.renderer.setSize(renderSize.width, renderSize.height)

      // Scale to window
      this.renderer.domElement.style.width = `${width}px`
      this.renderer.domElement.style.height = `${height}px`

      const aspect = renderSize.width / renderSize.height

      if (settings.postprocessing.enabled) {
        this.camera.aspect = aspect
      } else {
        const frustrumSize = 20
        this.camera.left = (frustrumSize * aspect) / -2
        this.camera.right = (frustrumSize * aspect) / 2
        this.camera.top = frustrumSize / 2
        this.camera.bottom = frustrumSize / -2
      }

      this.camera.updateProjectionMatrix()

      if (settings.postprocessing.enabled) {
        this.composer.setSize(renderSize.width, renderSize.height)
      }
    }
  }

  update = (delta) => {
    this.controls.update()

    for (let i = 0; i < this.scenes.length; i += 1) {
      this.scenes[i].update(delta)
    }

    // look at
    if (this.scenes[0] && this.scenes[0].origin) {
      dummy.y = this.scenes[0].origin
    }

    this.camera.lookAt(dummy)
    this.axesHelper.position.copy(dummy)

    if (this.renderer && this.scene && this.camera) {
      if (settings.postprocessing.enabled) {
        this.composer.render()
      } else {
        this.renderer.render(this.scene, this.camera)
      }
    }

    this.raf = requestAnimationFrame(this.update)
  }

  addScene(scene) {
    this.scenes.push(scene)
    this.scene?.add(scene.container)
  }

  removeScene(scene) {
    const index = this.scenes.indexOf(scene)
    if (index !== -1) {
      this.scenes.splice(index, 1)
      if (this.scene) this.scene.remove(scene.container)
    }
  }
}
