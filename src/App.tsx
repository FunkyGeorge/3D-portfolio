import { Canvas } from '@react-three/fiber'
import { useMarketSelection } from './hooks/useMarketSelection'
import { projects } from './data/projects'
import { MarketScene } from './components/scenes/MarketScene'
import { ProjectPopup } from './components/ProjectPopup'

export function App() {
  const { selectedProject, selectProject, clearSelection } =
    useMarketSelection()

  const handleStallClick = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    if (project) selectProject(project)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Canvas camera={{ position: [0, 4, 9], fov: 50 }} dpr={[1, 2]}>
        <MarketScene
          selectedProject={selectedProject?.id ?? null}
          onStallClick={handleStallClick}
        />
      </Canvas>

      {selectedProject && (
        <ProjectPopup project={selectedProject} onClose={clearSelection} />
      )}
    </div>
  )
}
