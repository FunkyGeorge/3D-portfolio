export function CrowPlushie() {
  return (
    <group rotation={[0, (80 * Math.PI) / 180, 0]}>
      {/* Body */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.09, 0.015]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, 0.09, 0.06]} rotation={[-Math.PI / 2, 0, -Math.PI]}>
        <coneGeometry args={[0.006, 0.04, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.016, 0.095, 0.04]}>
        <sphereGeometry args={[0.004, 8, 8]} />
        <meshStandardMaterial color="#000" roughness={0.3} />
      </mesh>
      <mesh position={[0.016, 0.095, 0.04]}>
        <sphereGeometry args={[0.004, 8, 8]} />
        <meshStandardMaterial color="#000" roughness={0.3} />
      </mesh>

      {/* Wings */}
      <group position={[-0.045, 0.04, 0.005]} rotation={[0, 0.2, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>
      </group>
      <group position={[0.045, 0.04, 0.005]} rotation={[0, -0.2, -0.3]}>
        <mesh>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
        </mesh>
      </group>

      {/* Tail */}
      <mesh position={[0, 0.015, -0.04]}>
        <boxGeometry args={[0.01, 0.015, 0.015]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.015, -0.0175, 0]}>
        <cylinderGeometry args={[0.004, 0.005, 0.025, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.015, -0.0175, 0]}>
        <cylinderGeometry args={[0.004, 0.005, 0.025, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  )
}
