import * as THREE from "three"

import { Controls } from "./utils/controls"
import { settings } from "./settings"
import { TweenMax } from "gsap/gsap-core"
import { closestAngle, map } from "./utils/math"
import { Verde } from "./materials/verde"

export class Scene {
  constructor(canvas) {
    this.container = new THREE.Object3D()

    this.controls = new Controls(canvas, () => {
      const nextX = closestAngle(this.controls.position.x, 90)
      this.resetPosition(nextX, 0)
    })
    this.controls.enable()

    this.cubes = []
    this.addCubes()
  }

  addGui(gui) {
    this.gui = gui

    this.gui
      .add(settings.cubes, "total", 3, 50)
      .step(1)
      .onChange(this.updateGui)
    this.gui.add(settings.cubes, "size", 1, 50).step(1).onChange(this.updateGui)

    // const scene = this.gui.addFolder("Fog")
    // scene.addColor(settings.fog, "color").onChange(this.updateGui)
    // scene.add(settings.fog, "near", 0, 1000).onChange(this.updateGui)
    // scene.add(settings.fog, "far", 0, 1000).onChange(this.updateGui)
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

    this.cubes = []

    for (let x = 0; x < total; x++) {
      for (let z = 0; z < total; z++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(size, size, size),
          new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() })
          // Verde({ outline: 0x00ffff, opacity: 0 })
        )
        cube.position.x = x * size - half
        cube.position.y = 100
        cube.position.z = z * size - half
        this.container.add(cube)
        this.cubes.push(cube)
      }
    }

    if (settings.debug) {
      // axes
      const axesHelper = new THREE.AxesHelper(100)
      this.container.add(axesHelper)

      // floor
      const wireframe = new THREE.Mesh(
        new THREE.PlaneGeometry(
          total * size * 2,
          total * size * 2,
          total * 2,
          total * 2
        ),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      )
      wireframe.rotation.x = -Math.PI / 2
      this.container.add(wireframe)
    }

    this.animate()
  }

  removeCubes() {
    while (this.container.children.length) {
      this.container.remove(this.container.children[0])
    }
  }

  resetPosition(x, y) {
    const dx = Math.abs(this.controls.position.x - x)
    const dy = Math.abs(this.controls.position.y - y)
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance === 0) {
      return
    }
    const d = map(distance, 0, 90, 0.5, 1)
    // change the ease before applying the tween
    this.controls.ease = 1
    this.controls.hasTransition = true
    // handle transition on X/Y axis
    TweenMax.to(this.controls.position, d, {
      x,
      y,
      ease: "power2.inOut",
      onComplete: () => {
        this.controls.hasTransition = false
      },
    })
  }

  animate() {
    for (let i = 0; i < this.cubes.length; i++) {
      TweenMax.to(this.cubes[i].position, 1, {
        y: 0,
        delay: Math.random(),
      })
    }
  }

  destroy() {
    this.controls.disable()

    this.removeCubes()
  }

  resize(/* width, height */) {}

  update(/* delta */) {
    this.controls.update()

    this.container.rotation.x = this.controls.rotation.y * (Math.PI / 180)
    this.container.rotation.y = this.controls.rotation.x * (Math.PI / 180)

    // makes it rotate
    if (settings.autoRotate && !this.controls.mouse.isDown) {
      this.rotation += 0.005
    } else {
      this.rotation = 0
    }
    this.container.rotation.y += this.rotation
  }
}
