import type { Project } from '../data/projects'

interface ProjectPopupProps {
  project: Project
  onClose: () => void
}

export function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl animate-[scale-fade_0.2s_ease-out] rounded-xl border border-white/10 bg-[#16171d] p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-3xl font-semibold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="mb-6 w-full rounded-lg object-cover aspect-video"
          />
        )}

        <p className="mb-6 text-base leading-relaxed text-gray-300">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-4 py-1 text-sm text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-700 px-6 py-3 text-base text-white hover:bg-gray-600 transition-colors"
            >
              GitHub
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-base text-white hover:bg-indigo-500 transition-colors"
            >
              Try Now
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
