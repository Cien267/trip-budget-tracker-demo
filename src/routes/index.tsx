import { createBrowserRouter } from "react-router";
import App from "@/views/App";
import CreateNewTrip from "@/views/CreateNewTrip";
import ExpenseTracker from "@/views/ExpenseTracker";
import CreateExpense from "@/views/CreateExpense";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/create-new-trip",
    Component: CreateNewTrip,
  },
  {
    path: "/:tripId/expenses",
    Component: ExpenseTracker,
  },
  {
    path: "/:tripId/expenses/create",
    Component: CreateExpense,
  },
]);
