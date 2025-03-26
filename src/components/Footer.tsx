import Link from 'next/link'

const Footer = () => (
  <footer className="container flex justify-between h-[280px] p-xxl text-sm text-fontSecondary font-poppins">
    <div className="flex flex-col justify-end">
      <div>Logo</div>
      <p className="font-light">© 2025 Wonyoung Kim. All rights reserved.</p>
      <p className="font-light">
        Built with Next.js, Prisma, Tailwind CSS, Framer Motion
      </p>
    </div>

    <div className="flex gap-[48px]">
      <div className="flex flex-col gap-sm">
        <span className="text-sm font-semibold">SITE</span>
        <nav className="flex flex-col">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/news">News</Link>
        </nav>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="text-sm font-semibold">SOCIAL</span>
        <div className="flex flex-col">
          <Link
            href="https://github.com/manonkim2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link href="mailto:kim.manon2@gmail.com">Email</Link>
          <Link
            href="https://manon-kim.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
