import { useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import type { StallItem } from '../data/stalls'
import { PhotoPlane } from './PhotoPlane'
import { PlushieController } from './PlushieController'
import { ServerRack } from './ServerRack'
import { CloudPlushie } from './CloudPlushie'
import { RetroTerminal } from './RetroTerminal'
import { CrowPlushie } from './CrowPlushie'

interface MarketStallProps {
  position: [number, number, number]
  rotation: number
  neonColor: string
  projectId: number
  projectName: string
  items?: StallItem[]
  onClick: (projectId: number) => void
}

const WOOD = '#6b5b4e'
const DARK_WOOD = '#5a4a3e'
const WALL = '#4a3f35'
const CANOPY = '#c8b898'

const SHELF_TOP = 0.78 // counter top surface
const COUNTER_Z = 0.25 // center of shelf depth

function brighten(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const clamp = (v: number) => Math.min(255, Math.round(v + (255 - v) * amount))
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
}

export function MarketStall({ position, rotation, neonColor, projectId, projectName, items = [], onClick }: MarketStallProps) {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onClick(projectId)
  }

  const neonColorVal = hovered ? brighten(neonColor, 0.35) : brighten(neonColor, 0.1)

  const lanternColorVal = hovered ? brighten(neonColor, 0.35) : brighten(neonColor, 0.1)

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Base pallet */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[2.0, 0.08, 1.2]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.9} />
      </mesh>

      {/* Counter top */}
      <mesh position={[0, 0.75, 0.25]}>
        <boxGeometry args={[1.8, 0.06, 0.5]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>

      {/* Counter front panel */}
      <mesh position={[0, 0.45, 0.48]}>
        <boxGeometry args={[1.7, 0.6, 0.04]} />
        <meshStandardMaterial color={DARK_WOOD} roughness={0.9} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.8, -0.48]}>
        <boxGeometry args={[1.8, 0.8, 0.04]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-0.9, 0.8, 0]}>
        <boxGeometry args={[0.04, 0.8, 1.0]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[0.9, 0.8, 0]}>
        <boxGeometry args={[0.04, 0.8, 1.0]} />
        <meshStandardMaterial color={WALL} roughness={0.9} />
      </mesh>

      {/* Upper shelf */}
      <mesh position={[0, 1.2, -0.2]}>
        <boxGeometry args={[1.6, 0.04, 0.3]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </mesh>

      {/* Upper shelf display boxes */}
      <mesh position={[-0.3, 1.25, -0.2]}>
        <boxGeometry args={[0.2, 0.08, 0.15]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 1.27, -0.18]}>
        <boxGeometry args={[0.15, 0.12, 0.12]} />
        <meshStandardMaterial color="#2e8b57" roughness={0.7} />
      </mesh>
      <mesh position={[0.4, 1.25, -0.22]}>
        <boxGeometry args={[0.18, 0.06, 0.14]} />
        <meshStandardMaterial color="#cd853f" roughness={0.8} />
      </mesh>

      {/* Counter items */}
      {items.slice(0, 3).map((item, i) => {
        const count = Math.min(items.length, 3)
        const offset = count === 1 ? 0 : i - (count - 1) / 2
        if (item.type === 'plushie') {
          return (
            <group key={i} position={[offset * 0.5, SHELF_TOP + 0.045, COUNTER_Z]}>
              <PlushieController />
            </group>
          )
        }
        if (item.type === 'server') {
          return (
            <group key={i} position={[offset * 0.5, SHELF_TOP, COUNTER_Z]}>
              <ServerRack />
            </group>
          )
        }
        if (item.type === 'frame') {
          return (
            <group
              key={i}
              position={[offset * 0.5, SHELF_TOP + 0.225, COUNTER_Z]}
              onClick={handleClick}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
            >
              <PhotoPlane imageUrl={item.imageUrl} />
            </group>
          )
        }
        if (item.type === 'cloud') {
          return (
            <group key={i} position={[offset * 0.5, SHELF_TOP + 0.04, COUNTER_Z]}>
              <CloudPlushie />
            </group>
          )
        }
        if (item.type === 'terminal') {
          return (
            <group key={i} position={[offset * 0.5, SHELF_TOP, COUNTER_Z]}>
              <RetroTerminal />
            </group>
          )
        }
        if (item.type === 'crow') {
          return (
            <group key={i} position={[offset * 0.5, SHELF_TOP + 0.03, COUNTER_Z]}>
              <CrowPlushie />
            </group>
          )
        }
        const boxH = 0.06
        return (
          <mesh key={i} position={[offset * 0.5, SHELF_TOP + boxH / 2, COUNTER_Z]}>
            <boxGeometry args={[0.18, boxH, 0.14]} />
            <meshStandardMaterial
              color={item.color ?? '#8b4513'}
              roughness={0.8}
            />
          </mesh>
        )
      })}

      {/* Canopy assembly - tilted up from the back edge */}
      <group position={[0, 1.75, -0.7]} rotation={[-Math.PI / 9, 0, 0]}>
        {/* Canopy cloth */}
        <mesh position={[0, 0, 0.75]}>
          <boxGeometry args={[2.2, 0.04, 1.5]} />
          <meshStandardMaterial color={CANOPY} roughness={0.8} />
        </mesh>

        {/* Neon trim - front edge */}
        <mesh position={[0, -0.04, 1.495]}>
          <boxGeometry args={[2.0, 0.02, 0.04]} />
          <meshBasicMaterial color={neonColorVal} />
        </mesh>

        {/* Neon trim - side edges */}
        <mesh position={[1.09, -0.04, 0.8]}>
          <boxGeometry args={[0.04, 0.02, 1.3]} />
          <meshBasicMaterial color={neonColorVal} />
        </mesh>
        <mesh position={[-1.09, -0.04, 0.8]}>
          <boxGeometry args={[0.04, 0.02, 1.3]} />
          <meshBasicMaterial color={neonColorVal} />
        </mesh>

        {/* Lantern hanging from canopy */}
        <group position={[0, 0.15, 1.25]}>
          <mesh>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshBasicMaterial color={lanternColorVal} />
          </mesh>
        </group>
      </group>

      {/* Canopy support struts */}
      {[-0.8, 0, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 1.3, -0.4]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 6]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}

      {/* Hanging banner from front of roof */}
      <group
        position={[0, 2.2, 0.65]}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <mesh position={[0, -0.1, 0]}>
          <planeGeometry args={[2.2, 0.2]} />
          <meshBasicMaterial color="#2a2a2a" transparent opacity={0.9} />
        </mesh>
        <Text
          position={[0, -0.1, 0.01]}
          fontSize={0.08}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.0}
        >
          {projectName}
        </Text>
      </group>
    </group>
  )
}
