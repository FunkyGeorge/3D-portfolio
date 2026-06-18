import { useState, useCallback } from 'react'
import type { Project } from '../data/projects'

export function useMarketSelection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return { selectedProject, selectProject, clearSelection }
}
