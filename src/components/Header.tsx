import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header
      className={`h-20 flex justify-between bg-card py-4 px-6 items-center`}
      style={{
        boxShadow: "var(--paper-shadow)",
      }}
    >
      <div className="flex gap-4">
        <div className="flex gap-2">
          <BookOpen />
          <div>Dev library</div>
        </div>
        <div>breadcrumb</div>
      </div>

      <div>github</div>
    </header>
  );
}
