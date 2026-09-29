import { useEffect, useState } from 'react'
import SectionHeading from '../../components/public/SectionHeading'
import ProjectCard from '../../components/public/ProjectCard'
import { getPublicProjects } from '../../services/projectService'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPublicProjects().then((response) => setProjects(response.projects || [])).catch(() => undefined).finally(() => setIsLoading(false))
  }, [])

  return <main className="inner-page"><section className="page-hero"><div className="section"><span className="eyebrow">Our work</span><h1>Projects that turn care into action.</h1><p>From classrooms to community health camps, our projects are shaped with local people and built for lasting impact.</p></div></section><section className="section"><SectionHeading eyebrow="All projects" title="Explore our work" /><div className="project-grid project-grid-page">{projects.length ? projects.map((project) => <ProjectCard key={project.id} project={project} />) : <div className="col-span-full rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-12 text-center text-sm text-slate-500">{isLoading ? 'Loading projects...' : 'No projects published yet.'}</div>}</div></section></main>
}
