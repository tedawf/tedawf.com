import Intro from "@/components/Intro";
import RecentPosts from "@/components/RecentPosts";
import RecentProjects from "@/components/RecentProjects";

export default function Home() {
  return (
    <section className="py-24">
      <div className="container flex max-w-3xl flex-col gap-y-16">
        <Intro />
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  );
}
