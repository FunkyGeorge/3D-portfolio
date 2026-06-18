import { useMemo } from 'react'
import * as THREE from 'three'

interface PhotoPlaneProps {
  imageUrl?: string
}

const PLACEHOLDER_TEXTURE = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 96
  const ctx = canvas.getContext('2d')!

  const grad = ctx.createLinearGradient(0, 0, 128, 96)
  grad.addColorStop(0, '#2a2a3e')
  grad.addColorStop(1, '#1a1a2e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 96)

  ctx.strokeStyle = '#555'
  ctx.lineWidth = 1.5
  ctx.strokeRect(24, 16, 80, 64)

  ctx.fillStyle = '#666'
  ctx.font = '10px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('image', 64, 52)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
})()

const TILT = -Math.PI / 18 // ~10° tilt forward

export function PhotoPlane({ imageUrl }: PhotoPlaneProps) {
  const imageTexture = useMemo(() => {
    if (!imageUrl) return PLACEHOLDER_TEXTURE
    const loader = new THREE.TextureLoader()
    const texture = loader.load(imageUrl)
    texture.needsUpdate = true
    return texture
  }, [imageUrl])

  return (
    <mesh rotation={[TILT, 0, 0]}>
      <planeGeometry args={[0.6, 0.45]} />
      <meshBasicMaterial map={imageTexture} />
    </mesh>
  )
}
