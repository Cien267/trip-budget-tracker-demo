import {
  faUtensils,
  faTruckPlane,
  faHotel,
  faCartShopping,
  faGamepad,
  faBellConcierge,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

export const PAYMENT_METHODS = [
  "cash",
  "card",
  "digital-wallet",
  "other",
] as const;

export const TRIP_STATUSES = ["pending", "inprogress", "completed"] as const;

export const EXPENSE_CATEGORIES = [
  {
    name: "Food & Beverage",
    code: "food",
    description: "Restaurants, Cafes, Street food,...",
    icon: faUtensils,
    iconClass: "text-cyan-500",
    classes: "text-cyan-500 hover:bg-cyan-50 hover:border-cyan-200",
    activeClasses: "bg-cyan-50 border-cyan-200 scale-105 transition-all",
  },
  {
    name: "Transportation",
    code: "transportation",
    description: "Flights, Trains, Buses, Fuel,...",
    icon: faTruckPlane,
    iconClass: "text-emerald-500",
    classes: "text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200",
    activeClasses: "bg-emerald-50 border-emerald-200 scale-105 transition-all",
  },
  {
    name: "Accommodation",
    code: "accommodation",
    description: "Hotel, Hostel, Resort, Airbnb,...",
    icon: faHotel,
    iconClass: "text-sky-500",
    classes: "text-sky-500 hover:bg-sky-50 hover:border-sky-200",
    activeClasses: "bg-sky-50 border-sky-200 scale-105 transition-all",
  },
  {
    name: "Shopping",
    code: "shopping",
    description: "Gifts, Clothing, Accessories,...",
    icon: faCartShopping,
    iconClass: "text-violet-500",
    classes: "text-violet-500 hover:bg-violet-50 hover:border-violet-200",
    activeClasses: "bg-violet-50 border-violet-200 scale-105 transition-all",
  },
  {
    name: "Activities",
    code: "activities",
    description: "Festival, Entrance Fee, Movies,...",
    icon: faGamepad,
    iconClass: "text-fuchsia-500",
    classes: "text-fuchsia-500 hover:bg-fuchsia-50 hover:border-fuchsia-200",
    activeClasses: "bg-fuchsia-50 border-fuchsia-200 scale-105 transition-all",
  },
  {
    name: "Services",
    code: "services",
    description: "SIM, Mobile Data, Laundry,...",
    icon: faBellConcierge,
    iconClass: "text-amber-500",
    classes: "text-amber-500 hover:bg-amber-50 hover:border-amber-200",
    activeClasses: "bg-amber-50 border-amber-200 scale-105 transition-all",
  },
  {
    name: "Other",
    code: "other",
    description: "Other category",
    icon: faEllipsis,
    iconClass: "text-slate-500",
    classes: "text-slate-500 hover:bg-slate-50 hover:border-slate-200",
    activeClasses: "bg-slate-50 border-slate-200 scale-105 transition-all",
  },
];
