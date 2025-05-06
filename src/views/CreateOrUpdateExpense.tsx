import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCreditCard,
  faUser,
  faCalendarDays,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import { ExpenseFormType, expenseFormSchema, TripFormType } from "@/types";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "@/constants";
import { useParams } from "react-router";
import { useMemo, useEffect } from "react";

function Header() {
  return <>New Expense</>;
}

function Body() {
  const [date, setDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState("");

  let navigate = useNavigate();

  let params = useParams();
  const tripId = params.tripId ?? null;
  const expenseId = params.expenseId ?? null;

  const trips = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("trip-budget-tracker") ?? "[]",
      ) as TripFormType[];
    } catch {
      return [];
    }
  }, []);

  const currentTrip = useMemo(() => {
    return (
      trips.find((trip: TripFormType) => trip.id === tripId) || {
        id: tripId || "",
        name: "Unknown Trip",
        description: "",
        date: { from: undefined, to: undefined },
        participants: "",
        status: "unknown",
        expenses: [],
      }
    );
  }, [trips, tripId]);

  const beingUpdatedExpense = useMemo(() => {
    if (expenseId && currentTrip.expenses) {
      return currentTrip.expenses.find(
        (expense: ExpenseFormType) => expense.id === expenseId,
      );
    }
    return null;
  }, [expenseId, currentTrip.expenses]);

  useEffect(() => {
    const newDate = beingUpdatedExpense?.date
      ? new Date(beingUpdatedExpense.date)
      : undefined;
    if (
      (newDate && !date) ||
      (!newDate && date) ||
      (newDate && date && newDate.getTime() !== date.getTime())
    ) {
      setDate(newDate);
    }

    if (beingUpdatedExpense && beingUpdatedExpense.category) {
      handleSelectCategory(beingUpdatedExpense.category);
    }
  }, [beingUpdatedExpense]);

  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: useMemo(
      () => ({
        id: beingUpdatedExpense?.id || uuidv4(),
        paymentMethod: beingUpdatedExpense?.paymentMethod || "cash",
        amount: beingUpdatedExpense?.amount || "",
        category: beingUpdatedExpense?.category || "",
        date: beingUpdatedExpense?.date
          ? new Date(beingUpdatedExpense.date)
          : undefined,
        note: beingUpdatedExpense?.note || "",
        paymentBy: beingUpdatedExpense?.paymentBy || "",
      }),
      [beingUpdatedExpense],
    ),
  });

  const { setValue, trigger } = form;
  const handleSelectCategory = async (categoryCode: string) => {
    setSelectedCategory(categoryCode);
    setValue("category", categoryCode, { shouldValidate: true });
    await trigger("category");
  };

  const onSubmit = (values: ExpenseFormType) => {
    try {
      values.date = date ? date : new Date();

      const index = trips.findIndex((trip: TripFormType) => trip.id === tripId);
      if (index !== -1) {
        if (trips[index].expenses) {
          if (beingUpdatedExpense) {
            const indexExpense = trips[index].expenses.findIndex(
              (expense: ExpenseFormType) =>
                expense.id === beingUpdatedExpense.id,
            );
            trips[index].expenses[indexExpense] = values;
          } else {
            trips[index].expenses.push(values);
          }
        } else {
          trips[index].expenses = [values];
        }
        localStorage.setItem("trip-budget-tracker", JSON.stringify(trips));
      }

      navigate(`/${params.tripId}/expenses`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mb-12 mx-8">
          <CardContent className="min-w-xs sm:min-w-2xl md:max-w-4xl lg:max-w-7xl">
            <div className="grid w-full items-center gap-8">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          className="text-sky-500"
                        />{" "}
                        Amount
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Amount" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FontAwesomeIcon
                          icon={faDollarSign}
                          className="text-lime-500"
                        />{" "}
                        Category
                      </FormLabel>
                      <div className="flex flex-wrap flex-col sm:flex-row justify-start items-center gap-4">
                        {EXPENSE_CATEGORIES.map((item) => {
                          return (
                            <div
                              onClick={() => handleSelectCategory(item.code)}
                              key={item.code}
                              className={`flex justify-center items-center flex-col gap-2 border rounded-lg py-4 px-8 cursor-pointer font-semibold hover:shadow-sm w-full md:max-w-[calc(25%-16px)] ${item.classes} ${selectedCategory === item.code ? item.activeClasses : ""}`}
                            >
                              <FontAwesomeIcon
                                icon={item.icon}
                                className={item.iconClass}
                              />
                              <span>{item.name}</span>
                              <span className="text-xs text-slate-400 font-light">
                                {item.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FontAwesomeIcon
                          icon={faCreditCard}
                          className="text-amber-500"
                        />{" "}
                        Payment Method
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="paymentMethod" className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {PAYMENT_METHODS.map((method) => {
                              return (
                                <SelectItem
                                  value={method.code}
                                  key={method.code}
                                >
                                  {method.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="paymentBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-emerald-500"
                        />{" "}
                        Payment By
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="who pay for this" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Date">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-fuchsia-500"
                  />{" "}
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FontAwesomeIcon
                          icon={faNoteSticky}
                          className="text-cyan-500"
                        />{" "}
                        Note
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(`/${tripId}/expenses`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {beingUpdatedExpense ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
function CreateOrUpdateExpense() {
  let params = useParams();
  const tripId = params.tripId ?? null;

  return (
    <DefaultLayout
      header={<Header />}
      body={<Body />}
      urlBack={`/${tripId}/expenses`}
    />
  );
}

export default CreateOrUpdateExpense;
