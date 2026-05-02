"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Shield,
  Bell,
  Clock,
  Rocket,
  Quote,
  SendHorizontal,
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

/* ───────────────────── Mini Chat Component ───────────────────── */
interface ChatMsg { sender: "ai" | "user"; text: string; time: string }

const preloaded: ChatMsg[] = [
  { sender: "ai",   text: "Namaste, Rajesh bhai 🙏",                                                          time: "6:00 AM" },
  { sender: "ai",   text: "🎙️ Aaj aap ₹420 tak kharch kar sakte ho. Friday hai — expected kamai ₹780. Ride safe!", time: "6:00 AM" },
  { sender: "user", text: "Bhai aaj ₹600 chahiye, dost ki birthday hai 🎂",                                   time: "8:23 AM" },
  { sender: "ai",   text: "Done ✓ Aaj ₹600 use kar sakte ho. Birthday enjoy karo! 🎉",                       time: "8:24 AM" },
];

const CANNED: Record<string, string> = {
  loan:     "Aap ₹8,500 ke eligible hain. 4 minute mein transfer. Lena hai?",
  insurance:"Aapka ₹15/month plan active hai ✓ Income protection + ₹2L health cover.",
  kharcha:  "Aaj ₹420 safe hai bhai. Abhi ₹80 bache hain.",
  kitna:    "Aaj ₹420 safe hai bhai. Abhi ₹80 bache hain.",
};

function MiniChat() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const show = () => {
      if (i < preloaded.length) {
        const msg = preloaded[i++];
        if (msg.sender === "ai") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages((m) => [...m, msg]);
            setTimeout(show, 800);
          }, 900);
        } else {
          setMessages((m) => [...m, msg]);
          setTimeout(show, 600);
        }
      }
    };
    const t = setTimeout(show, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    const userMsg: ChatMsg = { sender: "user", text: q, time: "Now" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    const key = Object.keys(CANNED).find((k) => q.toLowerCase().includes(k));
    const reply = key ? CANNED[key] : "Yeh feature V2 mein aa raha hai! Abhi allowance, loans aur insurance ke liye poochho.";
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { sender: "ai", text: reply, time: "Now" }]);
    }, 1200);
  };

  return (
    <div className="flex flex-col bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden w-full max-w-sm shadow-[0_0_40px_8px_rgba(168,85,247,0.1)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363D] bg-[#21262D]">
        <div className="w-2 h-2 rounded-full bg-[#A855F7]" />
        <span className="text-sm font-semibold text-white">Mehnat AI</span>
        <span className="ml-auto text-xs text-gray-500">Your financial partner</span>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[260px]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.sender === "ai"
                  ? "bg-[#21262D] text-gray-200"
                  : "bg-[#238636]/25 border border-[#238636]/40 text-gray-100"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#21262D] rounded-xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#30363D] p-3 flex gap-2 bg-[#21262D]">
        <input
          className="flex-1 bg-[#161B22] border border-[#30363D] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#A855F7] transition-colors"
          placeholder="Kuch bhi pucho…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-lg px-3 py-2 transition-colors"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────── Particles ───────────────────── */
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
];

/* ───────────────────── Partner logos with brand colors ───────────────────── */
const partnerLogos = [
  { name: "Swiggy",        bg: "#FC8019", text: "#fff",    emoji: "🛵" },
  { name: "Zomato",        bg: "#E23744", text: "#fff",    emoji: "🍕" },
  { name: "Ola",           bg: "#1C1C1C", text: "#fff",    emoji: "🚖" },
  { name: "Rapido",        bg: "#FFCC00", text: "#000",    emoji: "⚡" },
  { name: "Urban Company", bg: "#00B4A2", text: "#fff",    emoji: "🔧" },
  { name: "Dunzo",         bg: "#00D37F", text: "#000",    emoji: "📦" },
  { name: "Blinkit",       bg: "#F8D000", text: "#000",    emoji: "🟡" },
  { name: "Zepto",         bg: "#7C3AED", text: "#fff",    emoji: "🚀" },
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

/* ───────────────────── Steps ───────────────────── */
const steps = [
  {
    icon: Bell,
    title: "Allow notification access",
    desc: "Mehnat reads your earning notifications from Swiggy, Zomato, Ola, Rapido — all apps, one place. No account linking needed.",
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

/* ═══════════════════════ PAGE ═══════════════════════ */
export default function Home() {
  const counter = useCountUp(420, 1500);

  return (
    <main className="pb-20 md:pb-0">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0D1117]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.13)_0%,transparent_70%)]" />
        </div>

        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-purple-400/30"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — copy */}
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
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
              India&apos;s first AI financial OS built for gig workers. Daily spend
              allowance, instant micro-loans, and ₹15/month insurance — all
              without a salary slip.
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

            {/* Inline counter pill */}
            <div ref={counter.ref} className="mt-8 inline-flex items-center gap-3 bg-[#161B22] border border-[#30363D] rounded-full px-5 py-2.5">
              <span className="text-gray-400 text-sm">Aaj ka safe kharcha:</span>
              <span className="text-[#238636] font-bold text-xl">₹{counter.value}</span>
            </div>
          </motion.div>

          {/* Right — Mini Chat */}
          <motion.div
            className="flex-shrink-0 w-full max-w-sm"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <MiniChat />
          </motion.div>
        </div>
      </section>

      {/* ─── PARTNER MARQUEE STRIP ─── */}
      <section className="py-10 border-t border-b border-[#21262D] overflow-hidden">
        <p className="text-gray-500 text-sm text-center mb-6">Trusted by partners at:</p>

        {/* Infinite scroll using CSS animation — duplicate items for seamless loop */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0D1117] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0D1117] to-transparent pointer-events-none" />

          <div className="flex gap-4 w-max animate-[marquee_20s_linear_infinite]">
            {[...partnerLogos, ...partnerLogos].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap select-none"
                style={{ background: p.bg, color: p.text }}
              >
                <span>{p.emoji}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
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
              <div className="mx-auto w-16 h-16 rounded-full bg-[#161B22] border-2 border-[#A855F7] flex items-center justify-center text-[#A855F7] font-bold text-lg relative z-10">
                {i + 1}
              </div>
              <div className="mt-5 flex justify-center">
                <div className="w-10 h-10 rounded-lg bg-[#21262D] flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#A855F7]" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
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
            <Link href="/login" className="bg-[#238636] hover:bg-[#2EA043] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Get Started as a Partner
            </Link>
            <Link href="/about" className="border border-[#30363D] text-white hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors">
              Partner with Us (Swiggy/Zomato)
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
