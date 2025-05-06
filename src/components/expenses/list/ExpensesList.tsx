import { TripFormType, ExpenseFormType, GroupedExpense } from "@/types";
import { format, parse, compareDesc } from "date-fns";
import ExpenseCard from "@/components/expenses/list/ExpenseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { formatVND } from "@/utils";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/constants";
import { useState, useMemo } from "react";

const transformListExpense = (expenses: ExpenseFormType[]) => {
  const grouped = expenses.reduce(
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

  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const dateA = parse(a, "yyyy-MM-dd", new Date());
    const dateB = parse(b, "yyyy-MM-dd", new Date());
    return compareDesc(dateA, dateB);
  });

  const sortedData: { [key: string]: GroupedExpense } = {};
  sortedKeys.forEach((key) => {
    sortedData[key] = grouped[key];
  });

  return sortedData;
};

function ExpensesList({
  currentTrip,
  onDeleteExpense,
}: {
  currentTrip: TripFormType;
  onDeleteExpense: (id: string) => void;
}) {
  let navigate = useNavigate();
  const groupedExpenses = transformListExpense(currentTrip.expenses || []);

  const handleDeleteExpense = (id: string | undefined) => {
    if (!id) return;
    onDeleteExpense(id);
  };

  const handleEditExpense = (id: string | undefined) => {
    if (!id) return;
    navigate(`/${currentTrip.id}/expenses/${id}/edit`);
  };

  // handle search/filter
  const categories = JSON.parse(JSON.stringify(EXPENSE_CATEGORIES));
  categories.unshift({
    name: "All Categories",
    code: "all",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterByCategory = (value: string) => {
    setSelectedCategory(value);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredExpenses = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return Object.keys(groupedExpenses)
      .sort((a, b) => {
        const dateA = parse(a, "yyyy-MM-dd", new Date());
        const dateB = parse(b, "yyyy-MM-dd", new Date());
        return compareDesc(dateA, dateB);
      })
      .reduce((acc: { [key: string]: GroupedExpense }, date) => {
        const items = groupedExpenses[date].items.filter((item) => {
          const matchesCategory =
            selectedCategory === "all" || item.category === selectedCategory;
          const matchesSearch =
            searchQuery === "" ||
            item?.note?.toLowerCase().includes(lowerCaseQuery);
          return matchesCategory && matchesSearch;
        });

        if (items.length > 0) {
          acc[date] = {
            items,
            totalAmount: items.reduce(
              (sum, item) => sum + parseFloat(item.amount),
              0,
            ),
            totalLogs: items.length,
          };
        }

        return acc;
      }, {});
  }, [groupedExpenses, selectedCategory]);

  return (
    <>
      <div className="flex justify-between items-center gap-8 mt-8 mx-8">
        <Input
          type="text"
          placeholder="Search expenses"
          onChange={handleSearchChange}
        />
        <Select defaultValue="all" onValueChange={handleFilterByCategory}>
          <SelectTrigger className="w-3xs">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((cat: { name: string; code: string }) => {
                return (
                  <SelectItem value={cat.code} key={cat.code}>
                    {cat.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="min-w-3xs sm:min-w-xs md:min-w-2xl lg:min-w-4xl">
        {Object.entries(filteredExpenses).length === 0 ? (
          <div className="w-full text-center p-8 text-slate-400">Empty</div>
        ) : (
          Object.entries(filteredExpenses).map(
            ([date, { items, totalAmount, totalLogs }]) => (
              <div className="p-4 pt-8 sm:p-8" key={date}>
                <div className="flex flex-col sm:flex-row justify-between items-center pb-8">
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-sky-500"
                    />{" "}
                    <span className="font-bold text-slate-600 text-lg ml-2">
                      {format(date, "EEEE, LLL dd, y")}
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
                <div className="flex flex-col sm:flex-row flex-wrap justify-start items-center gap-4">
                  {items.map((item) => {
                    return (
                      <ExpenseCard
                        expense={item}
                        onEditExpense={handleEditExpense}
                        onDeleteExpense={handleDeleteExpense}
                        key={item.id}
                      ></ExpenseCard>
                    );
                  })}
                </div>
              </div>
            ),
          )
        )}
      </div>
    </>
  );
}

export default ExpensesList;
