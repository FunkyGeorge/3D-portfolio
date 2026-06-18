import { useMemo } from 'react'
import * as THREE from 'three'

interface StreetLightProps {
  position: [number, number, number]
}

const LIGHT_COLOR = '#ffddaa'

export function StreetLight({ position }: StreetLightProps) {
  const poleMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#111118', metalness: 0.9, roughness: 0.2 }),
    [],
  )

  const lanternMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LIGHT_COLOR,
        emissive: LIGHT_COLOR,
        emissiveIntensity: 1.2,
      }),
    [],
  )

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 3.5, 8]} />
        <primitive object={poleMat} />
      </mesh>

      {/* Lantern housing */}
      <mesh position={[0, 3.55, 0]}>
        <boxGeometry args={[0.14, 0.08, 0.14]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Glowing bulb */}
      <mesh position={[0, 3.52, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <primitive object={lanternMat} />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 3.5, 0]}
        color={LIGHT_COLOR}
        intensity={8}
        distance={20}
        decay={2}
      />
    </group>
  )
}
