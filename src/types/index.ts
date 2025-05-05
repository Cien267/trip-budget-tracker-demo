import { z } from "zod";
import {
  PAYMENT_METHODS,
  TRIP_STATUSES,
  EXPENSE_CATEGORIES,
} from "@/constants";

const CATEGORY_CODES = EXPENSE_CATEGORIES.map((category) => category.code) as [
  string,
  ...string[],
];

const PAYMENT_CODES = PAYMENT_METHODS.map((payment) => payment.code) as [
  string,
  ...string[],
];

const TRIP_STATUS_CODES = TRIP_STATUSES.map((status) => status.code) as [
  string,
  ...string[],
];

export const expenseFormSchema = z.object({
  id: z.string().optional(),
  paymentMethod: z.enum(PAYMENT_CODES),
  amount: z.string().min(1, "Amount is required"),
  category: z.enum(CATEGORY_CODES, {
    message: "Please select a valid category",
  }),
  date: z.date().optional(),
  note: z.string().optional(),
  paymentBy: z.string().optional(),
});

export type ExpenseFormType = z.infer<typeof expenseFormSchema>;

export const tripFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(100),
  description: z.string().max(300),
  date: z.object({ from: z.date().optional(), to: z.date().optional() }),
  participants: z.string(),
  status: z.enum(TRIP_STATUS_CODES).optional(),
  expenses: z.array(expenseFormSchema).optional(),
});

export type TripFormType = z.infer<typeof tripFormSchema>;

export type GroupedExpense = {
  items: ExpenseFormType[];
  totalAmount: number;
  totalLogs: number;
};
