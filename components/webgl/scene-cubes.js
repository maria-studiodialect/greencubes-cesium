import * as THREE from "three"

import { settings } from "./settings"
import { TweenMax } from "gsap/gsap-core"
import { Verde } from "./materials/verde"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

export class Scene {
  constructor(canvas) {
    this.container = new THREE.Object3D()

    // reusable variables
    this.matrix = new THREE.Matrix4()
    this.color = new THREE.Color()

    this.time = 0
    this.init()
  }

  async init() {
    const loader = new GLTFLoader()

    // load test
    const { scene: test } = await loader.loadAsync("/webgl/glb/ob1.glb")
    this.testGeometry = test.children[0].geometry

    // load cube
    const { scene: cube } = await loader.loadAsync("/webgl/glb/cube1.glb")
    this.cubeGeometry = cube.children[0].geometry

    // load special shape
    const { scene: stack } = await loader.loadAsync("/webgl/glb/cubestack.glb")
    this.stackGeometry = stack.children[0].geometry

    this.addCubes()
  }

  addGui(gui) {
    this.gui = gui

    this.gui
      .add(settings.cubes, "total", 1, 80)
      .step(1)
      .onChange(this.updateGui)
  }

  updateGui = () => {
    this.removeCubes()
    this.addCubes()
  }

  addCubes() {
    // const material = new THREE.MeshLambertMaterial()
    const material = Verde()

    // add mesh
    this.count = settings.cubes.total * settings.cubes.total

    this.random = new Float32Array(this.count)

    this.instanced = new THREE.InstancedMesh(
      this.cubeGeometry,
      material,
      this.count
    )
    // this.instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    // this.instanced.castShadow = true
    // this.instanced.receiveShadow = true
    // this.instanced.frustumCulled = false
    this.container.add(this.instanced)

    this.animate()
  }

  removeCubes() {
    while (this.container.children.length) {
      this.container.remove(this.container.children[0])
    }
  }

  animate() {
    // for (let i = 0; i < this.cubes.length; i++) {
    //   TweenMax.to(this.cubes[i].position, 1, {
    //     y: 0,
    //     delay: Math.random(),
    //   })
    // }

    let index = 0

    const size = 2
    const offset = settings.cubes.total * size * 0.5 - size * 0.5

    for (let i = 0; i < settings.cubes.total; i++) {
      for (let j = 0; j < settings.cubes.total; j++) {
        this.random[index] = Math.random()
        const x = /* i - settings.cubes.total / 2 */ offset - i * size
        const y = Math.random()
        const z = /* j - settings.cubes.total / 2 */ offset - j * size
        this.matrix.setPosition(x, y, z)
        this.instanced.setMatrixAt(index++, this.matrix)
      }
    }

    this.instanced.instanceMatrix.needsUpdate = true
    this.instanced.geometry.setAttribute(
      "aRandom",
      new THREE.InstancedBufferAttribute(this.random, 1)
    )
  }

  destroy() {
    this.removeCubes()
  }

  resize(/* width, height */) {}

  update(/* delta */) {
    if (this.instanced) {
      this.time += 0.01
      this.instanced.material.uniforms.time.value = this.time
    }
  }
}
