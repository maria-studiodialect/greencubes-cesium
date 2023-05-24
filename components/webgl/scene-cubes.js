import * as THREE from "three"

import { settings } from "./settings"
import { Verde } from "./materials/verde"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

export class Scene {
  constructor(canvas) {
    this.container = new THREE.Object3D()

    // reusable variables
    this.matrix = new THREE.Matrix4()
    this.color = new THREE.Color()
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d", { willReadFrequently: true })

    this.time = 0

    this.origin = 0
    this.init()
  }

  async init() {
    const loader = new GLTFLoader()

    // load cube
    const { scene: cube } = await loader.loadAsync("/webgl/glb/cube1.glb")
    this.cubeGeometry = cube.children[0].geometry

    // load special shape
    const { scene: stack } = await loader.loadAsync("/webgl/glb/cubestack1.glb")
    this.stackGeometry = stack.children[0].geometry
    this.stackGeometry.rotateY(Math.PI)

    const tloader = new THREE.TextureLoader()
    this.noise = await tloader.loadAsync(settings.cubes.noise)

    this.canvas.width = settings.cubes.total
    this.canvas.height = settings.cubes.total
    this.context.drawImage(
      this.noise.image,
      0,
      0,
      this.noise.image.width,
      this.noise.image.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )

    this.addCubes()
  }

  addGui(gui) {
    const cubes = gui.addFolder("Cubes")
    cubes.open()

    cubes.add(settings.cubes, "total", 1, 100).step(1).onChange(this.updateGui)
    cubes
      .add(settings.cubes, "startX", 0, 100 - 1)
      .step(1)
      .onChange(this.updateGui)
    cubes
      .add(settings.cubes, "startZ", 0, 100 - 1)
      .step(1)
      .onChange(this.updateGui)

    cubes.addImage(settings.cubes, "matcap").onChange((image, firstTime) => {
      if (!firstTime) {
        const texture = new THREE.Texture(image)
        texture.needsUpdate = true
        this.instanced.material.uniforms.uMatcap.value = texture
      }
    })

    cubes.addImage(settings.cubes, "noise").onChange((image, firstTime) => {
      if (!firstTime) {
        this.canvas.width = settings.cubes.total
        this.canvas.height = settings.cubes.total

        this.context.clearRect(
          0,
          0,
          this.context.canvas.width,
          this.context.canvas.height
        )

        this.context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          this.context.canvas.width,
          this.context.canvas.height
        )

        let index = 0
        for (let i = 0; i < settings.cubes.total; i++) {
          for (let j = 0; j < settings.cubes.total; j++) {
            this.random[index] =
              this.context.getImageData(i, j, 1, 1).data[0] / 255
            index++
          }
        }
        this.instanced.geometry.getAttribute("aRandom").needsUpdate = true
      }
    })

    cubes
      .add(settings.cubes, "multiplier", -20, 20)
      .step(1)
      .onChange(this.updateGui)
  }

  updateGui = () => {
    this.removeCubes()
    this.addCubes()
  }

  addCubes() {
    // add mesh
    this.count = settings.cubes.total * settings.cubes.total

    this.random = new Float32Array(this.count)

    this.instanced = new THREE.InstancedMesh(
      this.cubeGeometry,
      Verde(),
      this.count
    )
    this.instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.container.add(this.instanced)

    this.stack = new THREE.InstancedMesh(this.stackGeometry, Verde(), 1)
    this.container.add(this.stack)

    this.animate()
  }

  removeCubes() {
    while (this.container.children.length) {
      this.container.remove(this.container.children[0])
    }
  }

  animate() {
    let index = 0

    const size = 2
    const offset = settings.cubes.total * size * 0.5 - size * 0.5

    for (let i = 0; i < settings.cubes.total; i++) {
      for (let j = 0; j < settings.cubes.total; j++) {
        this.random[index] = this.context.getImageData(i, j, 1, 1).data[0] / 255

        const x = i * size - offset
        const y = -size
        const z = j * size - offset
        this.matrix.setPosition(x, y, z)

        // send to the bottom if intersects with the stack
        // if (
        //   i >= settings.cubes.startX &&
        //   i < settings.cubes.startX + 1 &&
        //   j >= settings.cubes.startZ &&
        //   j < settings.cubes.startZ + 5
        // ) {
        //   this.matrix.setPosition(x, -2000, z)
        // }
        this.instanced.setMatrixAt(index++, this.matrix)
      }
    }

    this.instanced.instanceMatrix.needsUpdate = true
    this.instanced.geometry.setAttribute(
      "aRandom",
      new THREE.InstancedBufferAttribute(this.random, 1)
    )

    // update stack
    this.matrix.setPosition(
      settings.cubes.startX * size - offset,
      0,
      settings.cubes.startZ * size - offset + size * 2
    )
    this.stack.instanceMatrix.needsUpdate = true
    this.stack.setMatrixAt(0, this.matrix)
  }

  destroy() {
    this.removeCubes()
  }

  resize(/* width, height */) {}

  update(/* delta */) {
    if (this.instanced) {
      this.time += 0.05
      this.instanced.material.uniforms.time.value = this.time
      this.instanced.material.uniforms.multiplier.value =
        settings.cubes.multiplier

      const extra = settings.cubes.multiplier > 0 ? 0 : 4
      this.origin =
        (this.context.getImageData(
          settings.cubes.startX,
          settings.cubes.startZ + extra,
          1,
          1
        ).data[0] /
          255) *
        settings.cubes.multiplier
      this.stack.material.uniforms.uOffset.value = this.origin
    }
  }
}
