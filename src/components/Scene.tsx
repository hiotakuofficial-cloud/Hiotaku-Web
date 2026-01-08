import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function GlowOrb({ color, position }: { color: string; position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y += 0.003
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.18
  })

  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[0.9, 2]} />
        <MeshTransmissionMaterial
          thickness={0.7}
          roughness={0.08}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.18}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.5}
          temporalDistortion={0.18}
          color={color}
          attenuationColor={color}
          attenuationDistance={1.2}
        />
      </mesh>
    </Float>
  )
}

function NeonRing({ radius, color, y }: { radius: number; color: string; y: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 1.6,
        metalness: 0.8,
        roughness: 0.2,
      }),
    [color],
  )

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.z += 0.006
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.25
  })

  return (
    <mesh ref={mesh} position={[0, y, 0]} material={material}>
      <torusGeometry args={[radius, 0.085, 20, 120]} />
    </mesh>
  )
}

function SceneObjects() {
  return (
    <group>
      <ambientLight intensity={0.45} />
      <directionalLight intensity={1.2} position={[3, 4, 2]} color={'#d8ffff'} />
      <pointLight intensity={2.1} position={[-3, 1, 2]} color={'#a855f7'} />
      <pointLight intensity={1.7} position={[2, -1.5, 1]} color={'#ff3bd4'} />

      <NeonRing radius={1.55} color={'#59f9ff'} y={0} />
      <NeonRing radius={1.05} color={'#a855f7'} y={-0.22} />
      <NeonRing radius={0.62} color={'#ff3bd4'} y={0.18} />

      <GlowOrb color={'#59f9ff'} position={[-1.1, 0.25, 0.1]} />
      <GlowOrb color={'#a855f7'} position={[1.1, -0.1, -0.2]} />
      <GlowOrb color={'#ff3bd4'} position={[0, 0.95, -0.55]} />

      <Sparkles count={90} scale={[8, 4, 8]} size={2.1} speed={0.35} color={'#bdfcff'} />
      <Environment preset="city" />
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 4.1], fov: 46 }}
      dpr={[1, 2]}
    >
      <SceneObjects />
    </Canvas>
  )
}

