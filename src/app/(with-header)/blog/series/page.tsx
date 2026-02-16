import BreadCrumbUpdater from "@/components/BreadCrumbUpdater";
import { getAllSeries } from "@/lib/fetch";

export default async function Page() {
  const seriesList = await getAllSeries("/blog");

  console.log(seriesList);

  return (
    <div>
      <BreadCrumbUpdater path={"/Series"} />

      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl mb-2 font-semibold -translate-x-0.5">
          <span className="-translate-y-0.5">모음집</span>
        </h1>
        <p className="hidden text-foreground md:block">
          주제에 관련된 글을 모아보세요
        </p>
      </div>
    </div>
  );
}
