export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Dashboard Overview
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/70 p-5 rounded-2xl shadow border border-green-100">
          <h2 className="text-gray-500">Total Flights</h2>
          <p className="text-2xl font-bold text-emerald-600">120</p>
        </div>

        <div className="bg-white/70 p-5 rounded-2xl shadow border border-green-100">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-2xl font-bold text-emerald-600">340</p>
        </div>

        <div className="bg-white/70 p-5 rounded-2xl shadow border border-green-100">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold text-emerald-600">$12,500</p>
        </div>
      </div>
    </div>
  );
}
