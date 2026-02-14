import { cn } from "@/lib/utils";

interface CategoryProps {
  category: string;
  className?: string;
}

export default function Category({ category, className }: CategoryProps) {
  let fontColor = "";

  switch (category) {
    case "일반":
      fontColor = "#3d3529";
      break;
    case "기능구현":
      fontColor = "#598156";
      break;
    case "트러블슈팅":
      fontColor = "#c25450";
      break;
    case "기능개선":
      fontColor = "#008779";
      break;

    default:
      fontColor = "#008779";
  }

  return (
    <div
      className={cn(
        "px-2 py-1 bolder text-xs rounded-md w-fit border",
        className,
      )}
      style={{
        borderColor: `${fontColor}55`,
        // backgroundColor: `${fontColor}11`,
      }}
    >
      <span
        className="text-white"
        style={{
          color: fontColor,
        }}
      >
        {category}
      </span>
    </div>
  );
}
