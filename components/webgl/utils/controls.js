export class Controls {
  constructor(domElement, onHandleUp) {
    this.domElement = domElement
    this.onHandleUp = onHandleUp

    this.enabled = false
    this.factoryEase = 5 // keep it so it can be called from outside to restore `this.ease`
    this.ease = 5
    this.hasTransition = false

    // x/y can be negative
    // mx/my moduled x/y are always between 0-360
    // px/py page x/y are the remainded of the x/y
    this.position = { x: 0, y: 0, mx: 0, my: 0, px: 0, py: 0 }
    this.rotation = { x: 0, y: 0 }

    this.mouse = {
      isDown: false,
      down: { x: 0, y: 0 },
      move: { x: 0, y: 0 },
    }
  }

  enable() {
    this.enabled = true

    if ("ontouchstart" in global.window) {
      this.domElement.addEventListener("touchstart", this.down)
      global.addEventListener("touchmove", this.move)
      global.addEventListener("touchend", this.up)
      global.addEventListener("scroll", this.scroll)
    } else {
      this.domElement.addEventListener("mousedown", this.down)
      global.addEventListener("mousemove", this.move)
      global.addEventListener("mouseup", this.up)
    }
  }

  disable() {
    this.enabled = false

    // mouse
    if ("ontouchstart" in global.window) {
      this.domElement.removeEventListener("touchstart", this.down)
      global.removeEventListener("touchmove", this.move)
      global.removeEventListener("touchend", this.up)
      global.removeEventListener("scroll", this.scroll)
    } else {
      this.domElement.removeEventListener("mousedown", this.down)
      global.removeEventListener("mousemove", this.move)
      global.removeEventListener("mouseup", this.up)
    }
  }

  scroll = (e) => {
    e.preventDefault()
  }

  down = (e) => {
    if (this.hasTransition) {
      return
    }

    const event = e.changedTouches ? e.changedTouches[0] : e
    const x = event.clientX
    // const y = event.clientY

    this.mouse.isDown = true
    this.mouse.down.x = x
    // this.mouse.down.y = y
    this.mouse.move.x = x
    // this.mouse.move.y = y
  }

  move = (e) => {
    if (this.hasTransition) {
      return
    }

    if (this.mouse.isDown) {
      const event = e.changedTouches ? e.changedTouches[0] : e
      const x = event.clientX
      // const y = event.clientY

      this.mouse.move.x = x
      // this.mouse.move.y = y
    }
  }

  up = () => {
    this.mouse.isDown = false
    this.onHandleUp()
  }

  getDistance() {
    let d = {
      x: 0,
      y: 0,
    }

    if (this.mouse.isDown) {
      d = {
        x: this.mouse.down.x - this.mouse.move.x,
        y: this.mouse.down.y - this.mouse.move.y,
      }
    }

    this.mouse.down.x = this.mouse.move.x
    this.mouse.down.y = this.mouse.move.y

    return d
  }

  update() {
    const d = this.getDistance()
    this.position.x -= d.x
    this.position.y -= d.y

    this.rotation.x += (this.position.x - this.rotation.x) / this.ease
    this.rotation.y += (this.position.y - this.rotation.y) / this.ease
  }
}
