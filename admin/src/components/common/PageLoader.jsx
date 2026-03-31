import { Spinner } from "@/components/ui/spinner";

const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-[60vh]">

      <div className="flex flex-col items-center gap-3">

        {/* Spinner */}
        <Spinner className="size-8 text-muted-foreground" />

        {/* Text */}
        <p className="text-sm text-muted-foreground">
          {text}
        </p>

      </div>

    </div>
  );
};

export default PageLoader;