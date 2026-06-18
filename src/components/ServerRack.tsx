const CHASSIS = '#1a1a1a'
const DIVIDER = '#333'
const DRIVE = '#444'
const LED_GREEN = '#00cc44'
const LED_BLUE = '#4488ff'

const CHASSIS_H = 0.18
const CHASSIS_W = 0.07
const CHASSIS_D = 0.05
const SCALE = 0.45 / CHASSIS_H

export function ServerRack() {
  return (
    <group rotation={[0, Math.PI / 18, 0]} scale={[SCALE, SCALE, SCALE]}>
      {/* Main chassis */}
      <mesh position={[0, CHASSIS_H / 2, 0]}>
        <boxGeometry args={[CHASSIS_W, CHASSIS_H, CHASSIS_D]} />
        <meshStandardMaterial color={CHASSIS} roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Server slot dividers */}
      {[-0.07, -0.05, -0.03, -0.01, 0.01, 0.03, 0.05, 0.07].map((y, i) => (
        <mesh key={i} position={[0, y + CHASSIS_H / 2, 0.027]}>
          <boxGeometry args={[0.065, 0.004, 0.002]} />
          <meshStandardMaterial color={DIVIDER} roughness={0.8} />
        </mesh>
      ))}

      {/* Drive bays */}
      <mesh position={[-0.015, 0.12, 0.027]}>
        <boxGeometry args={[0.02, 0.012, 0.003]} />
        <meshStandardMaterial color={DRIVE} roughness={0.7} />
      </mesh>
      <mesh position={[0.015, 0.12, 0.027]}>
        <boxGeometry args={[0.02, 0.012, 0.003]} />
        <meshStandardMaterial color={DRIVE} roughness={0.7} />
      </mesh>

      {/* LEDs */}
      <mesh position={[-0.025, 0.015, 0.027]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color={LED_GREEN} emissive={LED_GREEN} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.015, 0.015, 0.027]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color={LED_BLUE} emissive={LED_BLUE} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
