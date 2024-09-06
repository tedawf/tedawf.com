import Image from "next/image";
import React from "react";
import mugshot from "@/assets/ted.jpg";

export default function Intro() {
  return (
    <section className="flex flex-col-reverse items-start gap-x-10 gap-y-4 md:flex-row md:items-center">
      {/* Introduction */}
      <div className="mt-2 flex-1 md:mt-0">
        <h1 className="title">hi ted here 👋</h1>
        <p className="mt-3 font-light">
          I build large-scale enterprise applications at work and experiment
          with new technologies and frameworks at home, occasionally getting
          coding help from my cat.
        </p>
      </div>
      {/* Photo */}
      <div>
        <Image
          className="rounded-lg"
          src={mugshot}
          alt="Photo of Ted"
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  );
}
