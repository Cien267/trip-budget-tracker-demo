import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import { TripFormType } from "@/types";
import { format } from "date-fns";

function Header() {
  return (
    <>
      <FontAwesomeIcon icon={faPlaneDeparture} className="text-sky-500" />
      Trip Expense Tracker
    </>
  );
}
function Body() {
  const trips = JSON.parse(localStorage.getItem("trip-budget-tracker") ?? "[]");

  const getStatusClasses = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100 border border-yellow-200";
      case "inprogress":
        return "text-emerald-600 bg-emerald-100 border border-emerald-200";
      case "completed":
        return "text-blue-600 bg-blue-100 border border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border border-gray-200";
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 p-4 border rounded-lg shadow-md">
        <div>
          <div className="font-bold text-sky-600 text-lg">Create New Trip </div>
          <div className="text-xs font-normal text-gray-400">
            Start planning your next adventure
          </div>
        </div>
        <NavLink to="/create-new-trip" end>
          <button
            className="group cursor-pointer outline-none hover:rotate-90 duration-300 animate-pulse hover:animate-none"
            title="Add New"
          >
            <svg
              className="stroke-cyan-500 fill-none group-hover:fill-cyan-100 group-active:stroke-cyan-200 group-active:fill-cyan-600 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="60px"
              width="60px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 px-10 pt-4">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-emerald-600 text-lg">Recent Trips</div>
          <div className="text-xs font-normal text-gray-400">
            Quick access to your recent trips
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 p-4 rounded-lg max-w-1xl">
          {trips.length > 0 ? (
            trips.map((trip: TripFormType) => {
              return (
                <NavLink to={`/${trip.id}/expenses`} end>
                  <div
                    key={trip.id}
                    className="border border-emerald-200 rounded-lg flex justify-between items-start p-4 min-w-md hover:shadow-md hover:bg-emerald-50 transition-all cursor-pointer hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col justify-start">
                      <div className="font-bold text-md text-slate-600">
                        {trip.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {trip.date.from && format(trip.date.from, "LLL dd, y")}{" "}
                        - {trip.date.to && format(trip.date.to, "LLL dd, y")}
                      </div>
                    </div>
                    <div>
                      <span
                        className={`text-xs rounded-lg py-1 px-2 font-semibold text-emerald-600 bg-emerald-100 border border-emerald-200 ${getStatusClasses(trip.status)}`}
                      >
                        {trip.status &&
                          trip.status.charAt(0).toUpperCase() +
                            trip.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <div className="text-stone-400 text-lg">
              You currently have no trips
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function App() {
  return (
    <DefaultLayout header={<Header />} body={<Body />} showBackButton={false} />
  );
}

export default App;
