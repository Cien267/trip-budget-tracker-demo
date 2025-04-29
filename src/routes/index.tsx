import { createBrowserRouter } from "react-router"
import App from "@/views/App"
import CreateNewTrip from "@/views/CreateNewTrip"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/create-new-trip",
    Component: CreateNewTrip,
  },
])
