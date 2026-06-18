import { RoundedBox } from '@react-three/drei'

const PINK = '#ff6b9d'
const DPAD = '#444'
const BTN_A = '#ff4444'
const BTN_B = '#ffaa00'
const BTN_X = '#4488ff'
const BTN_Y = '#44cc44'

export function PlushieController() {
  return (
    <group rotation={[0.1, 0, 0]}>
      {/* Left grip - angled outward */}
      <group position={[-0.065, -0.035, 0]} rotation={[0, 0, 0.2]}>
        <RoundedBox args={[0.035, 0.16, 0.045]} radius={0.012}>
          <meshStandardMaterial color={PINK} roughness={0.85} />
        </RoundedBox>
      </group>

      {/* Right grip - angled outward */}
      <group position={[0.065, -0.035, 0]} rotation={[0, 0, -0.2]}>
        <RoundedBox args={[0.035, 0.16, 0.045]} radius={0.012}>
          <meshStandardMaterial color={PINK} roughness={0.85} />
        </RoundedBox>
      </group>

      {/* Body and face details shifted up on the handles */}
      <group position={[0, 0.02, 0]}>
        {/* Main body */}
        <RoundedBox args={[0.18, 0.05, 0.07]} radius={0.015}>
          <meshStandardMaterial color={PINK} roughness={0.85} />
        </RoundedBox>

        {/* D-pad */}
        <group position={[-0.05, 0.005, 0.04]}>
          <mesh>
            <boxGeometry args={[0.025, 0.018, 0.006]} />
            <meshStandardMaterial color={DPAD} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.016, 0]}>
            <boxGeometry args={[0.008, 0.014, 0.006]} />
            <meshStandardMaterial color={DPAD} roughness={0.6} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <boxGeometry args={[0.008, 0.014, 0.006]} />
            <meshStandardMaterial color={DPAD} roughness={0.6} />
          </mesh>
        </group>

        {/* Face buttons */}
        <group position={[0.07, 0.008, 0.04]}>
          <mesh position={[0, 0.014, 0]}>
            <sphereGeometry args={[0.007, 8, 8]} />
            <meshStandardMaterial color={BTN_Y} roughness={0.4} />
          </mesh>
          <mesh position={[0.014, 0, 0]}>
            <sphereGeometry args={[0.007, 8, 8]} />
            <meshStandardMaterial color={BTN_B} roughness={0.4} />
          </mesh>
          <mesh position={[-0.014, 0, 0]}>
            <sphereGeometry args={[0.007, 8, 8]} />
            <meshStandardMaterial color={BTN_X} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.014, 0]}>
            <sphereGeometry args={[0.007, 8, 8]} />
            <meshStandardMaterial color={BTN_A} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
