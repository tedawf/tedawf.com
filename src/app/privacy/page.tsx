import Link from "next/link";

const lastUpdated = "Sep 2024";

export default function page() {
  return (
    <article className="prose mt-8 pb-16 dark:prose-invert">
      <div className="space-y-4">
        <h1 className="title text-5xl">privacy policy.</h1>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      <div className="space-y-4">
        <h2 className="title text-3xl">Hey, Welcome!</h2>
        <p>
          Thanks for stopping by! This <b>Privacy Policy</b> is just here to let
          you know how things work around here. My website is mainly about
          showcasing my work, and I&apos;m all about respecting your privacy.
        </p>
        <h2 className="title">What Information I Collect (Hint: Not Much)</h2>
        <p>
          Honestly, this is just a static portfolio site, so I don&apos;t
          actively collect any personal information. There&apos;s no account
          creation, no tracking cookies, and definitely no sneaky data
          gathering.
        </p>
        <h3>1. Chatbot Conversations</h3>
        <p>
          If you send a message through the chatbot, it might be stored for
          caching and training purposes. So please avoid sharing any
          confidential info in the chat.
        </p>
        <h3>2. Contact Info</h3>
        <p>
          If you reach out via email or the contact form, the info you provide
          is entirely up to you. I&apos;ll only use it to reply and have a
          conversation with you—no funny business.
        </p>
        <h2 className="title">How I Use the Info</h2>
        <p>Here&apos;s what I might do with any information I collect:</p>
        <ul>
          <li>Make sure the site is running smoothly</li>
          <li>Improve the website based on feedback you might share</li>
          <li>Respond to your questions or feedback</li>
        </ul>
        <h2 className="title">Sharing Your Info (Spoiler: I Don&apos;t)</h2>
        <p>
          I don&apos;t sell, trade, or rent your personal info. If you shared
          something sensitive by accident, feel free to reach out, and I&apos;ll
          help you remove it.
        </p>
        <h2 className="title">Security (The Internet Isn&apos;t Perfect)</h2>
        <p>
          I&apos;ll do my best to keep any info you share safe, but let&apos;s
          be real—no system is foolproof. While I&apos;ll take reasonable steps
          to protect your info, I can&apos;t promise 100% security.
        </p>
        <h2 className="title">Policy Updates (No Surprises)</h2>
        <p>
          This policy is current as of <b>{lastUpdated}</b>. If I make any
          changes, I&apos;ll update it here, so you&apos;re always in the loop.
          Feel free to check back occasionally, but don&apos;t worry—I&apos;m
          not making any big changes without letting you know.
        </p>
        <h2 className="title">Got Questions?</h2>
        <p>
          If you have any questions, concerns, or just want to say hi, drop me
          an email at{" "}
          <Link href="mailto:hello@tedawf.com">hello@tedawf.com</Link> or use
          the <Link href="/contact">contact form</Link>. I&apos;d love to hear
          from you!
        </p>
      </div>
    </article>
  );
}
