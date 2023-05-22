import * as THREE from "three"

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

export class Renderer {
  constructor({ canvas }) {
    this.settings = {
      camera: {
        fov: 45,
        near: 1,
        far: 1000,
        x: 100,
        y: 100,
        z: 100,
      },
    }

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

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(Math.min(2, global.devicePixelRatio))
    this.renderer.toneMapping = THREE.ReinhardToneMapping

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      this.settings.camera.fov,
      1,
      this.settings.camera.near,
      this.settings.camera.far
    )
    this.camera.position.set(
      this.settings.camera.x,
      this.settings.camera.y,
      this.settings.camera.z
    )
    this.camera.lookAt(this.scene.position)
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

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    }
  }

  update = (delta) => {
    for (let i = 0; i < this.scenes.length; i += 1) {
      this.scenes[i].update(delta)
    }

    if (this.renderer && this.scene && this.camera)
      this.renderer.render(this.scene, this.camera)

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
