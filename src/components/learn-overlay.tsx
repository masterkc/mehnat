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
              <span className="text-white/40">Zero financial products built for them.</span><br/>
              <span className="text-[#F59E0B]">Mehnat fixes this.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">₹500 Cr ARR potential</div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium">30 Cr TAM</div>
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
              An AI financial OS for gig workers.<br/>
              Built for how they actually earn.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-16">
              <motion.div variants={fadeUp} className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  Mehnat is a WhatsApp-first AI product that gives India&apos;s 30 crore gig and informal workers three things they&apos;ve never had:
                </p>
                <div className="space-y-6 mt-8">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">1</div>
                    <p><strong className="text-white">A daily spend allowance</strong> based on their actual irregular earnings — delivered every morning at 6 AM as a voice note in Hindi.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">2</div>
                    <p><strong className="text-white">A 4-minute micro-loan</strong> based on earnings history — not salary slips or CIBIL scores.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-[#F59E0B] font-bold">3</div>
                    <p><strong className="text-white">₹15/month insurance</strong> that auto-claims without paperwork when they can&apos;t work.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
                {[
                  "WhatsApp-first · No app download",
                  "8 Indian languages · Voice + text",
                  "Account Aggregator powered · RBI-aligned",
                  "AI cashflow forecasting · 94% accurate",
                  "4 investment buckets · SEBI-regulated",
                  "Auto-claim insurance · 24hr payout"
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-center text-center text-sm font-medium h-24">
                    {spec}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2 — TAM */}
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
                  <p className="text-sm text-white/50">Total informal workforce (Economic Survey 2025-26)</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[85%] bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">30 Crore</h3>
                  <p className="text-sm text-white/50">Gig + daily wage + UPI-paid workers</p>
                </motion.div>
                <motion.div variants={fadeUp} className="w-[70%] bg-white/5 border border-white/10 p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">10 Crore</h3>
                  <p className="text-sm text-white/50">Smartphone + UPI enabled</p>
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
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">15M Riders</h4>
                  <p className="text-sm text-white/60">Swiggy, Zomato, Ola, Rapido, Uber</p>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">50M Daily wage</h4>
                  <p className="text-sm text-white/60">Construction, factories, households via UPI</p>
                </motion.div>
                <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-[#F59E0B] mb-2">13M Kiranas</h4>
                  <p className="text-sm text-white/60">Irregular income, micro-merchants</p>
                </motion.div>
              </div>
            </div>

            <motion.div variants={fadeUp} className="mt-12 bg-white/5 border border-white/10 p-8 text-center rounded-2xl text-lg text-white/80 max-w-3xl mx-auto">
              These users have smartphones. They use UPI daily. They just have <strong>NO financial product</strong> built for how they actually earn.
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3 — PRODUCT ADOPTION */}
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
                  535 million Indians use WhatsApp daily. Mehnat delivers everything via WhatsApp — no app download, no new login, no learning curve. The product arrives in their existing inbox.
                </p>
                <div className="text-xs font-mono text-green-400/80 bg-green-500/10 px-3 py-1.5 rounded-md inline-block">STAT: 535M WA users</div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-blue-500/10 border border-blue-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="text-5xl mb-6">💸</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Already using UPI</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Every gig worker already receives earnings via UPI from platforms. Mehnat plugs into existing payment flows via Account Aggregator — one-time consent, reads all platforms.
                </p>
                <div className="text-xs font-mono text-blue-400/80 bg-blue-500/10 px-3 py-1.5 rounded-md inline-block">STAT: 900M+ UPI txns/day</div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="text-2xl font-bold mb-4 text-[#F59E0B]">Trusts their platform</h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We distribute through Swiggy/Zomato/Ola as a rider benefit. Workers trust their platform more than a new app. Platform co-branding removes the trust barrier entirely.
                </p>
                <div className="text-xs font-mono text-[#F59E0B]/80 bg-[#F59E0B]/10 px-3 py-1.5 rounded-md inline-block">STAT: 60% rider churn</div>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="bg-[#161B22] border border-[#30363D] rounded-3xl p-10 overflow-hidden">
              <h3 className="text-2xl font-bold mb-8">Every adoption barrier — solved</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 font-semibold text-white/50 w-1/3">Barrier</th>
                      <th className="pb-4 font-semibold text-white/50 w-1/3">Traditional Fintech</th>
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

        {/* SECTION 4 — MONETIZATION */}
        <section className="py-32 border-b border-white/10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <motion.p variants={fadeUp} className="text-sm font-bold text-[#F59E0B] tracking-widest mb-6 uppercase">Question 4 of 6 — How we make money</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-16 max-w-2xl leading-tight">
              Four revenue streams.<br/>
              All aligned with the worker.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-green-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2">₹800</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6">Per user / year</span>
                <h4 className="text-lg font-bold text-green-400 mb-3">Micro-loan spread</h4>
                <p className="text-sm text-white/70 flex-1">We lend at 14% APR. Cost of capital ~8%. Spread: 6%. Average loan ₹6,000. Auto-repaid from daily payouts.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-amber-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2">₹180</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6">Per user / year</span>
                <h4 className="text-lg font-bold text-amber-400 mb-3">Insurance commission</h4>
                <p className="text-sm text-white/70 flex-1">₹15/month bundle. Partner insurer pays us 20% commission. Scales highly with automated claims efficiency.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-blue-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2">₹200</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6">Per user / year</span>
                <h4 className="text-lg font-bold text-blue-400 mb-3">AMC commission</h4>
                <p className="text-sm text-white/70 flex-1">0.5-1% trail commission on AUM. At ₹5,000 avg invested per user = ₹25-50/year initially. Compounds as AUM grows.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border-t-4 border-t-purple-500 border-x border-b border-white/10 p-6 rounded-b-2xl rounded-t-sm flex flex-col">
                <span className="text-[60px] md:text-[80px] font-black leading-none tracking-tighter mb-2">₹200</span>
                <span className="text-xs text-white/50 font-bold tracking-wider uppercase mb-6">Per user / year</span>
                <h4 className="text-lg font-bold text-purple-400 mb-3">Premium sub</h4>
                <p className="text-sm text-white/70 flex-1">₹99/month for advanced features: family OS, income smoothing, priority processing.</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <motion.div variants={fadeUp} className="bg-[#F59E0B] text-black p-10 rounded-3xl flex flex-col justify-center">
                <p className="text-black/70 font-bold uppercase tracking-widest mb-2">Total Potential</p>
                <div className="text-5xl md:text-7xl font-black tracking-tighter mb-4">₹1,180 <span className="text-3xl">/ user / yr</span></div>
                <div className="h-px bg-black/10 my-4"></div>
                <p className="text-xl font-medium">At 1 crore users = ₹1,180 crore gross revenue</p>
                <p className="text-xl font-bold mt-2">Net ARR (after costs) = ~₹500 crore</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col justify-center space-y-6">
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">CAC</p>
                  <p className="text-2xl font-bold">₹50 <span className="text-sm font-normal text-white/50">(B2B2C)</span></p>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">LTV:CAC Ratio</p>
                  <p className="text-2xl font-bold text-[#F59E0B]">23.6x</p>
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">Payback Period</p>
                  <p className="text-2xl font-bold">15 days</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 5 — MOAT */}
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
                  title: "The Cashflow Data Moat",
                  desc: "After 18 months of multi-platform UPI data, Mehnat has a credit underwriting model that no bank or NBFC can replicate. Banks see zero data on gig workers. We see everything. This advantage widens every month."
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

        {/* SECTION 6 — FAILURE MODES */}
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

        {/* SECTION 7 — GLOBAL VALIDATION */}
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
                <p className="text-white/70 italic">&quot;Embedded banking in gig app. 61.7% unbanked workers banked. Same model. Different country.&quot;</p>
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

        {/* SECTION 8 — CLOSING */}
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
              The question is whether we build it before someone else does.
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
