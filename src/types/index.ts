import { z } from "zod";

export const expenseFormSchema = z.object({
  id: z.string().optional(),
  paymentMethod: z.enum(["cash", "card", "digital-wallet", "other"]),
  amount: z.string(),
  category: z.string(),
  date: z.date(),
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
  status: z.enum(["pending", "inprogress", "completed"]).optional(),
  expenses: z.array(expenseFormSchema),
});

export type TripFormType = z.infer<typeof tripFormSchema>;
