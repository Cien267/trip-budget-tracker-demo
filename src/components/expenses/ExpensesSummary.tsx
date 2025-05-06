import { TripFormType } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPeopleGroup,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils";

function ExpensesSummary({
  currentTrip,
  totalSpent,
}: {
  currentTrip: TripFormType;
  totalSpent: number;
}) {
  return (
    <div className="flex flex-col justify-center items-center py-4 px-8 mx-1 sm:mx-8 border rounded-lg shadow-md min-w-3xs sm:min-w-xs md:min-w-2xl lg:min-w-4xl bg-gradient-to-l from-green-300 to-blue-500 text-white">
      <div className="flex justify-between items-center w-full">
        <div className="font-black text-2xl text-start">{currentTrip.name}</div>
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
        {currentTrip.date.from && format(currentTrip.date.from, "LLL dd, y")} -{" "}
        {currentTrip.date.to && format(currentTrip.date.to, "LLL dd, y")}
      </div>
      <div className="w-full text-start text-sm font-semibold mt-2">
        <FontAwesomeIcon icon={faPeopleGroup} className="mr-2" />{" "}
        {currentTrip.participants}
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 w-full mt-4">
        <div className="w-full sm:w-[calc(50%-12px)] rounded-lg bg-white/20 backdrop-blur-sm p-4">
          <div className="text-sm font-medium">
            <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-1" /> Total
            Spent
          </div>
          <div className="text-2xl font-bold mt-2">{formatVND(totalSpent)}</div>
        </div>
        <div className="w-full sm:w-[calc(50%-12px)] rounded-lg bg-white/20 backdrop-blur-sm p-4">
          <div className="text-sm font-medium">
            <FontAwesomeIcon icon={faMoneyCheckDollar} className="mr-1" /> Total
            Logs
          </div>
          <div className="text-2xl font-bold mt-2">
            {currentTrip.expenses?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesSummary;
