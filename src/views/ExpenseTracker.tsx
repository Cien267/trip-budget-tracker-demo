import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCalendarDays,
  faPeopleGroup,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import DefaultLayout from "@/layouts/DefaultLayout";
import { TripFormType } from "@/types";
import { format } from "date-fns";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils";

function Header() {
  return (
    <>
      <FontAwesomeIcon icon={faMoneyBillWave} className="text-sky-500" />
      Expense Tracker
    </>
  );
}
function Body() {
  const trips = JSON.parse(localStorage.getItem("trip-budget-tracker") ?? "[]");
  let params = useParams();
  const currentTrip = trips.find(
    (trip: TripFormType) => trip.id === params.tripId,
  );

  console.log("currentTrip", currentTrip);
  return (
    <>
      <div className="flex flex-col justify-center items-center py-4 px-8 mx-8 border rounded-lg shadow-md min-w-lg sm:min-w-2xl md:min-w-4xl lg:min-w-5xl bg-gradient-to-l from-green-300 to-blue-500 text-white">
        <div className="flex justify-between items-center w-full">
          <div className="font-black text-2xl text-start">
            {currentTrip.name}
          </div>
          <NavLink to={`/${currentTrip.id}/expenses/create`} end>
            <Button
              variant="outline"
              className="text-blue-400 font-bold px-6 py-6 text-lg"
            >
              + Add Expense
            </Button>
          </NavLink>
        </div>
        <div className="w-full text-start text-sm text-green-200 font-semibold">
          {currentTrip.description}
        </div>
        <div className="w-full text-start text-sm font-semibold mt-3">
          <FontAwesomeIcon icon={faCalendarDays} className="mr-3.5" />{" "}
          {currentTrip.date.from && format(currentTrip.date.from, "LLL dd, y")}{" "}
          - {currentTrip.date.to && format(currentTrip.date.to, "LLL dd, y")}
        </div>
        <div className="w-full text-start text-sm font-semibold mt-2">
          <FontAwesomeIcon icon={faPeopleGroup} className="mr-2" />{" "}
          {currentTrip.participants}
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 w-full mt-4">
          <div className="w-[calc(50%-12px)] rounded-lg bg-white/20 backdrop-blur-sm p-4">
            <div className="text-sm font-medium">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-1" />{" "}
              Total Spent
            </div>
            <div className="text-2xl font-bold mt-2">{formatVND(5000000)}</div>
          </div>
          <div className="w-[calc(50%-12px)] rounded-lg bg-white/20 backdrop-blur-sm p-4">
            <div className="text-sm font-medium">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-1" />{" "}
              Total Logs
            </div>
            <div className="text-2xl font-bold mt-2">12</div>
          </div>
        </div>
      </div>
    </>
  );
}
function ExpenseTracker() {
  return <DefaultLayout header={<Header />} body={<Body />} />;
}

export default ExpenseTracker;
