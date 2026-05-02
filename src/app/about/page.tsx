"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Languages,
  Brain,
  Building2,
  Gift,
  Lock,
} from "lucide-react";

/* ───────────────────── Animation Variants ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────────────── Approach Data ───────────────────── */
const approach = [
  {
    icon: MessageSquare,
    title: "WhatsApp-first",
    desc: "No app download required for V1",
  },
  {
    icon: Languages,
    title: "Vernacular voice",
    desc: "8 Indian languages",
  },
  {
    icon: Brain,
    title: "AI-native cashflow forecasting",
    desc: "Predicts your earnings before you earn",
  },
  {
    icon: Building2,
    title: "Account Aggregator powered",
    desc: "RBI-aligned, secure data access",
  },
  {
    icon: Gift,
    title: "Free core product",
    desc: "Monetize via insurance + credit",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    desc: "We can never move your money",
  },
];

/* ───────────────────── Roadmap Data ───────────────────── */
const roadmap = [
  {
    version: "V1",
    time: "Now",
    title: "Daily allowance + AI forecast + Micro-loans + Insurance",
    active: true,
  },
  {
    version: "V2",
    time: "6 months",
    title: "Buckets + savings goals",
    active: false,
  },
  {
    version: "V3",
    time: "12 months",
    title: "Income smoothing",
    active: false,
  },
  {
    version: "V4",
    time: "18 months",
    title: "Full credit underwriting",
    active: false,
  },
  {
    version: "V5",
    time: "24 months",
    title: "Family financial OS",
    active: false,
  },
];

/* ───────────────────── Stats Data ───────────────────── */
const stats = [
  { label: "TAM", value: "30 crore", subtitle: "gig + informal workers" },
  { label: "3-year target", value: "1 crore", subtitle: "realistic user capture" },
  { label: "Revenue", value: "₹500 cr/year", subtitle: "at 1 crore users" },
  { label: "Validation", value: "Bank Jago × Gojek", subtitle: "Indonesia model proven" },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white pb-24 md:pb-8">
      {/* ────────── HERO ────────── */}
      <section className="pt-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-white mb-6"
          >
            What we&apos;re solving
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            30 crore Indians earn money in irregular amounts on irregular days.
            No salary slip means no bank loan, no insurance, no real financial
            planning. Every existing fintech assumes monthly salary. Mehnat
            doesn&apos;t.
          </motion.p>
        </motion.div>
      </section>

      {/* ────────── OUR APPROACH ────────── */}
      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white mb-10"
        >
          Our approach
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {approach.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#A855F7]/40 transition-colors"
            >
              <item.icon className="w-7 h-7 text-[#A855F7] mb-4" />
              <h3 className="text-white font-semibold text-lg mb-1">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────── ROADMAP ────────── */}
      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white mb-10"
        >
          Roadmap
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="relative pl-8"
        >
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#30363D]" />

          {roadmap.map((item, i) => (
            <motion.div
              key={item.version}
              variants={fadeUp}
              className={`relative mb-10 last:mb-0 ${
                i === 0 ? "" : ""
              }`}
            >
              {/* Dot */}
              <div
                className={`absolute -left-8 top-1 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${
                  item.active
                    ? "border-[#238636] bg-[#238636]/20"
                    : "border-[#30363D] bg-[#0D1117]"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.active ? "bg-[#238636]" : "bg-[#30363D]"
                  }`}
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      item.active
                        ? "bg-[#238636]/20 text-[#238636]"
                        : "bg-[#21262D] text-gray-400"
                    }`}
                  >
                    {item.version}
                  </span>
                  <span className="text-gray-500 text-sm">{item.time}</span>
                </div>
                <p
                  className={`text-base ${
                    item.active ? "text-white font-medium" : "text-gray-400"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────── THE NUMBERS ────────── */}
      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white mb-10"
        >
          The numbers
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 text-center"
            >
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                {s.label}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                {s.value}
              </p>
              <p className="text-gray-400 text-sm">{s.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────── CONTACT ────────── */}
      <section className="mt-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white mb-10"
        >
          Get in touch
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 max-w-lg"
        >
          <p className="text-white text-lg font-semibold mb-1">Krishna</p>
          <p className="text-gray-300 mb-4">
            <a
              href="tel:+917337211721"
              className="hover:text-[#A855F7] transition-colors"
            >
              +91 7337211721
            </a>
          </p>
          <p className="text-gray-500 text-sm">
            Built for Zupee Case Study, May 2026
          </p>
        </motion.div>
      </section>
    </main>
  );
}
