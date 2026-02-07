import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";

export default function Page() {
  return (
    <div>
      <BreadCrumbUpdater path={"/introduce"} />
      소개글입니다.
    </div>
  );
}
