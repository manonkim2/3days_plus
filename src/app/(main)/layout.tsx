export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  )
}
