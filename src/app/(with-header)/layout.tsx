import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Header />
      <div id="main" className="flex justify-center min-h-[calc(100vh-80px)]">
        {children}
      </div>
    </div>
  );
}
