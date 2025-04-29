import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router"
import DefaultLayout from "@/layouts/DefaultLayout"

function Header() {
  return (
    <>
      <FontAwesomeIcon icon={faPlaneDeparture} className="text-sky-500" />
      Trip Expense Tracker
    </>
  )
}
function Body() {
  return (
    <>
      <div className="flex justify-center items-center gap-4 p-4 border rounded-lg shadow-md">
        <div>
          <div className="font-bold text-sky-600 text-lg">Create New Trip</div>
          <div className="text-xs font-normal text-gray-400">
            Start planning your next adventure
          </div>
        </div>
        <NavLink to="/create-new-trip" end>
          <button
            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
            title="Add New"
          >
            <svg
              className="stroke-cyan-500 fill-none group-hover:fill-cyan-100 group-active:stroke-cyan-200 group-active:fill-cyan-600 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="60px"
              width="60px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 px-10 pt-4">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-emerald-600 text-lg">Recent Trips</div>
          <div className="text-xs font-normal text-gray-400">
            Start planning your next adventure
          </div>
        </div>
        <div className="flex flex-wrap justify-start items-center gap-4 p-4 rounded-lg max-w-7xl">
          <div className="border border-emerald-200 rounded-lg flex justify-between items-start p-4 min-w-md hover:shadow-md cursor-pointer hover:-translate-y-0.5">
            <div className="flex flex-col justify-start">
              <div className="font-bold text-md text-slate-600">
                Trip to Sai Gon
              </div>
              <div className="text-sm text-gray-400">May 8 - May 11, 2025</div>
            </div>
            <div>
              <span className="text-xs rounded-lg py-1 px-2 font-semibold text-emerald-600 bg-emerald-100 border border-emerald-200">
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <DefaultLayout header={<Header />} body={<Body />} showBackButton={false} />
  )
}

export default App
