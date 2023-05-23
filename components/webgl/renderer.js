import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js"

const USE_FULLSCREEN = false
const MAX_FRAME_BUFFER_SIZE = new THREE.Vector2(1280, 720)
const BASE_SIZE = Math.sqrt(MAX_FRAME_BUFFER_SIZE.x * MAX_FRAME_BUFFER_SIZE.y)
const MAX_SIZE = BASE_SIZE * BASE_SIZE

function calculateRendererSize(windowWidth, windowHeight) {
  let width = windowWidth
  let height = windowHeight
  if (USE_FULLSCREEN) {
    return {
      width,
      height,
    }
  }

  if (windowWidth * windowHeight > MAX_SIZE) {
    const ratio = height / width
    width = BASE_SIZE
    height = Math.floor(BASE_SIZE * ratio)
    const newSize = width * height
    const scalar = Math.sqrt(MAX_SIZE / newSize)
    width = Math.floor(width * scalar)
    height = Math.floor(height * scalar)
  }
  return {
    width,
    height,
  }
}

// README: Performance on mac's isn't great. setting to true will do:
// - uses perspective camera
// - forces devicePixelRatio to 1
// - uses EffectComposer
const POST_PROCESSING = false

export class Renderer {
  constructor({ canvas }) {
    this.scenes = []

    if (canvas) {
      this.setup(canvas)
      this.resize()
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
    this.renderer.setClearColor(0xeeeeee, 1)
    this.renderer.useLegacyLights = true
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.renderer.setPixelRatio(
      Math.min(global.devicePixelRatio, POST_PROCESSING ? 1 : 2)
    )
    this.renderer.toneMapping = THREE.ReinhardToneMapping

    this.scene = new THREE.Scene()

    if (POST_PROCESSING) {
      this.camera = new THREE.PerspectiveCamera(
        25,
        renderSize.width / renderSize.height,
        1,
        100
      )
    } else {
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000)
    }

    this.camera.position.set(8, 12, 16)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    if (POST_PROCESSING) {
      this.composer = new EffectComposer(this.renderer)
      this.ssrPass = new SSRPass({
        renderer: this.renderer,
        scene: this.scene,
        camera: this.camera,
      })

      this.composer.addPass(this.ssrPass)
    }
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

      if (POST_PROCESSING) {
        this.camera.aspect = aspect
      } else {
        const frustrumSize = 10
        this.camera.left = (frustrumSize * aspect) / -2
        this.camera.right = (frustrumSize * aspect) / 2
        this.camera.top = frustrumSize / 2
        this.camera.bottom = frustrumSize / -2
      }

      this.camera.updateProjectionMatrix()

      if (POST_PROCESSING) {
        this.composer.setSize(renderSize.width, renderSize.height)
      }
    }
  }

  update = (delta) => {
    this.controls.update()
    for (let i = 0; i < this.scenes.length; i += 1) {
      this.scenes[i].update(delta)
    }

    if (this.renderer && this.scene && this.camera) {
      if (POST_PROCESSING) {
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
