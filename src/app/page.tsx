"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Shield,
  Link2,
  Clock,
  Rocket,
  Quote,
} from "lucide-react";

/* ───────────────────── Animated Counter Hook ───────────────────── */
function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ───────────────────── Particles (deterministic to avoid hydration mismatch) ───────────────────── */
const particles = [
  { id: 0, x: "10%", y: "15%", size: 2, duration: 7, delay: 0 },
  { id: 1, x: "25%", y: "80%", size: 1.5, duration: 9, delay: 1 },
  { id: 2, x: "80%", y: "20%", size: 3, duration: 6, delay: 0.5 },
  { id: 3, x: "60%", y: "70%", size: 1, duration: 8, delay: 2 },
  { id: 4, x: "40%", y: "40%", size: 2.5, duration: 5, delay: 1.5 },
  { id: 5, x: "90%", y: "50%", size: 1.8, duration: 10, delay: 0.8 },
  { id: 6, x: "15%", y: "60%", size: 2.2, duration: 7, delay: 2.5 },
  { id: 7, x: "70%", y: "10%", size: 1.3, duration: 8, delay: 1.2 },
  { id: 8, x: "50%", y: "90%", size: 3, duration: 6, delay: 0.3 },
  { id: 9, x: "35%", y: "30%", size: 1.7, duration: 9, delay: 1.8 },
  { id: 10, x: "5%", y: "45%", size: 2, duration: 7, delay: 2.2 },
  { id: 11, x: "85%", y: "85%", size: 1.5, duration: 8, delay: 0.7 },
  { id: 12, x: "55%", y: "25%", size: 2.8, duration: 6, delay: 1.3 },
  { id: 13, x: "20%", y: "55%", size: 1.2, duration: 10, delay: 2.8 },
  { id: 14, x: "75%", y: "65%", size: 2.3, duration: 5, delay: 0.2 },
  { id: 15, x: "45%", y: "5%", size: 1.8, duration: 9, delay: 1.6 },
  { id: 16, x: "95%", y: "35%", size: 2.5, duration: 7, delay: 2.1 },
  { id: 17, x: "30%", y: "75%", size: 1.4, duration: 8, delay: 0.9 },
];

/* ───────────────────── Feature Cards Data ───────────────────── */
const features = [
  {
    icon: TrendingUp,
    title: "Daily Allowance",
    desc: "AI predicts your safe daily spend based on your actual earnings — no more anxiety about running out.",
  },
  {
    icon: Zap,
    title: "Instant Micro-Loans",
    desc: "Need ₹5,000 for bike repair? Get it in 4 minutes. Repaid automatically from your next payouts.",
  },
  {
    icon: Shield,
    title: "₹15/month Insurance",
    desc: "Income protection, health cover, and accident insurance bundled — auto-claimed, no paperwork.",
  },
];

/* ───────────────────── Steps Data ───────────────────── */
const steps = [
  {
    icon: Link2,
    title: "Connect your earnings",
    desc: "Link your Swiggy, Zomato, or Ola account in 30 seconds.",
  },
  {
    icon: Clock,
    title: "Get your daily allowance every morning at 6 AM",
    desc: "Our AI crunches your earnings and upcoming expenses overnight.",
  },
  {
    icon: Rocket,
    title: "Access loans and insurance when you need them",
    desc: "One-tap micro-loans and zero-paperwork insurance, always ready.",
  },
];

/* ───────────────────── Partners ───────────────────── */
const partners = ["Swiggy", "Zomato", "Ola", "Rapido", "Urban Company"];

/* ═══════════════════════ PAGE ═══════════════════════ */
export default function Home() {
  const counter = useCountUp(420, 1500);

  return (
    <main className="pb-20 md:pb-0">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Radial purple glow */}
        <div className="absolute inset-0 bg-navy-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
        </div>

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-purple-400/30"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Aapki Kamai,
              <br />
              Aapka Control
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
              India&apos;s first AI financial OS built for gig workers. Daily
              spend allowance, instant micro-loans, and ₹15/month insurance —
              all without a salary slip.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/login"
                className="bg-[#238636] hover:bg-[#2EA043] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started as a Partner
              </Link>
              <Link
                href="/about"
                className="border border-[#30363D] text-white hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Partner with Us (Swiggy/Zomato)
              </Link>
            </div>
          </motion.div>

          {/* Right — Floating card */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#161B22]/80 backdrop-blur-xl border border-[#30363D] rounded-xl p-8 w-72 shadow-[0_0_60px_10px_rgba(168,85,247,0.12)]"
            >
              <p className="text-gray-400 text-sm">Aaj ka safe kharcha</p>
              <div ref={counter.ref} className="mt-2 text-5xl font-bold text-[#238636]">
                ₹{counter.value}
              </div>
              <div className="mt-4 h-2 rounded-full bg-[#21262D] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#238636] to-[#2EA043]"
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">62% of daily budget remaining</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PARTNER STRIP ─── */}
      <motion.section
        className="py-12 border-t border-b border-[#21262D]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-6">Trusted by partners at:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((name) => (
              <span
                key={name}
                className="border border-[#30363D] text-gray-400 px-4 py-1.5 rounded-full text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="gradient-border bg-[#161B22] border border-[#30363D] rounded-xl p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#7C3AED] flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How it works
        </motion.h2>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Dashed connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] border-t-2 border-dashed border-[#30363D]" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              {/* Numbered circle */}
              <div className="mx-auto w-16 h-16 rounded-full bg-[#161B22] border-2 border-[#A855F7] flex items-center justify-center text-[#A855F7] font-bold text-lg relative z-10">
                {i + 1}
              </div>

              <div className="mt-5 flex justify-center">
                <div className="w-10 h-10 rounded-lg bg-[#21262D] flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#A855F7]" />
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <motion.div
          className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 md:p-10 border-l-4 border-l-[#A855F7]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Quote className="w-8 h-8 text-[#A855F7] mb-4" />
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
            &ldquo;Mehnat ne mujhe bataya ki aaj ₹420 tak kharch karna safe
            hai. Pehle main hamesha tension mein rehta tha.&rdquo;
          </p>
          <p className="mt-6 text-sm text-gray-500">
            — Rajesh Kumar, Swiggy Delivery Partner, Mumbai
          </p>
        </motion.div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative py-24 overflow-hidden">
        {/* Purple glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to take control of your kamai?
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href="/login"
              className="bg-[#238636] hover:bg-[#2EA043] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started as a Partner
            </Link>
            <Link
              href="/about"
              className="border border-[#30363D] text-white hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Partner with Us (Swiggy/Zomato)
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
