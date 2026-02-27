import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Header />
      <div
        id="main"
        className="flex justify-center px-2 sm:px-8 py-14 overflow-y-auto h-[calc(100vh-80px)]"
      >
        <div id="content-container" className="w-6xl min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
