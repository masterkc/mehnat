"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Building2, CheckCircle2, ShieldCheck, Droplets, Calendar, Target, Rocket, ArrowRight } from "lucide-react";

export default function InvestPage() {
  const [ticker, setTicker] = useState(0.001);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + 0.002);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0D1117] min-h-screen pt-20 pb-24 font-sans text-white">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Apna Paisa <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EA043] to-[#45b75a]">Kaam Pe Lagao</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#8B949E] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Idle money loses value every day. Mehnat puts your earnings to work — safely, instantly, with full liquidity.
        </motion.p>
      </section>

      {/* ─── BANK PARTNERSHIP BANNER ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1e4620] to-[#161B22] border border-[#2EA043]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(46,160,67,0.15)] flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-[#2EA043]" />
              <h2 className="text-2xl md:text-3xl font-bold">Open a Zero-Balance Bank Account</h2>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Mehnat has partnered with <span className="font-semibold text-white">[Partner Bank]</span> to offer India's first bank account built exclusively for gig workers.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Zero minimum balance",
                "Instant account opening (Aadhaar)",
                "Earnings auto-credited daily",
                "Debit card with fuel cashback"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#21262D] border border-[#30363D] rounded-full px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2EA043]" />
                  <span className="text-sm text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button className="bg-[#238636] hover:bg-[#2EA043] transition-colors text-white font-semibold py-4 px-8 rounded-xl shadow-lg w-full md:w-auto text-lg flex items-center justify-center gap-2">
              Open Account in 3 Minutes <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full md:w-72 bg-[#0D1117]/50 rounded-2xl p-6 border border-[#30363D] flex flex-col items-center text-center shrink-0 backdrop-blur-sm">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
              <span className="text-gray-900 font-bold text-xl">BANK</span>
            </div>
            <p className="font-semibold text-white mb-4">Powered by RBI-regulated banking partner</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#2EA043]" />
              <span>Your money is insured up to ₹5 lakh under DICGC</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── INVESTMENT BUCKETS ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose where your money grows</h2>
          <p className="text-gray-400 text-lg">All funds are SEBI-regulated. Withdraw anytime.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bucket 1 */}
          <div className="bg-[#161B22] border border-[#30363D] hover:border-[#2EA043]/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#2EA043]/10 text-[#2EA043] text-xs font-bold px-3 py-1 rounded-full">INSTANT WITHDRAWAL</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#2EA043]/20 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-[#2EA043]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Aaj Ka Paisa</h3>
                <p className="text-gray-400 text-sm">Today's Money</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Returns</p>
                <p className="text-2xl font-bold text-[#2EA043]">~6.5-7% <span className="text-sm font-normal text-gray-400">p.a.</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk</p>
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-2 h-2 rounded-full bg-[#2EA043]"></div>
                  <span className="text-sm font-medium text-white">Very Low</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Minimum</p>
                <p className="text-lg font-semibold text-white">₹100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fund Type</p>
                <p className="text-sm font-medium text-white">Liquid Mutual Fund</p>
              </div>
            </div>

            <div className="bg-[#0D1117] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-300 font-medium mb-2">Best for: <span className="text-white">Daily expenses buffer. Withdraw in 30 minutes.</span></p>
              <p className="text-sm text-gray-400 leading-relaxed">Earnings auto-sweep here daily. Withdraw to UPI instantly.</p>
            </div>

            <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white font-semibold py-3 rounded-lg mb-4 transition-colors">
              Invest Now
            </button>
            <p className="text-center text-xs text-gray-500">Powered by Nippon India Liquid Fund, HDFC Liquid Fund</p>
          </div>

          {/* Bucket 2 */}
          <div className="bg-[#161B22] border border-[#30363D] hover:border-[#3b82f6]/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-bold px-3 py-1 rounded-full">7-DAY WITHDRAWAL</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Hafte Ka Paisa</h3>
                <p className="text-gray-400 text-sm">Weekly Money</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Returns</p>
                <p className="text-2xl font-bold text-[#3b82f6]">~7-7.5% <span className="text-sm font-normal text-gray-400">p.a.</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk</p>
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                  <span className="text-sm font-medium text-white">Low</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Minimum</p>
                <p className="text-lg font-semibold text-white">₹500</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fund Type</p>
                <p className="text-sm font-medium text-white">Ultra Short Duration Fund</p>
              </div>
            </div>

            <div className="bg-[#0D1117] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-300 font-medium mb-2">Best for: <span className="text-white">Weekly expenses planning. Better than savings.</span></p>
              <p className="text-sm text-gray-400 leading-relaxed">Park weekly surplus here. Auto-redeems every Sunday.</p>
            </div>

            <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white font-semibold py-3 rounded-lg mb-4 transition-colors">
              Invest Now
            </button>
            <p className="text-center text-xs text-gray-500">Powered by ICICI Pru Ultra Short Term, Axis Ultra Short</p>
          </div>

          {/* Bucket 3 */}
          <div className="bg-[#161B22] border border-[#30363D] hover:border-[#f59e0b]/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-bold px-3 py-1 rounded-full">30-DAY WITHDRAWAL</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mahine Ka Paisa</h3>
                <p className="text-gray-400 text-sm">Monthly Money</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Returns</p>
                <p className="text-2xl font-bold text-[#f59e0b]">~7.5-8.5% <span className="text-sm font-normal text-gray-400">p.a.</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk</p>
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                  <span className="text-sm font-medium text-white">Low-Medium</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Minimum</p>
                <p className="text-lg font-semibold text-white">₹1,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fund Type</p>
                <p className="text-sm font-medium text-white">Short Duration / Arbitrage</p>
              </div>
            </div>

            <div className="bg-[#0D1117] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-300 font-medium mb-2">Best for: <span className="text-white">Monthly goals — rent buffer, family send.</span></p>
              <p className="text-sm text-gray-400 leading-relaxed">Lock for 30 days. Better returns. Auto-unlocks on target date.</p>
            </div>

            <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white font-semibold py-3 rounded-lg mb-4 transition-colors">
              Invest Now
            </button>
            <p className="text-center text-xs text-gray-500">Powered by Kotak Short Term, HDFC Arbitrage</p>
          </div>

          {/* Bucket 4 */}
          <div className="bg-[#161B22] border border-[#30363D] hover:border-[#a855f7]/50 transition-colors rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#a855f7]/10 text-[#a855f7] text-xs font-bold px-3 py-1 rounded-full">90-DAY WITHDRAWAL</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#a855f7]/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-[#a855f7]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Sapno Ka Paisa</h3>
                <p className="text-gray-400 text-sm">Dream Money</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Returns</p>
                <p className="text-2xl font-bold text-[#a855f7]">~10-12% <span className="text-sm font-normal text-gray-400">p.a.</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk</p>
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-2 h-2 rounded-full bg-[#a855f7]"></div>
                  <span className="text-sm font-medium text-white">Medium</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Minimum</p>
                <p className="text-lg font-semibold text-white">₹500</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Fund Type</p>
                <p className="text-sm font-medium text-white">Balanced / Equity Hybrid</p>
              </div>
            </div>

            <div className="bg-[#0D1117] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-300 font-medium mb-2">Best for: <span className="text-white">Scooter upgrade, phone, house savings.</span></p>
              <p className="text-sm text-gray-400 leading-relaxed">Higher returns for bigger goals. AI builds your goal timeline.</p>
            </div>

            <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white font-semibold py-3 rounded-lg mb-4 transition-colors">
              Invest Now
            </button>
            <p className="text-center text-xs text-gray-500">Powered by HDFC Balanced Advantage, SBI Equity Hybrid</p>
          </div>
        </div>
      </section>

      {/* ─── LIVE YIELD SECTION ─── */}
      <section className="w-full bg-[#161B22] border-y border-[#30363D] py-20 mb-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-lg h-full bg-[#2EA043]/5 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-12">Dekho aapka paisa badhta hua</h2>
          
          <div className="bg-[#0D1117] border border-[#30363D] rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
            <h3 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              ₹10,000
            </h3>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-xl md:text-2xl text-gray-400">Aaj ka yield:</span>
              <span className="text-2xl md:text-3xl font-bold text-[#2EA043] font-mono tracking-wider">
                +₹1.89<span className="text-xl opacity-70 transition-all duration-300">{ticker.toFixed(3).substring(1)}</span>
              </span>
            </div>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              This is what ₹10,000 in <strong className="text-white font-medium">Aaj Ka Paisa</strong> bucket earns daily. Completely liquid. Withdraw anytime.
            </p>

            <div className="bg-[#21262D] border border-[#30363D] rounded-xl p-6 max-w-lg mx-auto">
              <p className="text-gray-400 mb-2">Compare: Same ₹10,000 in savings account earns ₹0.74/day at 2.7%</p>
              <p className="text-[#2EA043] font-bold text-lg">You earn 2.5x more</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#30363D] -z-10"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#21262D] border-4 border-[#0D1117] flex items-center justify-center mb-6 shadow-xl">
              <span className="text-2xl font-bold text-gray-300">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Earnings arrive</h3>
            <p className="text-gray-400">Your daily gig payouts arrive directly in your Mehnat account.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#2EA043]/20 border-4 border-[#0D1117] flex items-center justify-center mb-6 shadow-xl">
              <span className="text-2xl font-bold text-[#2EA043]">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">AI sweeps balance</h3>
            <p className="text-gray-400">Our intelligence automatically moves idle balance to the best bucket for you.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#21262D] border-4 border-[#0D1117] flex items-center justify-center mb-6 shadow-xl">
              <span className="text-2xl font-bold text-gray-300">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Watch it grow</h3>
            <p className="text-gray-400">Your money earns daily yields. Withdraw back to UPI in minutes when needed.</p>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMERS ─── */}
      <section className="max-w-4xl mx-auto px-6 text-center border-t border-[#30363D] pt-12">
        <p className="text-xs text-gray-500 leading-relaxed">
          Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully. 
          Past performance is not indicative of future returns. Mehnat is an AMFI-registered mutual fund distributor. 
          Returns shown are approximate annualized historical returns of the underlying schemes and are not guaranteed.
        </p>
      </section>
    </div>
  );
}
