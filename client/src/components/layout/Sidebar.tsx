import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white/70 backdrop-blur-xl border-r border-green-100 p-5">
      <h1 className="text-2xl font-bold text-emerald-600 mb-8">✈ SkyBook</h1>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          className="block text-gray-600 hover:text-emerald-600"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/flights"
          className="block text-gray-600 hover:text-emerald-600"
        >
          ✈ Flights
        </NavLink>

        <NavLink
          to="/dashboard/bookings"
          className="block text-gray-600 hover:text-emerald-600"
        >
          🎫 Bookings
        </NavLink>

        <NavLink
          to="/dashboard/customers"
          className="block text-gray-600 hover:text-emerald-600"
        >
          👤 Customers
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className="block text-gray-600 hover:text-emerald-600"
        >
          📈 Reports
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className="block text-gray-600 hover:text-emerald-600"
        >
          ⚙ Settings
        </NavLink>
      </nav>
    </div>
  );
}
