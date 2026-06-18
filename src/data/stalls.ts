export const NEON_COLORS = ['#ff2d87', '#b026ff', '#ff6a00', '#39ff14', '#00f0ff']

export interface StallItem {
  type: 'frame' | 'box' | 'plushie' | 'server' | 'cloud' | 'terminal' | 'crow'
  color?: string
  imageUrl?: string
}

export interface StallConfig {
  position: [number, number, number]
  rotation: number
  neonColor: string
  projectId: number
}

const RADIUS = 2.2

export const stalls: StallConfig[] = Array.from({ length: 5 }, (_, i) => {
  const angle = (i / 5) * Math.PI * 2
  return {
    position: [Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS] as [number, number, number],
    rotation: Math.PI / 2 - angle,
    neonColor: NEON_COLORS[4 - i],
    projectId: 5 - i,
  }
})
