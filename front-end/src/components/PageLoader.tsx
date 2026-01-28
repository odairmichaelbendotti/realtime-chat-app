import { Loader } from "lucide-react";

type PageLoader = {
  color?: "dark" | "white";
};

function PageLoader({ color = "dark" }: PageLoader) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${color === "white" && "text-white"}`}
    >
      <Loader className="animate-spin" />
    </div>
  );
}

export default PageLoader;
