import Intro from "@/components/Intro";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function Home() {
  return (
    <section className="py-24">
      <div className="container flex max-w-3xl flex-col gap-y-16">
        <Intro />
        <MDXRemote source={`# This is a H1 heading`} />
      </div>
    </section>
  );
}
