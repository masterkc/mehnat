"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  TrendingUp,
  Banknote,
  Shield,
  Zap,
  Send,
  Eye,
  Lock,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// --- Colors ---
const NAVY_900 = "#0D1117";
const NAVY_800 = "#161B22";
const NAVY_700 = "#21262D";
const NAVY_600 = "#30363D";
const ACCENT_PURPLE = "#A855F7";
const ACCENT_GREEN = "#238636";
const ACCENT_BLUE = "#58A6FF";

// --- Mock data generators ---
function generateChartData() {
  const data: {
    date: string;
    actual?: number;
    predicted?: number;
    confidenceUpper?: number;
    confidenceLower?: number;
  }[] = [];
  const today = new Date();

  // Last 30 days — actual earnings
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      actual: Math.floor(Math.random() * 500 + 400),
    });
  }

  // Next 14 days — predicted
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const base = Math.floor(Math.random() * 200 + 500);
    data.push({
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      predicted: base,
      confidenceUpper: base + 80,
      confidenceLower: base - 80,
    });
  }

  return data;
}

const chartData = generateChartData();

// --- Animated counter hook ---
function useCountUp(target: number, duration: number = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

// --- Framer motion variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// --- Custom tooltip for chart ---
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; color: string; value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm"
      style={{
        background: NAVY_800,
        borderColor: NAVY_600,
        color: "#e6edf3",
      }}
    >
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey === "actual" ? "Actual" : "Predicted"}: ₹{p.value}
        </p>
      ))}
    </div>
  );
}

// --- Transactions data ---
const transactions = [
  {
    platform: "Swiggy",
    desc: "Swiggy payout",
    amount: 287,
    time: "11:42 AM",
    color: "#FF5722",
    type: "credit" as const,
  },
  {
    platform: "Petrol",
    desc: "Petrol",
    amount: 120,
    time: "9:30 AM",
    color: "#F44336",
    type: "debit" as const,
  },
  {
    platform: "Food",
    desc: "Tea + breakfast",
    amount: 45,
    time: "8:15 AM",
    color: "#FF9800",
    type: "debit" as const,
  },
  {
    platform: "Zomato",
    desc: "Zomato payout",
    amount: 340,
    time: "Yesterday 8:30 PM",
    color: "#E23744",
    type: "credit" as const,
  },
  {
    platform: "Rapido",
    desc: "Rapido payout",
    amount: 180,
    time: "Yesterday 6:15 PM",
    color: "#FFCA28",
    type: "credit" as const,
  },
];

