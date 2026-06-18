export function CloudPlushie() {
  return (
    <group scale={2}>
      {/* Main body */}
      <mesh position={[0, 0.035, 0]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Fluff bumps */}
      <mesh position={[-0.04, 0.045, 0]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[0.04, 0.04, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[-0.02, 0.07, 0]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[0.025, 0.065, 0]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Little face */}
      <mesh position={[-0.02, 0.035, 0.045]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#333" roughness={0.6} />
      </mesh>
      <mesh position={[0.02, 0.035, 0.045]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#333" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.025, 0.045]}>
        <sphereGeometry args={[0.005, 6, 6]} />
        <meshStandardMaterial color="#ff6b9d" roughness={0.5} />
      </mesh>
    </group>
  )
}
