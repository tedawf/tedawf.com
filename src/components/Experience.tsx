import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import e from "@/data/education.json";
import w from "@/data/work.json";
import { experienceSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Experience() {
  const work = experienceSchema.parse(w);
  const education = experienceSchema.parse(e);

  return (
    <Tabs defaultValue="work">
      <TabsList className="mb-2 grid w-full grid-cols-2">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={work}></Timeline>
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education}></Timeline>
      </TabsContent>
    </Tabs>
  );
}
