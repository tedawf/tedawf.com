export default function ChatHeader() {
  return (
    <section className="flex w-full items-center justify-start gap-3">
      <div className="flex flex-col items-start">
        <p className="text-xs">Chat with</p>
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-sm font-medium">Ted Support</p>
        </div>
      </div>
    </section>
  );
}
