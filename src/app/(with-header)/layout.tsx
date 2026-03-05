import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex justify-center">{children}</div>
    </>
  );
}
