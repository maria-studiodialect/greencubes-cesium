import * as THREE from "three"

import { settings } from "./settings"
import { TweenMax } from "gsap/gsap-core"
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js"

export class Scene {
  constructor(canvas) {
    this.container = new THREE.Object3D()

    // reusable variables
    this.matrix = new THREE.Matrix4()
    this.color = new THREE.Color()

    this.addCubes()
  }

  addGui(gui) {
    this.gui = gui

    this.gui
      .add(settings.cubes, "total", 3, 80)
      .step(1)
      .onChange(this.updateGui)
    this.gui.add(settings.cubes, "size", 1, 50).step(1).onChange(this.updateGui)
    this.gui
      .add(settings.cubes, "roundness", 0, 1)
      .step(0.01)
      .onChange(this.updateGui)
  }

  updateGui = () => {
    // remove old cubes
    this.removeCubes()

    // add new cubes
    this.addCubes()

    // loop through scene and update material
    this.container.traverse((node) => {
      if (!node.isMesh) return

      // node.material.fogColor.value = new THREE.Color(settings.fog.color)
      // node.material.fogNear.value = settings.fog.near
      // node.material.fogFar.value = settings.fog.far
    })
  }

  addCubes() {
    const total = settings.cubes.total
    const size = settings.cubes.size
    const half = total * size * 0.5 - size * 0.5

    const geometry = new RoundedBoxGeometry(
      size,
      size,
      size,
      2,
      settings.cubes.roundness
    )

    const material = new THREE.MeshLambertMaterial()

    // add mesh
    this.mesh = new THREE.InstancedMesh(geometry, material, Math.pow(total, 2))
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    this.mesh.frustumCulled = false

    this.container.add(this.mesh)

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
  }

  destroy() {
    this.removeCubes()
  }

  resize(/* width, height */) {}

  update(/* delta */) {
    if (this.mesh) {
      const time = Date.now() * 0.001

      let i = 0
      const offset =
        settings.cubes.total * settings.cubes.size * 0.5 -
        settings.cubes.size * 0.5

      for (let x = 0; x < settings.cubes.total; x++) {
        for (let z = 0; z < settings.cubes.total; z++) {
          const nextX = offset - x * settings.cubes.size
          const nextZ = offset - z * settings.cubes.size
          this.matrix.setPosition(
            nextX,
            Math.sin(time * 0.05 * x + time * 0.05 * z),
            nextZ
          )

          this.mesh.setColorAt(
            i,
            this.color.setRGB(0, 0.1 + Math.random() * 0.9, 0)
          )

          this.mesh.setMatrixAt(i++, this.matrix)
        }
      }

      this.mesh.instanceMatrix.needsUpdate = true
      this.mesh.computeBoundingSphere()
    }
  }
}
