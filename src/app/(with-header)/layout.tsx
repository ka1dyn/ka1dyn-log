import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Header />
      <div id="main" className="flex justify-center px-8 py-14">
        <div id="content-container" className="w-6xl">
          {children}
        </div>
      </div>
    </div>
  );
}
