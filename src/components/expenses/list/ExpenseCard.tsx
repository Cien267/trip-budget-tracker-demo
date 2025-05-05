import { ExpenseFormType } from "@/types";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faUser,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { formatVND } from "@/utils";

function ExpenseCard({ expense }: { expense: ExpenseFormType }) {
  console.log(expense);
  const matchingCategory = EXPENSE_CATEGORIES.find(
    (cat) => cat.code === expense.category,
  );
  if (!matchingCategory) return;

  const matchingPaymentMethod = PAYMENT_METHODS.find(
    (method) => method.code === expense.paymentMethod,
  );
  if (!matchingPaymentMethod) return;

  return (
    <div className="min-w-[calc(33%-16px)] max-w-1/3 rounded-lg border bg-card text-card-foreground group overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg">
      <div className={`h-1 w-full ${matchingCategory.bgClass}`}></div>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={matchingCategory.icon}
              className={matchingCategory.iconClass}
            />
            <span className="font-medium">{matchingCategory.name}</span>
          </div>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-orange-100 text-orange-700"
            data-v0-t="badge"
          >
            {formatVND(Number(expense.amount))}
          </div>
        </div>
        <p className="mb-2 text-sm text-slate-700 break-words">
          {expense.note}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCreditCard} className="text-slate-400" />
            {matchingPaymentMethod.name}
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUser} className="text-slate-400" />
            {expense.paymentBy}
          </div>
        </div>
        <div className="mt-3 flex justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md h-8 w-8 p-0">
            <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
            <span className="sr-only">More options</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
