import { useEffect, createContext, ReactNode, useContext, useReducer } from 'react';
import { ExpenseFormType, TripFormType } from "@/types";

type ExpenseAction =
  | { type: 'ADD_EXPENSE'; payload: ExpenseFormType }
  | { type: 'DELETE_EXPENSE'; payload: { id: string } }
  | { type: 'UPDATE_EXPENSE'; payload: ExpenseFormType & { id: string } };

type ExpenseState = ExpenseFormType[];

interface ExpensesContextType {
  expenses: ExpenseState;
}

interface ExpensesDispatchContextType {
  dispatch: React.Dispatch<ExpenseAction>;
}

const ExpensesContext = createContext<ExpensesContextType | null>(null);
const ExpensesDispatchContext = createContext<ExpensesDispatchContextType | null>(null);

const getInitialExpenses = (tripId: string): ExpenseState => {
  try {
    const trips: TripFormType[] = JSON.parse(localStorage.getItem('trip-budget-tracker') || '[]');
    const currentTrip = trips.find((trip) => trip.id === tripId);
    return currentTrip?.expenses || [];
  } catch (error) {
    console.error('Failed to parse trips from localStorage:', error);
    return [];
  }
};

const updateTripExpenses = (tripId: string, expenses: ExpenseState) => {
  try {
    const trips: TripFormType[] = JSON.parse(localStorage.getItem('trip-budget-tracker') || '[]');
    const updatedTrips = trips.map((trip) =>
      trip.id === tripId ? { ...trip, expenses } : trip
    );
    localStorage.setItem('trip-budget-tracker', JSON.stringify(updatedTrips));
  } catch (error) {
    console.error('Failed to update localStorage:', error);
  }
};

function expensesReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      const newState = [...state, action.payload];
      return newState;
    }
    case 'UPDATE_EXPENSE': {
      const newState = state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      );
      return newState;
    }
    case 'DELETE_EXPENSE': {
      const newState = state.filter((expense) => expense.id !== action.payload.id);
      return newState;
    }
    default: {
      throw new Error(`Unknown action type: ${(action as any).type}`);
    }
  }
}

export function ExpensesProvider({ children, tripId }: { children: ReactNode; tripId: string }) {
  const [expenses, dispatch] = useReducer(expensesReducer, getInitialExpenses(tripId));

  useEffect(() => {
    updateTripExpenses(tripId, expenses);
  }, [tripId, expenses]);

  return (
    <ExpensesContext.Provider value={{ expenses }}>
      <ExpensesDispatchContext.Provider value={{ dispatch }}>
        {children}
      </ExpensesDispatchContext.Provider>
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === null) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
}

export function useExpensesDispatch() {
  const context = useContext(ExpensesDispatchContext);
  if (context === null) {
    throw new Error('useExpensesDispatch must be used within an ExpensesProvider');
  }
  return context.dispatch;
}