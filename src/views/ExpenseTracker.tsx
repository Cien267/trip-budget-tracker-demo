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
import { TripFormType, ExpenseFormType } from "@/types";
import { format } from "date-fns";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/utils";
import ExpensesSummary from "@/components/expenses/ExpensesSummary";
import ExpensesList from "@/components/expenses/list/ExpensesList";

function Header() {
  return (
    <>
      <FontAwesomeIcon icon={faMoneyBillWave} className="text-sky-500" />
      Expense Tracker
    </>
  );
}

function TabsSwitcher({
  activeTab,
  changeTab,
}: {
  activeTab: string;
  changeTab: (tab: any) => void;
}) {
  const tabs = [
    {
      name: "Expenses",
      code: "expense-tab",
    },
    {
      name: "Analytics",
      code: "analytics-tab",
    },
  ];
  return (
    <div className="w-full flex items-center justify-center p-8 pb-0">
      <ul className="flex gap-2 w-max bg-white p-1 rounded-full shadow-[0_2px_8px_-1px_rgba(6,81,237,0.4)]">
        {tabs.map((tab) => {
          return (
            <li
              onClick={() => changeTab(tab.code)}
              className={` font-semibold text-center text-[15px] py-3 px-6 rounded-full tracking-wide cursor-pointer ${activeTab === tab.code ? "bg-sky-600 text-white" : "hover:bg-sky-100 hover:text-sky-600"}`}
              key={tab.code}
            >
              {tab.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Body() {
  const trips = JSON.parse(localStorage.getItem("trip-budget-tracker") ?? "[]");
  let params = useParams();
  const currentTrip: TripFormType = trips.find(
    (trip: TripFormType) => trip.id === params.tripId,
  );

  let totalSpent = 0;
  currentTrip.expenses?.forEach((expense: ExpenseFormType) => {
    totalSpent += Number(expense.amount || 0);
  });

  const [activeTab, setActiveTab] = useState("expense-tab");
  return (
    <div>
      <ExpensesSummary
        currentTrip={currentTrip}
        totalSpent={totalSpent}
      ></ExpensesSummary>
      <TabsSwitcher
        activeTab={activeTab}
        changeTab={setActiveTab}
      ></TabsSwitcher>
      {activeTab === "expense-tab" ? (
        <ExpensesList currentTrip={currentTrip}></ExpensesList>
      ) : (
        ""
      )}
    </div>
  );
}
function ExpenseTracker() {
  return <DefaultLayout header={<Header />} body={<Body />} />;
}

export default ExpenseTracker;
