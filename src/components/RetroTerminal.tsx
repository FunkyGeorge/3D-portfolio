import { Text } from '@react-three/drei'

const BEIGE = '#d4c4a8'
const DARK_BEIGE = '#b8a888'
const SCREEN_BG = '#1a3a1a'
const SCREEN_GREEN = '#33ff33'

export function RetroTerminal() {
  return (
    <group rotation={[0, Math.PI / 9, 0]}>
      {/* Monitor casing */}
      <mesh position={[0, 0.065, 0]}>
        <boxGeometry args={[0.16, 0.13, 0.12]} />
        <meshStandardMaterial color={BEIGE} roughness={0.7} />
      </mesh>

      {/* Screen bezel */}
      <mesh position={[0, 0.07, 0.062]}>
        <boxGeometry args={[0.12, 0.09, 0.008]} />
        <meshStandardMaterial color={DARK_BEIGE} roughness={0.6} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.07, 0.067]}>
        <planeGeometry args={[0.1, 0.075]} />
        <meshBasicMaterial color={SCREEN_BG} />
      </mesh>

      {/* Prompt text */}
      <Text
        position={[0, 0.072, 0.069]}
        fontSize={0.035}
        color={SCREEN_GREEN}
        anchorX="center"
        anchorY="middle"
      >
        {'>_'}
      </Text>

      {/* Base/stand */}
      <mesh position={[0, 0.005, 0.03]}>
        <boxGeometry args={[0.08, 0.01, 0.06]} />
        <meshStandardMaterial color={DARK_BEIGE} roughness={0.8} />
      </mesh>

      {/* Keyboard body */}
      <mesh position={[0, 0.003, 0.09]}>
        <boxGeometry args={[0.16, 0.006, 0.07]} />
        <meshStandardMaterial color={BEIGE} roughness={0.7} />
      </mesh>
      {/* Keys */}
      {[0.075, 0.09, 0.105].map((z, ri) =>
        [-0.065, -0.04, -0.015, 0.01, 0.035, 0.06].map((x, ci) => (
          <mesh key={`${ri}-${ci}`} position={[x, 0.008, z]}>
            <boxGeometry args={[0.018, 0.005, 0.01]} />
            <meshStandardMaterial color={DARK_BEIGE} roughness={0.6} />
          </mesh>
        ))
      )}
    </group>
  )
}
