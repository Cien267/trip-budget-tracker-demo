import { TripFormType, ExpenseFormType, GroupedExpense } from "@/types";
import { format } from "date-fns";
import ExpenseCard from "@/components/expenses/list/ExpenseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCreditCard,
  faUser,
  faCalendarDays,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { formatVND } from "@/utils";

function ExpensesList({ currentTrip }: { currentTrip: TripFormType }) {
  const expenses = currentTrip.expenses || [];
  const groupedExpenses = expenses.reduce(
    (acc: { [key: string]: GroupedExpense }, item: ExpenseFormType) => {
      const date = format(new Date(item.date ?? ""), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = { items: [], totalAmount: 0, totalLogs: 0 };
      }
      acc[date].items.push(item);
      acc[date].totalAmount += parseFloat(item.amount) || 0;
      acc[date].totalLogs += 1;
      return acc;
    },
    {},
  );

  return (
    <div className="min-w-lg sm:min-w-2xl md:min-w-4xl lg:min-w-5xl">
      {Object.entries(groupedExpenses).map(
        ([date, { items, totalAmount, totalLogs }]) => (
          <div className="p-8" key={date}>
            <div className="flex justify-between items-center pb-8">
              <div>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-sky-500"
                />{" "}
                <span className="font-bold text-slate-600 text-lg ml-2">
                  {format(date, "LLL dd, y")}
                </span>
              </div>
              <div>
                <span className="text-sm text-slate-400 font-normal">
                  <b>{totalLogs}</b> expenses{" "}
                </span>
                <span className="ml-2 font-bold text-lg text-sky-600">
                  {formatVND(totalAmount)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-start items-center gap-4">
              {items.map((item) => {
                return <ExpenseCard expense={item}></ExpenseCard>;
              })}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export default ExpensesList;
