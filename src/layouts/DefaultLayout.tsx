import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function DefaultLayout({
  header,
  body,
  showBackButton = true,
}: {
  header: ReactNode;
  body: ReactNode;
  showBackButton?: boolean;
}) {
  let navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-12 items-center justify-start min-h-svh pt-14 relative">
      {showBackButton && (
        <span
          className="absolute left-10 text-slate-500  text-2xl cursor-pointer hover:text-slate-300 p-3"
          onClick={handleNavigateBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      )}
      <div className="flex gap-6 items-center justify-center text-4xl font-bold ">
        {header}
      </div>
      {body}
    </div>
  );
}

export default DefaultLayout;
