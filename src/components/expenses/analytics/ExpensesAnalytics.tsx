import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { TripFormType, ExpenseFormType } from "@/types";
import { EXPENSE_CATEGORIES } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatVND } from "@/utils";

type GroupedExpense = {
  totalAmount: number;
};

function ExpensesAnalytics({ currentTrip }: { currentTrip: TripFormType }) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const groupedExpenses = currentTrip?.expenses?.reduce(
    (acc: { [key: string]: GroupedExpense }, item: ExpenseFormType) => {
      const cat = item.category ?? "";
      if (!acc[cat]) {
        acc[cat] = { totalAmount: 0 };
      }
      acc[cat].totalAmount += parseFloat(item.amount) || 0;
      return acc;
    },
    {},
  );
  if (!groupedExpenses) return;
  const totalSum = Object.values(groupedExpenses).reduce(
    (sum, { totalAmount }) => sum + totalAmount,
    0,
  );

  const transformedData = Object.entries(groupedExpenses).map(
    ([name, { totalAmount }]) => {
      const matchingCategory = EXPENSE_CATEGORIES.find(
        (cat) => cat.code === name,
      );
      return {
        name: matchingCategory?.name || name,
        value: totalAmount,
        percent: totalSum > 0 ? Math.round((totalAmount / totalSum) * 100) : 0,
        color: matchingCategory?.color,
        icon: matchingCategory?.icon,
        iconClass: matchingCategory?.iconClass,
        dotClass: matchingCategory?.bgClassCircle,
      };
    },
  );
  const percentSum = transformedData.reduce(
    (sum, item) => sum + item.percent,
    0,
  );

  if (percentSum !== 100 && transformedData.length > 0) {
    const maxItem = transformedData.reduce((max, item) =>
      item.value > max.value ? item : max,
    );
    maxItem.percent += 100 - percentSum;
  }

  return (
    <div className="flex">
      <ChartContainer config={chartConfig} className="w-1/2">
        <PieChart width={400} height={400}>
          <Pie
            data={transformedData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={160}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {transformedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
      <div className="w-1/2 p-8">
        {transformedData.map((item) => {
          if (!item.icon) return;
          return (
            <div
              key={item.name}
              className="flex justify-between items-center rounded-lg border py-2 px-4 my-4"
            >
              <div className="flex justify-start items-center gap-2">
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${item.iconClass} w-4`}
                />
                <span className="font-semibold">{item.name}</span>
              </div>
              <div className="flex justify-end items-center gap-4">
                <div className="flex justify-end items-end flex-col">
                  <span className="font-semibold text-sky-500">
                    {formatVND(item.value)}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {item.percent}%
                  </span>
                </div>
                <div className={`${item.dotClass} rounded-full h-6 w-6`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpensesAnalytics;
