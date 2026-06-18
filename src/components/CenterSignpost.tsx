import { Text } from '@react-three/drei'

const PANEL_RADIUS = 0.6
const PANEL_W = 2 * PANEL_RADIUS * Math.tan(Math.PI / 3) // edges touch
const PANEL_H = 0.35
const POST_H = 3.2

export function CenterSignpost() {
  return (
    <group>
      {/* Post */}
      <mesh position={[0, POST_H / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.05, POST_H, 8]} />
        <meshStandardMaterial color="#444" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* 3-sided billboard */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
        <group key={i} position={[0, POST_H + PANEL_H / 2, 0]} rotation={[0, angle, 0]}>
          {/* Panel backing */}
          <mesh position={[0, 0, PANEL_RADIUS]}>
            <planeGeometry args={[PANEL_W, PANEL_H]} />
            <meshBasicMaterial color="#1a1a2e" />
          </mesh>
          {/* Text */}
          <Text
            position={[0, 0, PANEL_RADIUS + 0.005]}
            fontSize={0.12}
            fontWeight="bold"
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={PANEL_W - 0.12}
          >
            George's Portfolio
          </Text>
        </group>
      ))}

      {/* Top cap */}
      <mesh position={[0, POST_H + PANEL_H + 0.03, 0]}>
        <coneGeometry args={[0.05, 0.08, 8]} />
        <meshStandardMaterial color="#555" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}