// --- Main page ---
export default function DashboardPage() {
  const safeSpend = useCountUp(420, 1500);

  // Live ticker for today's earnings
  const [todayEarnings, setTodayEarnings] = useState(287);
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayEarnings((prev) => prev + Math.floor(Math.random() * 3 + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen pt-20 pb-24 md:pb-8 px-4 md:px-8"
      style={{ background: NAVY_900, color: "#e6edf3" }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== 1. HERO CARD ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl border p-8"
          style={{
            background: `linear-gradient(135deg, ${NAVY_800} 0%, rgba(168,85,247,0.06) 50%, rgba(35,134,54,0.08) 100%)`,
            borderColor: NAVY_600,
          }}
        >
          <p className="text-gray-400 text-sm mb-1">Aaj ka safe kharcha</p>
          <p className="text-6xl font-bold" style={{ color: ACCENT_GREEN }}>
            ₹{safeSpend}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            94% confidence &middot; Based on ₹19,400 predicted this month
          </p>
          <div className="flex gap-3 mt-5">
            <button
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white/5"
              style={{ borderColor: NAVY_600, color: "#e6edf3" }}
            >
              <SlidersHorizontal size={16} />
              Override
            </button>
            <button
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white/5"
              style={{ borderColor: NAVY_600, color: "#e6edf3" }}
            >
              <RefreshCw size={16} />
              Recalculate
            </button>
          </div>
        </motion.div>

        {/* ===== 2. FOUR STAT CARDS ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <IndianRupee size={20} style={{ color: ACCENT_GREEN }} />,
              label: "Today's earnings so far",
              value: `₹${todayEarnings}`,
              color: ACCENT_GREEN,
            },
            {
              icon: <TrendingUp size={20} style={{ color: ACCENT_GREEN }} />,
              label: "This week saved",
              value: "₹1,240",
              color: ACCENT_GREEN,
            },
            {
              icon: <Banknote size={20} style={{ color: ACCENT_BLUE }} />,
              label: "Loan eligible",
              value: "₹8,500",
              color: ACCENT_BLUE,
            },
            {
              icon: <Shield size={20} style={{ color: ACCENT_GREEN }} />,
              label: "Insurance status",
              value: "Active ✓",
              color: ACCENT_GREEN,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-6"
              style={{ background: NAVY_800, borderColor: NAVY_600 }}
            >
              <div className="mb-3">{card.icon}</div>
              <p className="text-2xl font-bold" style={{ color: card.color }}>
                {card.value}
              </p>
              <p className="text-sm text-gray-400 mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ===== 3. EARNINGS CHART ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl border p-6"
          style={{ background: NAVY_800, borderColor: NAVY_600 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            Aapki Kamai &mdash; Pichhle 30 din
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT_PURPLE} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={ACCENT_PURPLE} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT_PURPLE} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={ACCENT_PURPLE} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={NAVY_600} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#8b949e", fontSize: 12 }}
                axisLine={{ stroke: NAVY_600 }}
                tickLine={false}
                interval={5}
              />
              <YAxis
                tick={{ fill: "#8b949e", fontSize: 12 }}
                axisLine={{ stroke: NAVY_600 }}
                tickLine={false}
                tickFormatter={(v: number) => `₹${v}`}
              />
              <Tooltip content={<ChartTooltip />} />

              {/* Confidence band */}
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stroke="none"
                fill="url(#gradConfidence)"
                fillOpacity={1}
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stroke="none"
                fill={NAVY_800}
                fillOpacity={1}
                connectNulls={false}
              />

              {/* Actual earnings */}
              <Area
                type="monotone"
                dataKey="actual"
                stroke={ACCENT_PURPLE}
                strokeWidth={2}
                fill="url(#gradPurple)"
                fillOpacity={1}
                connectNulls={false}
              />

              {/* Predicted earnings */}
              <Area
                type="monotone"
                dataKey="predicted"
                stroke={ACCENT_PURPLE}
                strokeWidth={2}
                strokeDasharray="6 4"
                fill="none"
                connectNulls={false}
              />

              {/* Annotations */}
              <ReferenceLine
                x={chartData[8]?.date}
                stroke={ACCENT_GREEN}
                strokeDasharray="4 4"
                label={{
                  value: "Diwali week +35%",
                  position: "top",
                  fill: ACCENT_GREEN,
                  fontSize: 11,
                }}
              />
              <ReferenceLine
                x={chartData[22]?.date}
                stroke="#F85149"
                strokeDasharray="4 4"
                label={{
                  value: "Rainy Monday -40%",
                  position: "top",
                  fill: "#F85149",
                  fontSize: 11,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ===== 4. THREE COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — Recent activity */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border p-6"
            style={{ background: NAVY_800, borderColor: NAVY_600 }}
          >
            <h2 className="text-lg font-semibold mb-4">Aapki activity</h2>
            <div className="space-y-4">
              {transactions.map((tx, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: tx.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.time}</p>
                  </div>
                  <span
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{
                      color: tx.type === "credit" ? ACCENT_GREEN : "#F85149",
                    }}
                  >
                    {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MIDDLE — Quick actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border p-6"
            style={{ background: NAVY_800, borderColor: NAVY_600 }}
          >
            <h2 className="text-lg font-semibold mb-4">Jaldi karo</h2>
            <div className="space-y-3">
              {[
                {
                  icon: <Zap size={20} style={{ color: "#FFCA28" }} />,
                  text: "Loan chahiye? ₹8,500 eligible",
                },
                {
                  icon: <Shield size={20} style={{ color: ACCENT_GREEN }} />,
                  text: "Insurance claim karo",
                },
                {
                  icon: <Send size={20} style={{ color: ACCENT_BLUE }} />,
                  text: "Ghar paise bhejo",
                },
                {
                  icon: <Eye size={20} style={{ color: ACCENT_PURPLE }} />,
                  text: "Allowance dekho",
                },
              ].map((action, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg p-4 cursor-pointer transition-colors"
                  style={{ background: NAVY_700 }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = NAVY_600)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = NAVY_700)
                  }
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Savings goal teaser */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border p-6 relative overflow-hidden"
            style={{ background: NAVY_800, borderColor: NAVY_600 }}
          >
            <h2 className="text-lg font-semibold mb-4">
              Coming in V2 &mdash; My Buckets
            </h2>

            {/* Blurred content */}
            <div className="space-y-4 blur-sm opacity-60 select-none">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Ghar ke liye</span>
                  <span>₹6,000 &middot; Monthly</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: NAVY_700 }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "65%", background: ACCENT_PURPLE }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bike repair fund</span>
                  <span>₹2,400 / ₹5,000</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: NAVY_700 }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "48%", background: ACCENT_GREEN }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Emergency</span>
                  <span>2.3 months saved</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: NAVY_700 }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "38%", background: ACCENT_BLUE }}
                  />
                </div>
              </div>
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Lock size={32} className="text-gray-500 mb-3" />
            </div>

            {/* Notify button */}
            <button
              className="mt-6 w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-purple-500/10 relative z-10"
              style={{ borderColor: ACCENT_PURPLE, color: ACCENT_PURPLE }}
            >
              Notify me when ready
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
