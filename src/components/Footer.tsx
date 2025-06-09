import Link from 'next/link'

const Footer = () => (
  <footer className="container flex justify-between h-[280px] py-[56px] px-lg text-sm text-fontTertiary font-poppins">
    <div className="flex flex-col justify-end">
      <p className="text-md font-bold">3DAYS+</p>
      <p className="font-light">© 2025 Wonyoung Kim. All rights reserved.</p>
      <p className="font-light">
        Built with Next.js, Prisma, Tailwind CSS, Framer Motion
      </p>
    </div>

    <div className="flex gap-[48px]">
      <div className="flex flex-col gap-sm">
        <p className="text-fontSecondary font-bold">SITE</p>
        <nav className="flex flex-col">
          <Link href="/">Dashboard</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/news">News</Link>
        </nav>
      </div>

      <div className="flex flex-col gap-sm">
        <p className="text-fontSecondary font-bold">SOCIAL</p>
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
