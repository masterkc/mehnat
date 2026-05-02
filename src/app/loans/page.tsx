"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  AlertCircle,
  Smartphone,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

/* ───────────────────── Animated Number ───────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    prevValue.current = value;
    const duration = 600;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display.toLocaleString("en-IN")}</>;
}

/* ───────────────────── Constants ───────────────────── */
const durationOptions = [
  { label: "3 months", value: 3 },
  { label: "6 months", value: 6 },
  { label: "1 year", value: 12 },
  { label: "2+ years", value: 24 },
];

const earningsOptions = [
  { label: "₹10,000", value: 10000 },
  { label: "₹15,000", value: 15000 },
  { label: "₹20,000", value: 20000 },
  { label: "₹25,000+", value: 25000 },
];

const multipliers: Record<number, number> = {
  3: 0.3,
  6: 0.5,
  12: 0.7,
  24: 0.85,
};

const loanTypes = [
  {
    icon: Wrench,
    title: "Bike Repair Loan",
    amount: "Up to ₹15,000",
    desc: "Bike toot gayi? Kal se kaam band mat karo.",
  },
  {
    icon: AlertCircle,
    title: "Emergency Loan",
    amount: "Up to ₹10,000",
    desc: "Medical, family, anything urgent.",
  },
  {
    icon: Smartphone,
    title: "Phone Upgrade Loan",
    amount: "Up to ₹20,000",
    desc: "Naya phone, zyada kamai.",
  },
];

const repaymentSteps = [
  "Payout received",
  "15% auto-deducted",
  "Credited to Mehnat",
  "Loan closes",
];

/* ───────────────────── Fade-in variant ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ───────────────────── Page ───────────────────── */
export default function LoansPage() {
  const [duration, setDuration] = useState(6);
  const [earnings, setEarnings] = useState(15000);

  const eligible = Math.round(earnings * multipliers[duration]);

  return (
    <main className="min-h-screen bg-[#0D1117] text-white pb-24 md:pb-8">
      {/* ────── HERO ────── */}
      <motion.section
        className="pt-24 pb-16 px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          <span className="bg-gradient-to-r from-[#A855F7] to-violet-400 bg-clip-text text-transparent">
            Instant Micro-Loans
          </span>{" "}
          — Bina Salary Slip
        </h1>
      </motion.section>

      {/* ────── KEY MESSAGE CARD ────── */}
      <motion.section
        className="px-6 pb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 max-w-2xl mx-auto border-l-4 border-l-[#A855F7]">
          <p className="text-lg md:text-xl font-semibold text-gray-100 mb-3">
            Banks need Form 16. We need your earnings history.
          </p>
          <p className="text-gray-400">
            If you&apos;ve been riding for 90 days, you&apos;re eligible.
          </p>
        </div>
      </motion.section>

      {/* ────── ELIGIBILITY CALCULATOR ────── */}
      <motion.section
        className="px-6 pb-16 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Check your eligibility
          </h2>

          {/* Duration selector */}
          <div className="mb-8">
            <p className="text-gray-400 mb-3 text-sm font-medium">
              How long have you been on Swiggy/Zomato/Ola?
            </p>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDuration(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    duration === opt.value
                      ? "bg-[#A855F7] text-white shadow-lg shadow-purple-500/25"
                      : "bg-[#21262D] text-gray-400 hover:bg-[#30363D] hover:text-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Earnings selector */}
          <div className="mb-8">
            <p className="text-gray-400 mb-3 text-sm font-medium">
              Average monthly earnings?
            </p>
            <div className="flex flex-wrap gap-2">
              {earningsOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setEarnings(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    earnings === opt.value
                      ? "bg-[#A855F7] text-white shadow-lg shadow-purple-500/25"
                      : "bg-[#21262D] text-gray-400 hover:bg-[#30363D] hover:text-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${duration}-${earnings}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0D1117] border border-[#30363D] rounded-xl p-6 text-center space-y-3"
            >
              <p className="text-gray-400 text-sm">You are eligible for</p>
              <p className="text-4xl font-bold text-[#238636]">
                ₹<AnimatedNumber value={eligible} />
              </p>
              <div className="space-y-2 pt-2 text-sm text-gray-400">
                <p>Repayment: Automatic from daily payouts</p>
                <p>
                  Interest rate: 14% p.a.{" "}
                  <span className="text-red-500 line-through ml-1">
                    28% from moneylenders
                  </span>
                </p>
                <p>
                  Time to receive:{" "}
                  <span className="text-[#238636] font-semibold">4 minutes</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ────── LOAN TYPES ────── */}
      <motion.section
        className="px-6 pb-16 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {loanTypes.map((loan) => (
            <motion.div
              key={loan.title}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="group bg-[#161B22] border border-[#30363D] rounded-xl p-8
                         hover:border-[#A855F7]/50 hover:shadow-lg hover:shadow-purple-500/10
                         transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#A855F7]/10 flex items-center justify-center mb-5">
                <loan.icon className="w-6 h-6 text-[#A855F7]" />
              </div>
              <h3 className="text-xl font-bold mb-1">{loan.title}</h3>
              <p className="text-[#238636] font-semibold mb-3">{loan.amount}</p>
              <p className="text-gray-400 text-sm">{loan.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ────── HOW REPAYMENT WORKS ────── */}
      <motion.section
        className="px-6 pb-16 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How Repayment Works
        </h2>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-center justify-center gap-2">
          {repaymentSteps.map((step, i) => (
            <motion.div key={step} variants={fadeUp} className="flex items-center gap-2">
              <div className="bg-[#21262D] border border-[#30363D] rounded-lg px-5 py-4 text-center min-w-[150px]">
                <p className="text-sm font-medium text-gray-200">{step}</p>
              </div>
              {i < repaymentSteps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="flex md:hidden flex-col items-center gap-3">
          {repaymentSteps.map((step, i) => (
            <motion.div key={step} variants={fadeUp} className="flex flex-col items-center gap-3 w-full">
              <div className="bg-[#21262D] border border-[#30363D] rounded-lg px-5 py-4 text-center w-full max-w-xs">
                <p className="text-sm font-medium text-gray-200">{step}</p>
              </div>
              {i < repaymentSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-[#A855F7] rotate-90" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ────── BOTTOM CTA ────── */}
      <motion.section
        className="px-6 pb-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <button
          className="inline-block bg-[#238636] hover:bg-[#2ea043] text-white font-bold
                     text-lg px-10 py-4 rounded-xl transition-all duration-300
                     shadow-lg shadow-green-500/20 hover:shadow-green-500/40
                     hover:scale-[1.02] active:scale-[0.98]"
        >
          Apply Now — Check Eligibility in 60 Seconds
        </button>
      </motion.section>
    </main>
  );
}
