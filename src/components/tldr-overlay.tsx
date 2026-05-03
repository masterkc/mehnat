"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { X, ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const qna = [
  {
    q: "What problem are we solving?",
    a: "India's 30 crore gig workers earn real money daily but have zero access to investments, fair credit, or insurance — because every financial product assumes a monthly salary they don't have. Their money sits idle at 2.7% while inflation eats it."
  },
  {
    q: "How are we solving it?",
    a: "A zero-balance bank account (via regulated partner) + 4 SEBI mutual fund buckets starting ₹100 + instant loans at 14% APR + ₹15/month auto-claimed insurance. All delivered via WhatsApp in Hindi. No app download. No English required."
  },
  {
    q: "Why hasn't anyone done this already?",
    a: "Banks need Form 16. Fintechs need monthly SIP. NBFCs need salary slips. Every incumbent is structurally locked into the salaried model because that's where the easy money is. We go where they won't."
  },
  {
    q: "What is the AI actually doing here?",
    a: "Forecasting daily earnings from 90 days of noisy multi-platform UPI data using time-series models + weather + festival patterns. Underwriting credit without a CIBIL score. Auto-detecting insurance claims from platform inactivity. None of this works with rules."
  },
  {
    q: "Who is the user? Paint me a picture.",
    a: "Rajesh, 28, Mumbai. Earns ₹650/day on Swiggy + Zomato. Sends ₹6,000 home monthly. Every day he asks one question: do I have enough today? Mehnat answers it at 6 AM before he starts his shift."
  },
  {
    q: "What are the biggest challenges?",
    a: "Three: getting a bank partner to sign (without them nothing works), getting one platform like Swiggy to embed us (gives instant access to 30M riders), and building trust with users who have been burned by financial products before."
  },
  {
    q: "How are we overcoming them?",
    a: "Bank partner: we bring them 30 crore customers they cannot acquire alone — the pitch writes itself. Platform partner: we reduce their 60% rider churn — their CFO cares about this. User trust: daily allowance proves we work before we ask for investment."
  },
  {
    q: "How does Mehnat make money?",
    a: "We never charge the rider for core features. Revenue comes from AMC trail commission on AUM, 6% interest spread on loans via NBFC, insurance partner commission, and optional ₹99/month premium tier. ₹1,430 per user per year at scale."
  },
  {
    q: "Why will this reach 100 million users?",
    a: "Every Indian gig worker already uses WhatsApp and UPI. We require no new behavior. Platform partnerships give us access to 30M riders from Day 1. Each user refers others via champion network for ₹200 reward. CAC stays under ₹80."
  },
  {
    q: "What could kill this in 12 months?",
    a: "Swiggy or Zomato building it internally, a trust collapse from one failed insurance claim going viral, or RBI reclassifying our income smoothing as deposit-taking. All three have specific mitigations built into our architecture from day one."
  },
  {
    q: "Why now? Why not 3 years ago?",
    a: "Account Aggregator framework only matured in 2023. WhatsApp Business API only enabled proactive messaging recently. LLM costs dropped 100x making cashflow forecasting economically viable at ₹80 CAC. This product was impossible before 2024."
  },
  {
    q: "What does success look like in 3 years?",
    a: "1 crore riders with a Mehnat bank account. ₹5,000 crore AUM across investment buckets. ₹500 crore net ARR. India's first investment platform where the user has never heard the word 'SIP' but is already an investor."
  }
];

function TypewriterLabel({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, isInView]);

  return (
    <motion.span 
      onViewportEnter={() => setIsInView(true)}
      className="absolute -top-8 left-0 font-mono text-[10px] text-[#F59E0B] uppercase tracking-widest"
    >
      {displayedText}
    </motion.span>
  );
}

function QnaItem({ item, index }: { item: typeof qna[0], index: number }) {
  const num = (index + 1).toString().padStart(2, '0');
  
  return (
    <div className="py-24 first:pt-12">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-[1px] bg-[#F59E0B]/30 mb-20"
      />
      <div className="relative">
        <TypewriterLabel text={`Q${num}`} />
        <motion.h3 
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-xl md:text-2xl font-bold text-[#F59E0B] mb-8 leading-tight"
        >
          &quot;{item.q}&quot;
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white text-base md:text-lg leading-relaxed max-w-2xl font-sans opacity-90"
        >
          {item.a}
        </motion.p>
      </div>
    </div>
  );
}

export default function TldrOverlay({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white overflow-y-auto no-scrollbar"
      ref={containerRef}
    >
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#F59E0B] z-[110] origin-left"
        style={{ scaleX }}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[110] p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl mx-auto px-6">
        {/* HERO */}
        <section className="h-screen flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <span className="font-mono text-sm text-[#F59E0B] tracking-[0.2em]">mehnat.tldr — read this in 90 seconds</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            {["Everything", "you", "need", "to", "know.", "Nothing", "you", "don't."].map((word, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[#F59E0B] text-lg md:text-xl font-medium"
          >
            12 questions. 2-3 lines each. No fluff. No jargon.
          </motion.p>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-[#F59E0B]"
          >
            <ArrowDown size={32} />
          </motion.div>
        </section>

        {/* Q&A SECTION */}
        <div className="pb-32">
          {qna.map((item, i) => (
            <QnaItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* CLOSING */}
        <section className="h-screen flex flex-col justify-center items-center text-center border-t border-[#F59E0B]/30">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-mono text-sm text-[#F59E0B] tracking-[0.2em] mb-4"
          >
            end of tldr
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ textShadow: ["0 0 0px #F59E0B", "0 0 20px #F59E0B", "0 0 0px #F59E0B"] }}
            transition={{ opacity: { duration: 1 }, animate: { duration: 3, repeat: Infinity } }}
            className="text-6xl md:text-8xl font-black mb-6"
          >
            Mehnat.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#F59E0B] text-xl md:text-2xl font-medium mb-16"
          >
            Aapki Kamai, Aapka Control.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onClose}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              Read full pitch deck — Learn <ArrowRight size={20} />
            </button>
            <Link 
              href="/demo"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              Try the product — App <ArrowRight size={20} />
            </Link>
          </div>

          <div className="absolute bottom-10 space-y-1 text-center">
            <p className="text-[10px] text-white/40 font-mono tracking-wider">Krishna · +91 7337211721</p>
            <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase">Built for Zupee · May 2026</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
