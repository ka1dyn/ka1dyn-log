import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";

export default function Page() {
  return (
    <div>
      <BreadCrumbUpdater path={"/series"} />
      모음집입니다.
    </div>
  );
}
