import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";

export default function Page() {
  return (
    <div className="mt-20">
      <BreadCrumbUpdater path={"/Daily"} />
      일상글 목록입니다.
    </div>
  );
}
