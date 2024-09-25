import data from "@/data/projects.json";
import { projectSchema } from "@/lib/schemas";
import { ProjectCard } from "./ProjectCard";

interface Props {
  limit?: number;
}

export default function Projects({ limit }: Props) {
  let projects = projectSchema.parse(data).projects;
  if (limit) {
    projects = projects.slice(0, limit);
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project, id) => (
        <ProjectCard key={id} project={project} />
      ))}
    </section>
  );
}
