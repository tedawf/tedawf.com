import { Project } from "@/data/Projects";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: Project[];
}

export default function Projects({ projects }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project, id) => (
        <ProjectCard key={id} project={project} />
      ))}
    </section>
  );
}
