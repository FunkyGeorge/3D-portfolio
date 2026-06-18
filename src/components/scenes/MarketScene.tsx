import { useRef, useEffect, useCallback, type ComponentRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Lighting } from '../Lighting'
import { MarketStall } from '../MarketStall'
import { StreetLight } from '../StreetLight'
import { CenterSignpost } from '../CenterSignpost'
import type { StallItem } from '../../data/stalls'
import { stalls } from '../../data/stalls'
import { projects } from '../../data/projects'

type ControlsHandle = ComponentRef<typeof OrbitControls>

function buildStallItems(projectId: number, image?: string): StallItem[] {
  const items: StallItem[] = [{ type: 'frame', imageUrl: image }]
  if (projectId === 1 || projectId === 3) {
    items.unshift({ type: 'plushie' })
  }
  if (projectId === 3) {
    items.push({ type: 'cloud' })
  }
  if (projectId === 4) {
    items.unshift({ type: 'server' })
    items.push({ type: 'cloud' })
  }
  if (projectId === 2) {
    items.unshift({ type: 'terminal' })
  }
  if (projectId === 5) {
    items.push({ type: 'crow' })
  }
  return items
}

interface MarketSceneProps {
  selectedProject: number | null
  onStallClick: (projectId: number) => void
}

export function MarketScene({ selectedProject, onStallClick }: MarketSceneProps) {
  const controlsRef = useRef<ControlsHandle>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedRef = useRef(selectedProject)

  useEffect(() => {
    selectedRef.current = selectedProject
  }, [selectedProject])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = selectedProject === null
    }
  }, [selectedProject])

  const handleStart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (controlsRef.current) controlsRef.current.autoRotate = false
  }, [])

  const handleEnd = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (selectedRef.current === null && controlsRef.current) {
        controlsRef.current.autoRotate = true
      }
    }, 10000)
  }, [])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)
    return () => {
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
    }
  }, [handleStart, handleEnd])

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        autoRotate
        autoRotateSpeed={-1.5}
        enableZoom
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
      />

      <Lighting />

      <CenterSignpost />

      {stalls.map((s) => {
        const project = projects.find((p) => p.id === s.projectId)
        return (
        <MarketStall
          key={s.projectId}
          position={s.position}
          rotation={s.rotation}
          neonColor={s.neonColor}
          projectId={s.projectId}
          projectName={project?.title ?? `Project ${s.projectId}`}
          items={buildStallItems(s.projectId, project?.image)}
          onClick={onStallClick}
        />
        )
      })}

      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <StreetLight
          key={`light-${i}`}
          position={[Math.cos(angle) * 7, 0, Math.sin(angle) * 7]}
        />
      ))}
    </>
  )
}
