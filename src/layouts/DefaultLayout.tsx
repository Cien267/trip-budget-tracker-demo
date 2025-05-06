import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";

function DefaultLayout({
  header,
  body,
  showBackButton = true,
  urlBack = "",
}: {
  header: ReactNode;
  body: ReactNode;
  showBackButton?: boolean;
  urlBack?: string;
}) {
  let navigate = useNavigate();
  const handleNavigateBack = () => {
    if (urlBack) navigate(urlBack);
    else navigate(-1);
  };

  return (
    <div className="flex flex-col gap-12 items-center justify-start min-h-svh pt-14 w-full">
      <div className="flex gap-6 items-center justify-center text-4xl font-bold relative w-full">
        {showBackButton && (
          <span
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-slate-500  text-2xl cursor-pointer hover:text-slate-300 p-3"
            onClick={handleNavigateBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}
        {header}
      </div>
      {body}
      <Toaster />
    </div>
  );
}

export default DefaultLayout;
