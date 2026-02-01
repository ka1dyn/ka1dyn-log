import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main w-screen">
      <Header />
      <div className="content">{children}</div>
    </div>
  );
}
