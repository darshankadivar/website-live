import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/ProductsSlice";
import { fetchOrders } from "../features/orders/OrdersSlice";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items: products, loading: pLoading } = useSelector((s) => s.products);
  const { items: orders, loading: oLoading } = useSelector((s) => s.orders);

  useEffect(() => {
    if (!products?.length) dispatch(fetchProducts());
    if (!orders?.length) dispatch(fetchOrders());
  }, [dispatch]);

  // ----- Helpers -----
  const sumProductStock = (product) => {
    if (!product?.variants) return 0;
    return product.variants.reduce((acc, v) => {
      const sizeSum = (v.sizes || []).reduce((s, x) => s + Number(x.stock || 0), 0);
      return acc + sizeSum;
    }, 0);
  };

  const parseDateKey = (isoOrDate) => {
    const d = new Date(isoOrDate);
    if (isNaN(d.getTime())) return "Unknown";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  const safeNumber = (v) => (isNaN(Number(v)) ? 0 : Number(v));

  // ----- Calculations (directly without useMemo) -----
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + safeNumber(o.total), 0);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const lowStockCount = products.filter((p) => sumProductStock(p) <= 5).length;

  const byDate = {};
  orders.forEach((o) => {
    const key = parseDateKey(o.date);
    byDate[key] = (byDate[key] || 0) + safeNumber(o.total);
  });
  const salesTrend = Object.entries(byDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const statusDist = statuses.map((st) => ({
    name: st,
    value: orders.filter((o) => o.status === st).length,
  }));

  const stockBars = [...products]
    .map((p) => ({ name: p.name, stock: sumProductStock(p) }))
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 8);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const loading = pLoading || oLoading;

  const PIE_COLORS = ["#F59E0B", "#3B82F6", "#8B5CF6", "#10B981"];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Business overview & insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} />
        <KpiCard title="Total Orders" value={totalOrders} />
        <KpiCard title="Pending Orders" value={pendingCount} />
        <KpiCard title="Low Stock Products" value={lowStockCount} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Sales Trend */}
        <ChartCard title="Sales Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#2563EB" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Order Status */}
        <ChartCard title="Order Status">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusDist}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusDist.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Stock Availability */}
        <ChartCard title="Stock Availability (Top Products)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stockBars}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-xl shadow"
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="text-sm text-gray-500">Latest 5 orders</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {!recentOrders.length && !loading && (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={5}>
                    No recent orders found.
                  </td>
                </tr>
              )}

              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">#{o.id}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">₹{safeNumber(o.total).toLocaleString("en-IN")}</td>
                  <td className="p-3">
                    <span
                      className={[
                        "px-2 py-1 rounded text-xs font-medium",
                        o.status === "Pending" && "bg-yellow-100 text-yellow-700",
                        o.status === "Confirmed" && "bg-blue-100 text-blue-700",
                        o.status === "Shipped" && "bg-purple-100 text-purple-700",
                        o.status === "Delivered" && "bg-green-100 text-green-700",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {o.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    {o.date
                      ? new Date(o.date).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}

              {loading && (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={5}>
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-xl p-4 shadow flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl md:text-2xl font-semibold">{value}</p>
      </div>
      <div className="text-gray-300 text-3xl">▦</div>
    </motion.div>
  );
}

function ChartCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-xl shadow p-4"
    >
      <div className="mb-2">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      </div>
      <div className="h-[280px]">{children}</div>
    </motion.div>
  );
}
