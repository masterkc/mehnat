"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Hospital,
  ShieldCheck,
  Activity,
  Search,
  CheckCircle,
} from "lucide-react";

/* ───────────────────── Animation Variants ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepStagger = {
  visible: { transition: { staggerChildren: 0.25 } },
};

/* ───────────────────── Bundle Card Data ───────────────────── */
const bundles = [
  {
    icon: Heart,
    color: "text-red-400",
    bg: "bg-red-400/10",
    title: "Income Protection",
    description:
      "Agar 3 din se zyada kaam nahi kar paye injury ki wajah se — average daily earnings automatically credit ho jaayenge 21 din tak.",
  },
  {
    icon: Hospital,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Health Cover",
    description:
      "₹2 lakh cashless treatment. 500+ hospitals in your city. Show app QR code at counter.",
  },
  {
    icon: ShieldCheck,
    color: "text-green-400",
    bg: "bg-green-400/10",
    title: "Accident + Death Benefit",
    description:
      "₹5 lakh family ko agar kuch ho gaya. Automatic payout in 48 hours.",
  },
];

/* ───────────────────── Comparison Data ───────────────────── */
const comparisonRows = [
  { feature: "Monthly cost", mehnat: "₹15", traditional: "₹500+" },
  { feature: "Claims process", mehnat: "Auto", traditional: "30-day paperwork" },
  { feature: "Eligibility", mehnat: "Any rider", traditional: "Salary proof needed" },
  { feature: "Time to claim", mehnat: "24 hours", traditional: "30-45 days" },
];

/* ───────────────────── Auto-Claim Steps ───────────────────── */
const steps = [
  {
    icon: Activity,
    title: "You stop riding",
    description: "Platform detects inactivity",
  },
  {
    icon: Search,
    title: "Mehnat AI verifies",
    description: "With hospital or platform",
  },
  {
    icon: CheckCircle,
    title: "Payout in 24 hours",
    description: "No calls, no forms",
  },
];

/* ═══════════════════════════════════════════════════════════════ */
/*  Insurance Page                                                */
/* ═══════════════════════════════════════════════════════════════ */
export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-navy-900 text-white pt-24 pb-24 md:pb-8">
      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent-green">₹15/month</span>. No paperwork.
          Auto-claimed.
        </motion.h1>

        <motion.p
          className="text-lg text-gray-400 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          The insurance plan India&apos;s gig workers actually deserve.
        </motion.p>
      </section>

      {/* ── BUNDLE CARDS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {bundles.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="bg-navy-800 border border-navy-600 rounded-xl p-8 flex flex-col"
            >
              <div
                className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center mb-4`}
              >
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Mehnat vs Traditional Insurance
        </motion.h2>

        {/* Desktop table */}
        <motion.div
          className="hidden md:block bg-navy-800 border border-navy-600 rounded-xl overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-navy-600">
                <th className="px-6 py-4 text-sm text-gray-400 font-medium">
                  Feature
                </th>
                <th className="px-6 py-4 text-sm font-medium bg-accent-purple/20 text-accent-purple">
                  Mehnat
                </th>
                <th className="px-6 py-4 text-sm text-gray-400 font-medium">
                  Traditional Insurance
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={
                    i < comparisonRows.length - 1
                      ? "border-b border-navy-700"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-accent-green bg-accent-purple/10">
                    {row.mehnat}
                  </td>
                  <td className="px-6 py-4 text-sm text-red-400/70">
                    {row.traditional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile card layout */}
        <motion.div
          className="md:hidden space-y-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {comparisonRows.map((row) => (
            <motion.div
              key={row.feature}
              variants={fadeUp}
              className="bg-navy-800 border border-navy-600 rounded-xl p-5"
            >
              <p className="text-sm text-gray-400 mb-3 font-medium">
                {row.feature}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-accent-purple font-medium block mb-1">
                    Mehnat
                  </span>
                  <span className="text-accent-green font-semibold">
                    {row.mehnat}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 font-medium block mb-1">
                    Traditional
                  </span>
                  <span className="text-red-400/70">{row.traditional}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── HOW AUTO-CLAIM WORKS ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          How auto-claim works
        </motion.h2>

        <motion.div
          className="relative"
          variants={stepStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-navy-600 md:hidden" />
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-navy-600" />

          <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex md:flex-col md:items-center md:text-center gap-4 md:gap-3 pl-14 md:pl-0 flex-1"
              >
                {/* Numbered circle */}
                <div className="absolute left-0 md:relative md:left-auto w-12 h-12 rounded-full bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center shrink-0">
                  <span className="text-accent-purple font-bold text-sm">
                    {i + 1}
                  </span>
                </div>

                <div className="md:flex md:flex-col md:items-center">
                  <div className="w-10 h-10 bg-navy-700 rounded-lg flex items-center justify-center mb-2">
                    <step.icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Purple glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 bg-accent-purple/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <a
              href="#"
              className="inline-block bg-accent-green hover:bg-accent-green-hover text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors duration-200"
            >
              Activate Insurance — ₹15/month
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Cancel anytime. No lock-in.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
