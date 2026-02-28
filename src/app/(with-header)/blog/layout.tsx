export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="content-container" className="w-6xl min-w-0 mt-12">
      {children}
    </div>
  );
}
