import * as THREE from 'three'
import { stalls } from '../data/stalls'

const STAR_POSITIONS = new Float32Array(1800)
for (let i = 0; i < 600; i++) {
  const radius = 20 + Math.random() * 30
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  STAR_POSITIONS[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
  STAR_POSITIONS[i * 3 + 1] = Math.abs(radius * Math.cos(phi))
  STAR_POSITIONS[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
}

function Stars() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[STAR_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  )
}

const ASPHALT_HEIGHT = new Float32Array(512 * 512)
for (let i = 0; i < 512 * 512; i++) {
  const noise = (Math.random() * 2 - 1) * 0.15
  ASPHALT_HEIGHT[i] = Math.max(0, noise)
}

const ASPHALT_TEXTURE = (() => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const imgData = ctx.createImageData(size, size)
  const d = imgData.data

  for (let i = 0; i < size * size; i++) {
    const h = ASPHALT_HEIGHT[i]
    const base = 50 + h * 40
    let v = base

    const speckle = Math.random() * 20
    v += speckle

    const pi = i * 4
    d[pi] = Math.min(255, Math.max(0, v + 5 + (Math.random() * 2 - 1) * 8))
    d[pi + 1] = Math.min(255, Math.max(0, v + (Math.random() * 2 - 1) * 8))
    d[pi + 2] = Math.min(255, Math.max(0, v - 2 + (Math.random() * 2 - 1) * 8))
    d[pi + 3] = 255
  }

  for (let i = 0; i < 15; i++) {
    const cx = Math.random() * size
    const cy = Math.random() * size
    const angle = Math.random() * Math.PI
    const len = 20 + Math.random() * 60
    for (let t = 0; t < len; t++) {
      const px = Math.floor(cx + Math.cos(angle) * t)
      const py = Math.floor(cy + Math.sin(angle) * t)
      if (px < 0 || px >= size || py < 0 || py >= size) continue
      const pi = (py * size + px) * 4
      const darken = Math.random() * 15
      d[pi] = Math.max(0, d[pi] - darken)
      d[pi + 1] = Math.max(0, d[pi + 1] - darken)
      d[pi + 2] = Math.max(0, d[pi + 2] - darken)
    }
  }

  ctx.putImageData(imgData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  texture.anisotropy = 4
  return texture
})()

const ASPHALT_NORMAL = (() => {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const imgData = ctx.createImageData(size, size)
  const d = imgData.data

  const strength = 0.5
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = y * size + x
      const h = ASPHALT_HEIGHT[idx]

      const hL = x > 0 ? ASPHALT_HEIGHT[y * size + (x - 1)] : h
      const hR = x < size - 1 ? ASPHALT_HEIGHT[y * size + (x + 1)] : h
      const hD = y > 0 ? ASPHALT_HEIGHT[(y - 1) * size + x] : h
      const hU = y < size - 1 ? ASPHALT_HEIGHT[(y + 1) * size + x] : h

      let nx = (hL - hR) * strength
      let ny = (hD - hU) * strength
      let nz = 1

      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      if (len > 0) {
        nx /= len
        ny /= len
        nz /= len
      }

      const pi = idx * 4
      d[pi] = Math.round((nx * 0.5 + 0.5) * 255)
      d[pi + 1] = Math.round((ny * 0.5 + 0.5) * 255)
      d[pi + 2] = Math.round((nz * 0.5 + 0.5) * 255)
      d[pi + 3] = 255
    }
  }

  ctx.putImageData(imgData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
})()

export function Lighting() {
  return (
    <>
      <color args={['#2a1a3e']} attach="background" />
      <ambientLight intensity={0.7} color="#c09060" />
      <hemisphereLight args={['#3a2a5e', '#5a3a2a', 1.2]} />

      <Stars />

      {stalls.map((s) => (
        <pointLight
          key={s.projectId}
          position={[s.position[0], 2.2, s.position[2]]}
          color={s.neonColor}
          intensity={1.2}
          distance={3.5}
          decay={2}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial
          map={ASPHALT_TEXTURE}
          normalMap={ASPHALT_NORMAL}
          normalScale={[0.8, 0.8]}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </>
  )
}
