import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Header />
      <div id="main" className="flex justify-center">
        {children}
      </div>
    </div>
  );
}
