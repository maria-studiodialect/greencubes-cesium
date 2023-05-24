import * as THREE from "three"

const USE_FULLSCREEN = false
const MAX_FRAME_BUFFER_SIZE = new THREE.Vector2(1280, 720)
const BASE_SIZE = Math.sqrt(MAX_FRAME_BUFFER_SIZE.x * MAX_FRAME_BUFFER_SIZE.y)
const MAX_SIZE = BASE_SIZE * BASE_SIZE

export const calculateRendererSize = (windowWidth, windowHeight) => {
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
