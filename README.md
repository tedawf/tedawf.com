# My Personal Portfolio

A clean, minimal portfolio website built with Next.js, Tailwind CSS, and Shadcn UI. Features an AI chatbot, email contact form, and blog.

> Built this for fun and decided to open source it properly after getting lots of requests for permission to copy it!

## Live Demo

🌐 Check it out here: **[https://tedawf.com](https://tedawf.com)**

![Portfolio Screenshot](public/tedawf-com-2.png)

## Features

- Minimal design with Shadcn UI
- Light/dark mode toggle
- AI chatbot (Ted Support) trained on my portfolio content - please be nice to him! 😊
- Contact form with email integration
- Responsive mobile design
- Blog section

## Tech Stack

- Next.js
- Tailwind CSS
- Shadcn UI
- OpenAI API (chatbot)
- Vercel (hosting)
- AstraDB (vector storage)
- Upstash (caching)
- Resend (email)

## Getting Started

```bash
git clone https://github.com/tedawf/tedawf.com ted-portfolio
cd ted-portfolio
npm install
cp .env.example .env.local
# Add your own API keys to .env.local
npm run dev
```

## Environment Variables

```env
OPENAI_API_KEY=your_key
ASTRA_DB_APPLICATION_TOKEN=your_token
ASTRA_DB_ENDPOINT=your_endpoint
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## Customization

- Update personal info in `src/data/*.json`
- Replace projects in `src/data/projects.json`
- Replace blog posts in `content/` or remove it.
- Add your resume to `public/resume.pdf`
- Modify chatbot prompt in `src/app/api/chat/route.ts`

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

## Costs

- OpenAI API: ~$5
- Domain: ~$20/year
- Hosting/DB: Free tiers

## License

MIT

## Featured on YouTube!

📺 **[Live Portfolio Review by Anthony Sistilli](https://www.youtube.com/watch?v=aUJiNyb3cvM&t=40s)** - Got reviewed live on his stream!

🔥 [Started a trend?](https://youtu.be/ib-Nlg9qWBw?si=1atsKJyfYDXtFVnE&t=400) - Apparently this portfolio design inspired others!

---

Feel free to fork and make it your own! Would love to see what you guys build with it ✨
