import { ArrowLeftIcon } from "@radix-ui/react-icons";
import LinkWithIcon from "../components/LinkWithIcon";

export default function NotFound() {
  return (
    <section className="pb-24 pt-40">
      <div className="min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="title text-muted-foreground sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="title sm:text-5xl">
                  cannot find <i>leh</i>...
                </h1>
                <p className="mt-1 text-base text-muted-foreground">
                  Maybe I renamed or deleted the page <i>liao</i>. Try again{" "}
                  <i>lor</i>.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <LinkWithIcon
                  href="/"
                  text="back to home"
                  icon={<ArrowLeftIcon className="size-5" />}
                  position="left"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
