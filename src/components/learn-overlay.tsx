"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { X, Check, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LearnOverlay({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Progress bar logic
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0F] text-white overflow-y-auto no-scrollbar font-sans"
      ref={containerRef}
    >
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      {/* Sticky Header & Progress Bar */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <motion.div className="h-1 bg-[#F59E0B] origin-left" style={{ scaleX }} />
        <div className="flex justify-between items-center px-6 py-4 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="text-[#F59E0B]">Mehnat</span> Pitch Deck
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32">
        
        {/* SECTION 0 — TLDR HERO */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center pt-10 border-b border-white/10 pb-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-[#F59E0B] uppercase mb-8">
              TLDR — 30 seconds
            </motion.span>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-16">
              30 crore Indians earn daily.<br/>
              <span className="text-white/40">Zero investment products built for them.</span><br/>
              <span className="text-[#F59E0B]">Mehnat fixes this.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">₹500 Cr ARR potential</div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">30 Cr TAM</div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">₹100 min investment</div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">4 min loan disbursal</div>
              <div className="px-6 py-3 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-medium">₹15/mo insurance</div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">94% AI accuracy</div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 1 — WHAT IS THE PRODUCT */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 1 of 6 — The Product</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              An AI investment and lending OS for gig workers.<br/>
              Built for how they actually earn.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-16">
              <motion.div variants={fadeUp} className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  Mehnat is India&apos;s first investment and credit platform built for gig workers. The foundation is a zero-balance bank account via our regulated banking partner — opened in 5 minutes via Aadhaar.
                </p>
                <p>On top of that account sit four things:</p>
                <div className="space-y-6 mt-8">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">1</div>
                    <p><strong className="text-white">4 SEBI-regulated investment buckets</strong> starting at ₹100. Liquid to hybrid funds. No fixed SIP. Invest ₹47 today, ₹200 tomorrow, ₹0 on a rain day. AI auto-sweeps idle balance daily.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">2</div>
                    <p><strong className="text-white">Instant micro-loans</strong> up to ₹50,000 based on 90 days of UPI earnings — not salary slips. 14% APR vs 36% moneylenders. 4 minutes.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">3</div>
                    <p><strong className="text-white">₹15/month auto-claimed insurance.</strong> Income protection + ₹2L health + ₹5L family benefit.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">4</div>
                    <p><strong className="text-white">Daily spend allowance</strong> via WhatsApp voice note in Hindi every morning at 6 AM.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 h-fit">
                {[
                  "Zero-balance bank account · Aadhaar KYC",
                  "4 investment buckets · ₹100 minimum",
                  "SEBI regulated · AMFI registered",
                  "Loans at 14% · No salary slip needed",
                  "Auto-claimed insurance · ₹15/month",
                  "WhatsApp-first · 8 Indian languages"
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-center text-center text-sm font-medium h-24">
                    {spec}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2 — BANK PARTNERSHIP */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">The Strategic Foundation</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              A bank account built for gig workers. India&apos;s first.
            </motion.h2>

            <motion.div variants={fadeUp} className="bg-[#161B22] border border-[#F59E0B]/30 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <p className="text-lg text-white/80 leading-relaxed">
                    Everything in Mehnat flows from one foundation: a zero-balance savings account via our regulated banking partner.
                  </p>
                  <p className="text-white/60">
                    Why this matters: You cannot invest, borrow, or insure without a proper bank account. Most gig workers have basic Jan Dhan accounts with no fintech integration. We fix that first.
                  </p>
                  <div className="space-y-3 pt-4">
                    {[
                      "Zero minimum balance requirement",
                      "Aadhaar-based KYC — open in 5 minutes",
                      "Daily platform earnings auto-credited",
                      "Free VISA debit card with fuel cashback",
                      "DICGC insured up to ₹5,00,000",
                      "UPI ID for instant transfers"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/90 font-medium">
                        <ArrowRight size={16} className="text-[#F59E0B]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  {/* Bank Card Mockup */}
                  <div className="w-full max-w-sm aspect-[1.6/1] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 border border-white/10 relative overflow-hidden shadow-2xl mb-8">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
                    <p className="text-sm font-bold tracking-[0.3em] text-white/60 mb-12">MEHNAT</p>
                    <div className="bg-white/10 border border-white/20 px-3 py-1 rounded text-[10px] font-bold tracking-widest text-white/80 w-fit mb-4">PARTNER BANK</div>
                    <p className="text-xs text-white/40 mb-6">Savings Account — Zero Balance</p>
                    <div className="flex justify-between items-end">
                      <p className="text-lg tracking-[0.3em] text-white/70 font-mono">● ● ● ● ● ● ● ● 4521</p>
                      <p className="text-xl font-black italic text-white/50">VISA</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 text-center max-w-sm">
                    Why a bank partner is non-negotiable: investment products require a regulated account to hold funds. Credit products require banking infrastructure to disburse.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-white mb-4">What partner bank gets</h4>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> 30 crore new customers they can&apos;t acquire alone</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> Daily transaction volume from gig platforms</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> AUM from our investment products</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> Loan book from credit products</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-white mb-4">What we get</h4>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> Zero-balance account infrastructure</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> RBI compliance umbrella</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> DICGC deposit insurance credibility</li>
                  <li className="flex items-start gap-2"><Check size={16} className="text-[#F59E0B] shrink-0 mt-0.5" /> Banking trust for gig worker adoption</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3 — INVESTMENT PRODUCTS */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 1 of 6 — The Product (Cont.)</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              4 investment products built for irregular income.
            </motion.h2>

            <motion.div variants={fadeUp} className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl mb-12">
              <p className="text-xl font-medium text-amber-100 leading-relaxed">
                &quot;The core insight: gig workers don&apos;t save because SIPs are fixed. If Rajesh earns ₹1,800 on Saturday but ₹0 on Tuesday, a fixed monthly SIP doesn&apos;t work. Our investment buckets accept any amount, any day, any time. AI allocates automatically.&quot;
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Liquid Mutual Fund",
                  returns: "6.5–7% p.a.",
                  withdrawal: "Instant — 30 minutes to UPI",
                  min: "₹100",
                  partners: "Nippon India, HDFC Liquid",
                  use: "Daily expense buffer, emergency access",
                  ai: "Auto-sweeps idle balance every night",
                  tag: "INSTANT WITHDRAWAL",
                  color: "border-green-500/40"
                },
                {
                  title: "Ultra Short Duration Fund",
                  returns: "7–7.5% p.a.",
                  withdrawal: "7 days",
                  min: "₹500",
                  partners: "ICICI Pru, Axis Ultra Short",
                  use: "Weekly surplus, better than savings",
                  ai: "Sweeps Friday earnings surplus",
                  tag: "7-DAY WITHDRAWAL",
                  color: "border-blue-500/40"
                },
                {
                  title: "Short Duration / Arbitrage Fund",
                  returns: "7.5–8.5% p.a.",
                  withdrawal: "30 days",
                  min: "₹1,000",
                  partners: "Kotak Short Term, HDFC Arbitrage",
                  use: "Monthly goals, rent buffer, family send",
                  ai: "Auto-redeems on target date",
                  tag: "30-DAY WITHDRAWAL",
                  color: "border-amber-500/40"
                },
                {
                  title: "Balanced Advantage / Equity Hybrid",
                  returns: "10–12% p.a. market-linked",
                  withdrawal: "90 days",
                  min: "₹500",
                  partners: "HDFC Balanced Advantage, SBI Hybrid",
                  use: "Scooter, phone, house savings",
                  ai: "Goal timeline with probability score",
                  tag: "90-DAY WITHDRAWAL",
                  color: "border-purple-500/40"
                }
              ].map((fund, i) => (
                <motion.div key={i} variants={fadeUp} className={`bg-white/5 border ${fund.color} p-8 rounded-3xl relative overflow-hidden group`}>
                  <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded text-[10px] font-bold tracking-wider text-white/60">{fund.tag}</div>
                  <h4 className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-2">{fund.title}</h4>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-black">{fund.returns}</span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div><p className="text-white/40 mb-1 font-medium uppercase text-[10px]">Withdrawal</p><p className="font-semibold">{fund.withdrawal}</p></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-white/40 mb-1 font-medium uppercase text-[10px]">Minimum</p><p className="font-semibold">{fund.min}</p></div>
                      <div><p className="text-white/40 mb-1 font-medium uppercase text-[10px]">Partners</p><p className="font-semibold">{fund.partners}</p></div>
                    </div>
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div><p className="text-white/40 mb-1 font-medium uppercase text-[10px]">Use Case</p><p className="text-white/80">{fund.use}</p></div>
                      <div><p className="text-[#F59E0B]/80 mb-1 font-medium uppercase text-[10px]">AI Behavior</p><p className="text-white/80">{fund.ai}</p></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-center text-center">
              <p className="text-white/70">
                Same ₹10,000 in savings account at 2.7% earns ₹0.74/day. In our liquid fund at 7%, it earns <span className="text-green-400 font-bold">₹1.89/day</span>. You earn 2.5x more with full liquidity. Withdraw anytime.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 4 — TAM */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 2 of 6 — Who we&apos;re building for</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              The 30 crore Indians every fintech ignored.
            </motion.h2>

            <div className="grid md:grid-cols-[1fr_300px] gap-12 items-center">
              {/* Funnel */}
              <motion.div variants={staggerContainer} className="flex flex-col items-center gap-2 w-full">
                <motion.div variants={fadeUp} className="w-full bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">53 Crore</h3>
                  <p className="text-sm text-white/50">Total informal workforce</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[85%] bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">30 Crore</h3>
                  <p className="text-sm text-white/50">Gig + daily wage + UPI workers</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[70%] bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">10 Crore</h3>
                  <p className="text-sm text-white/50">Smartphone + financially active</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[55%] bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">3 Crore</h3>
                  <p className="text-sm text-white/50">3-year realistic capture</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[40%] bg-[#F59E0B] p-6 text-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  <h3 className="text-3xl font-bold text-black mb-1">1 Crore</h3>
                  <p className="text-sm text-black/70 font-semibold">Year 1 target</p>
                </motion.div>
              </motion.div>

              {/* Cohorts */}
              <div className="space-y-4">
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">15M Delivery + ride-share riders</h4>
                  <p className="text-sm text-white/60">Swiggy, Zomato, Ola, Rapido, Uber</p>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">50M Daily wage workers via UPI</h4>
                  <p className="text-sm text-white/60">Construction, factories, households</p>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">13M Kirana + micro-merchants</h4>
                  <p className="text-sm text-white/60">Irregular income, same problem</p>
                </motion.div>
              </div>
            </div>

            <motion.div variants={fadeUp} className="mt-12 bg-white/5 border border-white/10 p-8 text-center rounded-2xl text-lg text-white/80 max-w-3xl mx-auto">
              These users have smartphones. They use UPI daily. They just have <strong>ZERO investment or credit product</strong> built for how they actually earn.
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 5 — PRODUCT ADOPTION */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 3 of 6 — Ease of adoption</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              No behavior change required.<br/>
              We meet them where they are.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <motion.div variants={fadeUp} className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="text-5xl mb-6">💬</div>
                <h3 className="text-2xl font-bold mb-4 text-green-400">Already on WhatsApp</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  535 million Indians use WhatsApp daily. Mehnat delivers allowance, investment nudges, loan approvals, and insurance updates via WhatsApp — no app download, no new login, no learning curve.
                </p>
                <div className="text-xs font-mono text-green-400/80 bg-green-500/10 px-3 py-1.5 rounded-md inline-block">535M WhatsApp users in India</div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="text-5xl mb-6">🏦</div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Bank Account First</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We open a zero-balance account on Day 1 via Aadhaar. This single step unlocks everything — investments, loans, insurance. The account is the product entry point. Most fintechs skip this step. We don&apos;t.
                </p>
                <div className="text-xs font-mono text-amber-400/80 bg-amber-500/10 px-3 py-1.5 rounded-md inline-block">5 minutes to open. Aadhaar only.</div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Trusts Their Platform</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We distribute through Swiggy, Zomato, Ola as a rider benefit. Workers trust their platform more than a new app. Platform co-branding removes the trust barrier entirely.
                </p>
                <div className="text-xs font-mono text-blue-400/80 bg-blue-500/10 px-3 py-1.5 rounded-md inline-block">60% rider churn = platform&apos;s #1 problem</div>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="bg-[#161B22] border border-[#30363D] rounded-3xl p-10 overflow-hidden">
              <h3 className="text-2xl font-bold mb-8">Every adoption barrier — solved</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 font-semibold text-white/50 w-1/3">Barrier</th>
                      <th className="pb-4 font-semibold text-white/50 w-1/3">Traditional fintech</th>
                      <th className="pb-4 font-semibold text-[#F59E0B] w-1/3">Mehnat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-5 font-medium">No smartphone fluency</td>
                      <td className="py-5 text-white/50">Needs app navigation</td>
                      <td className="py-5 font-bold text-white flex items-center gap-2"><Check className="text-[#F59E0B] w-4 h-4"/> WhatsApp only</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-medium">No English literacy</td>
                      <td className="py-5 text-white/50">English UI only</td>
                      <td className="py-5 font-bold text-white flex items-center gap-2"><Check className="text-[#F59E0B] w-4 h-4"/> Hindi voice notes</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-medium">No Form 16 / Salary</td>
                      <td className="py-5 text-white/50">Rejected</td>
                      <td className="py-5 font-bold text-white flex items-center gap-2"><Check className="text-[#F59E0B] w-4 h-4"/> 90-day UPI history</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-medium">Irregular cashflow</td>
                      <td className="py-5 text-white/50">SIP/EMI fails</td>
                      <td className="py-5 font-bold text-white flex items-center gap-2"><Check className="text-[#F59E0B] w-4 h-4"/> Daily flexible model</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 6 — MONETIZATION */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 4 of 6 — How we make money</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              Four revenue streams. Zero charged to the rider for core product.
            </motion.h2>

            <motion.div variants={fadeUp} className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl mb-16">
              <p className="text-xl font-medium text-amber-100 leading-relaxed text-center">
                &quot;Mehnat is FREE for the rider. We earn from the financial institutions and platforms who access our distribution — 30 crore gig workers they could never reach on their own.&quot;
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-green-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2">₹250</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6 text-center block">Per user per year</span>
                <h4 className="text-lg font-bold text-green-400 mb-3 text-center">AMC Trail Commission</h4>
                <p className="text-sm text-white/70 flex-1 text-center">0.5-1% annual trail on AUM from SEBI-registered fund houses. At ₹5,000 avg invested per user × 1 crore users = ₹5,000 crore AUM = ₹25-50 crore annual. Compounds as AUM grows.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-orange-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2 text-center block">₹800</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6 text-center block">Per user per year</span>
                <h4 className="text-lg font-bold text-orange-400 mb-3 text-center">Loan Interest Spread</h4>
                <p className="text-sm text-white/70 flex-1 text-center">We lend at 14% APR via NBFC partner. Cost of capital 8%. Our spread 6%. Auto-repaid from platform payouts. Near-zero default rate structurally.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-amber-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2 text-center block">₹180</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6 text-center block">Per user per year</span>
                <h4 className="text-lg font-bold text-amber-400 mb-3 text-center">Insurance Commission</h4>
                <p className="text-sm text-white/70 flex-1 text-center">20-30% commission from Acko, Digit, HDFC Ergo on ₹15/month bundle. Rider pays ₹15. We earn ₹3-5/rider/month. Zero cost to rider beyond the premium they choose to pay.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-purple-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2 text-center block">₹200</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6 text-center block">Per user per year</span>
                <h4 className="text-lg font-bold text-purple-400 mb-3 text-center">Premium Subscription</h4>
                <p className="text-sm text-white/70 flex-1 text-center">₹99/month for family OS, income smoothing, priority loan processing, advanced portfolio analytics. Optional. Never mandatory.</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <motion.div variants={fadeUp} className="bg-[#F59E0B] text-black p-10 rounded-3xl flex flex-col justify-center">
                <p className="text-black/70 font-bold uppercase tracking-widest mb-2">Total Potential</p>
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-4">₹1,430 <span className="text-3xl">/ user / yr</span></div>
                <div className="h-px bg-black/10 my-4"></div>
                <p className="text-xl font-medium">At 1 crore users = ₹1,430 crore gross revenue</p>
                <p className="text-xl font-bold mt-2">Net ARR (after costs) = ~₹500 crore</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col justify-center space-y-6">
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">CAC</p>
                  <p className="text-2xl font-bold">₹80 <span className="text-sm font-normal text-white/50">(B2B2C)</span></p>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">LTV:CAC Ratio</p>
                  <p className="text-2xl font-bold text-[#F59E0B]">17.9x</p>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">Payback Period</p>
                  <p className="text-2xl font-bold">20 days</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 7 — MOAT */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 5 of 6 — Why we win</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-20 max-w-2xl leading-tight">
              Five moats. Each one compounds.
            </motion.h2>

            <div className="space-y-12">
              {[
                {
                  icon: "📊",
                  title: "The Investment + Credit Data Moat",
                  desc: "After 18 months of multi-platform UPI data, Mehnat has both an investment behavior profile AND a credit underwriting model that no bank, NBFC, or AMC can replicate. Banks see zero data on gig workers. We see everything — earnings, spending, saving, investing behavior. This advantage widens every month."
                },
                {
                  icon: "🤝",
                  title: "The Platform Partnership Moat",
                  desc: "Once signed as Swiggy's official financial wellness partner, we have exclusive access to their rider base. Swiggy cannot sign two competing products. First mover wins permanently."
                },
                {
                  icon: "🛡️",
                  title: "The Trust Moat",
                  desc: "Gig workers share financial data with us because we never mis-sell, never push products, never earn from their bad decisions. This brand trust — built over 12-18 months of honest behavior — is impossible to buy."
                },
                {
                  icon: "⚖️",
                  title: "The Regulatory Moat",
                  desc: "Account Aggregator compliance + AMFI registration + insurance broking license takes 12-18 months to obtain. New entrants face the same regulatory timeline we already completed. We have a structural head start."
                },
                {
                  icon: "🗣️",
                  title: "The Language Moat",
                  desc: "AI fine-tuned on Bhojpuri, Marathi, Tamil, Telugu financial conversations doesn't exist anywhere. Building this corpus takes years. Every month we operate, our vernacular model gets better. No incumbent has this."
                }
              ].map((moat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-24 h-24 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-xl">
                    {moat.icon}
                  </div>
                  <div className={`flex-1 ${i % 2 !== 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <h3 className="text-2xl font-bold text-[#F59E0B] mb-3">{moat.title}</h3>
                    <p className="text-lg text-white/70 leading-relaxed">{moat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 8 — FAILURE MODES */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 6 of 6 — What could kill us</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              Honest. Here&apos;s what could go wrong — and how we survive it.
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, rotate: -1 }} className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-red-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-red-100">Platform builds it themselves</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">Risk: HIGH</div>
                <p className="text-sm text-white/60 mb-6">Swiggy/Ola sees our success and builds internally.</p>
                <div className="pt-6 border-t border-red-500/20">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">Sign them as partners before they notice the gap. Cross-platform data (Swiggy + Zomato combined) is our moat they cannot replicate.</p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, rotate: 1 }} className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-red-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-red-100">Trust collapse from one bad incident</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded">Risk: HIGH</div>
                <p className="text-sm text-white/60 mb-6">A failed insurance claim goes viral. Brand destroyed overnight.</p>
                <div className="pt-6 border-t border-red-500/20">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">Human-in-loop for all claims {'>'}₹5,000. 24-hour resolution guarantee. Pre-built crisis communication playbook.</p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-amber-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-amber-100">RBI restricts income smoothing</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">Risk: MEDIUM</div>
                <p className="text-sm text-white/60 mb-6">Regulatory reclassification as deposit-taking activity.</p>
                <div className="pt-6 border-t border-amber-500/20">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">Architect as scheduled liquid fund redemption, not deposit. Legal opinion obtained before launch. NBFC backup structure.</p>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-amber-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-amber-100">CAC spikes without platform deal</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">Risk: MEDIUM</div>
                <p className="text-sm text-white/60 mb-6">No platform partner = expensive direct acquisition.</p>
                <div className="pt-6 border-t border-amber-500/20">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">3-channel distribution: platforms + petrol pumps + rider champions. Never dependent on single channel.</p>
                </div>
              </motion.div>

              {/* Card 5 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, rotate: -1 }} className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-green-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-green-100">AI forecast accuracy drops</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">Risk: LOW</div>
                <p className="text-sm text-white/60 mb-6">Bad weather model or wrong festival prediction destroys trust.</p>
                <div className="pt-6 border-t border-green-500/20">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">Conservative confidence bands. Always show ±range. Under-promise, over-deliver. Retrain model monthly.</p>
                </div>
              </motion.div>

              {/* Card 6 */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, rotate: 1 }} className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldAlert className="text-green-500 shrink-0 mt-1" />
                  <h3 className="text-lg font-bold text-green-100">Loan default rate spikes</h3>
                </div>
                <div className="mb-4 inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">Risk: LOW</div>
                <p className="text-sm text-white/60 mb-6">Economic shock causes mass defaults.</p>
                <div className="pt-6 border-t border-green-500/20">
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider block mb-2">Mitigation</span>
                  <p className="text-sm text-white/80">Auto-deduct from platform payouts before worker sees money. Default rate structurally near-zero.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 9 — GLOBAL VALIDATION */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Because we didn&apos;t just think this up</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              Proven models from similar markets.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🇮🇩</div>
                <h3 className="text-xl font-bold text-white mb-2">Bank Jago × Gojek</h3>
                <p className="text-[#F59E0B] text-sm font-semibold mb-6">Indonesia 2021</p>
                <p className="text-white/70 italic">&quot;Embedded banking + investment products directly into gig app. 61.7% unbanked workers banked. Investment pockets built into the same interface where they earn. Exact model. Different country.&quot;</p>
              </motion.div>
              
              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🇰🇷</div>
                <h3 className="text-xl font-bold text-white mb-2">Kakao 26-Week Challenge</h3>
                <p className="text-[#F59E0B] text-sm font-semibold mb-6">South Korea</p>
                <p className="text-white/70 italic">&quot;Gamified escalating savings. 30 million accounts. 7% interest. Behavioral design unlocks saving.&quot;</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="text-4xl mb-4">🇧🇷</div>
                <h3 className="text-xl font-bold text-white mb-2">Nubank Caixinhas</h3>
                <p className="text-[#F59E0B] text-sm font-semibold mb-6">Brazil</p>
                <p className="text-white/70 italic">&quot;Visual goal vaults with daily yield. 100M users. ₹0 to investor in 3 years. Visible yield builds trust.&quot;</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 10 — CLOSING */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center pt-20">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 1.5 } }
            }}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } }
              }} 
              className="text-4xl md:text-5xl font-bold text-white/80 leading-tight"
            >
              The question isn&apos;t whether gig workers<br/>need this.
            </motion.h2>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } }
              }} 
              className="text-4xl md:text-5xl font-bold text-white leading-tight mt-12"
            >
              They clearly do.
            </motion.h2>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } }
              }} 
              className="text-4xl md:text-6xl font-black text-[#F59E0B] leading-tight mt-24 max-w-4xl mx-auto"
            >
              The question is whether we give India&apos;s 30 crore gig workers their first real investment account before someone else does.
            </motion.h2>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1 } }
              }} 
              className="mt-32 border-t border-white/10 pt-16 flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Mehnat — Aapki Kamai, Aapka Control</h3>
              <p className="text-white/60 mb-1">Krishna &middot; +91 7337211721</p>
              <p className="text-white/40 text-sm mb-12">Built for Zupee Case Study &middot; May 2026</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onClose}
                  className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  Close and return to site
                </button>
                <Link 
                  href="/demo"
                  onClick={onClose}
                  className="px-8 py-4 rounded-xl bg-[#F59E0B] text-black font-bold hover:bg-[#FCD34D] transition-colors flex items-center justify-center gap-2"
                >
                  Try the App <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </motion.div>
  );
}
