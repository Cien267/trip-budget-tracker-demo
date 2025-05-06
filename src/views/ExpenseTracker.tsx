import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/layouts/DefaultLayout";
import { TripFormType } from "@/types";
import { useParams } from "react-router";
import ExpensesSummary from "@/components/expenses/ExpensesSummary";
import ExpensesList from "@/components/expenses/list/ExpensesList";
import ExpensesAnalytics from "@/components/expenses/analytics/ExpensesAnalytics";
import { toast } from "sonner";

function Header() {
  return (
    <>
      <FontAwesomeIcon
        icon={faMoneyBillWave}
        className="text-sky-500 !hidden sm:!block"
      />
      Expense Tracker
    </>
  );
}

function TabsSwitcher({
  activeTab,
  changeTab,
}: {
  activeTab: string;
  changeTab: (tab: string) => void;
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
  const [trips, setTrips] = useState<TripFormType[]>(() => {
    return JSON.parse(localStorage.getItem("trip-budget-tracker") ?? "[]");
  });

  const params = useParams<{ tripId: string }>();

  const currentTrip = useMemo(() => {
    return (
      trips.find((trip: TripFormType) => trip.id === params.tripId) || {
        id: params.tripId || "",
        name: "Unknown Trip",
        description: "",
        date: { from: undefined, to: undefined },
        participants: "",
        status: "unknown",
        expenses: [],
      }
    );
  }, [trips, params.tripId]);

  const totalSpent = useMemo(() => {
    return (currentTrip.expenses || []).reduce((sum, expense) => {
      return sum + (Number(expense.amount) || 0);
    }, 0);
  }, [currentTrip.expenses]);

  const handleDeleteExpense = (expenseId: string) => {
    setTrips((prevTrips) => {
      const updatedTrips = prevTrips.map((trip) => {
        if (trip.id === params.tripId) {
          return {
            ...trip,
            expenses: (trip.expenses || []).filter(
              (expense) => expense.id !== expenseId,
            ),
          };
        }
        return trip;
      });

      localStorage.setItem("trip-budget-tracker", JSON.stringify(updatedTrips));

      return updatedTrips;
    });

    toast.success("Expense has been deleted");
  };

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
        <ExpensesList
          currentTrip={currentTrip}
          onDeleteExpense={handleDeleteExpense}
        ></ExpensesList>
      ) : (
        <ExpensesAnalytics currentTrip={currentTrip}></ExpensesAnalytics>
      )}
    </div>
  );
}
function ExpenseTracker() {
  return <DefaultLayout header={<Header />} body={<Body />} urlBack="/" />;
}

export default ExpenseTracker;
