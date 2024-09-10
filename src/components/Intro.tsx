import Image from "next/image";
import mugshot from "/public/ted.jpg";

export default function Intro() {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 md:flex-row md:items-center">
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="title">hi ted here 👋</h1>
        <p className="mt-3 font-light">
          At work, I&#39;m dedicated to building large-scale enterprise
          applications that drive real impact. I&#39;m just as passionate about
          experimenting with cutting-edge frameworks and tech stacks at
          home—with a little coding support from my cat.
        </p>
      </div>
      <Image
        className="rounded-lg"
        src={mugshot}
        alt="Photo of Ted"
        width={175}
        height={175}
        priority
      />
    </section>
  );
}
