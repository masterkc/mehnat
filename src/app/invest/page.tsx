"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { fdData, liquidFunds, shortFunds, hybridFunds } from "./fund-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Fund = { name: string; initials: string; color: string; cat: string; y1: string; y3: string; y5: string; risk: string; riskColor: string; sip: string; lump: string; exit: string; tag?: string };

function FundCard({ f }: { f: Fund }) {
  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 hover:border-[#059669]/40 transition-colors">
      {f.tag && <span className="inline-block mb-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#059669]/10 text-[#059669]">{f.tag}</span>}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: f.color }}>{f.initials}</div>
        <div><p className="font-semibold text-white text-sm">{f.name}</p><p className="text-xs text-gray-500">{f.cat}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4 bg-[#0D1117] rounded-lg p-3">
        <div><p className="text-[10px] text-gray-500 mb-0.5">1Y Return</p><p className="text-sm font-bold text-[#059669]">{f.y1}</p></div>
        <div><p className="text-[10px] text-gray-500 mb-0.5">3Y Return</p><p className="text-sm font-bold text-[#059669]">{f.y3}</p></div>
        <div><p className="text-[10px] text-gray-500 mb-0.5">5Y Return</p><p className="text-sm font-bold text-[#059669]">{f.y5}</p></div>
      </div>
      <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.riskColor }} /><span className="text-xs text-gray-400">{f.risk} Risk</span></div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
        <p>Min SIP: <span className="text-white">{f.sip}</span></p>
        <p>Lumpsum: <span className="text-white">{f.lump}</span></p>
        <p className="col-span-2">Exit Load: <span className="text-white">{f.exit}</span></p>
      </div>
      <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">Invest</button>
    </div>
  );
}

export default function InvestPage() {
  const [tab, setTab] = useState("all");
  const [sipAmt, setSipAmt] = useState(2000);
  const [sipRate, setSipRate] = useState(8);
  const [sipYrs, setSipYrs] = useState(3);

  const sipCalc = useMemo(() => {
    const m = sipAmt, r = sipRate / 100 / 12, n = sipYrs * 12;
    const fv = m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const inv = m * n;
    return { total: Math.round(fv), invested: inv, gained: Math.round(fv - inv) };
  }, [sipAmt, sipRate, sipYrs]);

  const chartData = useMemo(() => {
    const r = sipRate / 100 / 12;
    return Array.from({ length: sipYrs }, (_, i) => {
      const n = (i + 1) * 12;
      const fv = sipAmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      return { year: `Y${i + 1}`, value: Math.round(fv) };
    });
  }, [sipAmt, sipRate, sipYrs]);

  const tabs = ["all", "fd", "liquid", "debt", "hybrid"];
  const tabLabels: Record<string, string> = { all: "All Products", fd: "Fixed Deposits", liquid: "Liquid Funds", debt: "Debt Funds", hybrid: "Hybrid Funds" };

  return (
    <div className="bg-[#0D1117] min-h-screen pt-20 pb-24 text-white">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
          Invest Your Earnings. <span className="text-[#059669]">Grow Your Wealth.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          SEBI-regulated mutual funds and fixed deposits. Built for gig workers. Starting ₹100.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span>₹100 minimum investment</span><span className="hidden sm:inline">·</span>
          <span>Instant withdrawal available</span><span className="hidden sm:inline">·</span>
          <span>SEBI regulated</span><span className="hidden sm:inline">·</span>
          <span>AMFI registered</span>
        </div>
      </section>

      {/* BANK BANNER */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-r from-[#0c1425] to-[#161B22] border border-[#D97706]/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D97706] uppercase mb-4 block">Exclusive Banking Partner</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Open a Zero-Balance Account<br/><span className="text-gray-400 text-2xl">Powered by [Partner Bank]</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">India&apos;s first savings account built specifically for gig workers. No minimum balance. Daily earnings auto-credited. Aadhaar-based KYC in 5 minutes.</p>
            <div className="space-y-2.5 mb-8 text-sm text-gray-300">
              {["Zero minimum balance requirement", "Instant Aadhaar-based account opening", "Daily platform earnings auto-credited", "Free VISA debit card with fuel cashback", "DICGC insured up to ₹5,00,000"].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5"><ArrowRight className="w-3.5 h-3.5 text-[#D97706] shrink-0" /><span>{b}</span></div>
              ))}
            </div>
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold py-3.5 px-8 rounded-xl transition-colors">Open Account — 5 Minutes</button>
            <p className="text-xs text-gray-500 mt-2">No documents needed beyond Aadhaar</p>
          </div>
          {/* Bank Card Mockup */}
          <div className="w-full md:w-80 shrink-0">
            <div className="aspect-[1.6/1] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
              <p className="text-xs font-bold tracking-widest text-white/60 mb-8">MEHNAT</p>
              <p className="text-lg tracking-[0.3em] text-white/70 font-mono mb-1">●●●● ●●●● ●●●● 4521</p>
              <p className="text-[10px] text-white/40 mb-6">Savings Account — Zero Balance</p>
              <div className="flex justify-between items-end">
                <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded text-[10px] font-bold tracking-wider text-white/70">PARTNER BANK</div>
                <p className="text-sm font-bold italic text-white/50">VISA</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />RBI Regulated</div>
              <div className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />DICGC Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="max-w-5xl mx-auto px-6 mb-6">
        <h2 className="text-2xl font-bold mb-1">Choose Your Investment</h2>
        <p className="text-sm text-gray-500 mb-6">All products are SEBI-regulated. Returns are indicative based on historical data.</p>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === t ? "bg-white text-black" : "bg-[#21262D] text-gray-400 hover:text-white"}`}>{tabLabels[t]}</button>
          ))}
        </div>
      </section>

      {/* FD TABLE */}
      {(tab === "all" || tab === "fd") && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <h3 className="text-lg font-bold mb-1">Fixed Deposits — Guaranteed Returns</h3>
          <p className="text-xs text-gray-500 mb-4">Capital protected. Returns guaranteed.</p>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#30363D] text-gray-500 text-xs">
                <th className="text-left p-4 font-medium">Bank</th><th className="text-left p-4 font-medium">Tenure</th><th className="text-left p-4 font-medium">Interest Rate</th><th className="text-left p-4 font-medium">Min Amount</th><th className="p-4"></th>
              </tr></thead>
              <tbody>{fdData.map((fd, i) => (
                <tr key={i} className="border-b border-[#30363D]/50 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4 font-medium text-white flex items-center gap-2">{fd.bank}{fd.tag && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${fd.tagColor === "amber" ? "bg-[#D97706]/10 text-[#D97706]" : fd.tagColor === "green" ? "bg-[#059669]/10 text-[#059669]" : "bg-gray-500/10 text-gray-400"}`}>{fd.tag}</span>}</td>
                  <td className="p-4 text-gray-400">{fd.tenure}</td>
                  <td className="p-4 text-[#059669] font-bold">{fd.rate}</td>
                  <td className="p-4 text-gray-400">{fd.min}</td>
                  <td className="p-4"><button className="bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">Invest Now</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">{fdData.map((fd, i) => (
            <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2"><p className="font-semibold text-sm">{fd.bank}</p>{fd.tag && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${fd.tagColor === "amber" ? "bg-[#D97706]/10 text-[#D97706]" : "bg-[#059669]/10 text-[#059669]"}`}>{fd.tag}</span>}</div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3"><div><p className="text-gray-500">Tenure</p><p className="text-white">{fd.tenure}</p></div><div><p className="text-gray-500">Rate</p><p className="text-[#059669] font-bold">{fd.rate}</p></div><div><p className="text-gray-500">Min</p><p className="text-white">{fd.min}</p></div></div>
              <button className="w-full bg-[#21262D] text-white text-xs font-semibold py-2 rounded-lg">Invest Now</button>
            </div>
          ))}</div>
          <p className="text-[10px] text-gray-600 mt-3">FD rates are indicative and subject to change. Partner bank rates may vary.</p>
        </section>
      )}

      {/* LIQUID FUNDS */}
      {(tab === "all" || tab === "liquid") && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <h3 className="text-lg font-bold mb-1">Liquid Funds — Instant Withdrawal</h3>
          <p className="text-xs text-gray-500 mb-4">Withdraw to your UPI in 30 minutes. Better than savings account.</p>
          <div className="grid md:grid-cols-2 gap-4">{liquidFunds.map((f, i) => <FundCard key={i} f={f} />)}</div>
        </section>
      )}

      {/* SHORT DURATION FUNDS */}
      {(tab === "all" || tab === "debt") && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <h3 className="text-lg font-bold mb-1">Short Duration Funds</h3>
          <p className="text-xs text-gray-500 mb-4">Park weekly or monthly surplus. Better returns than FD for 1-3 month horizon.</p>
          <div className="grid md:grid-cols-2 gap-4">{shortFunds.map((f, i) => <FundCard key={i} f={f} />)}</div>
        </section>
      )}

      {/* HYBRID FUNDS */}
      {(tab === "all" || tab === "hybrid") && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <h3 className="text-lg font-bold mb-1">Hybrid Funds — Growth with Safety</h3>
          <p className="text-xs text-gray-500 mb-4">For 6-12 month horizon. Mix of equity and debt for balanced growth.</p>
          <div className="grid md:grid-cols-2 gap-4">{hybridFunds.map((f, i) => <FundCard key={i} f={f} />)}</div>
        </section>
      )}

      {/* SIP CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 md:p-10">
          <h3 className="text-2xl font-bold mb-1">SIP Calculator</h3>
          <p className="text-sm text-gray-500 mb-8">See how your daily earnings grow over time</p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Monthly Investment</span><span className="font-bold">₹{sipAmt.toLocaleString()}</span></div>
                <input type="range" min={500} max={10000} step={500} value={sipAmt} onChange={e => setSipAmt(+e.target.value)} className="w-full accent-[#059669]" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Expected Return Rate</span><span className="font-bold">{sipRate}%</span></div>
                <input type="range" min={6} max={15} step={0.5} value={sipRate} onChange={e => setSipRate(+e.target.value)} className="w-full accent-[#059669]" />
                <p className="text-[10px] text-gray-600 mt-1">Based on historical fund performance</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Investment Duration</span><span className="font-bold">{sipYrs} {sipYrs === 1 ? "year" : "years"}</span></div>
                <input type="range" min={1} max={10} step={1} value={sipYrs} onChange={e => setSipYrs(+e.target.value)} className="w-full accent-[#059669]" />
              </div>
            </div>
            <div>
              <div className="bg-[#0D1117] rounded-xl p-6 mb-6">
                <p className="text-xs text-gray-500 mb-1">Estimated Returns</p>
                <p className="text-4xl font-black text-white mb-4">₹{sipCalc.total.toLocaleString()}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500 text-xs">Invested</p><p className="font-semibold">₹{sipCalc.invested.toLocaleString()}</p></div>
                  <div><p className="text-gray-500 text-xs">Wealth Gained</p><p className="font-semibold text-[#059669]">+₹{sipCalc.gained.toLocaleString()}</p></div>
                </div>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}><XAxis dataKey="year" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip contentStyle={{ backgroundColor: "#161B22", border: "1px solid #30363D", borderRadius: 8, color: "#fff", fontSize: 12 }} formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, "Value"]} /><Bar dataKey="value" fill="#059669" radius={[4, 4, 0, 0]} /></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 border-t border-[#30363D] pt-4">For Rajesh: If he invests ₹{sipAmt.toLocaleString()}/month from his Swiggy earnings at {sipRate}% for {sipYrs} years, he gets ₹{sipCalc.total.toLocaleString()} on ₹{sipCalc.invested.toLocaleString()} invested.</p>
        </div>
      </section>

      {/* WHY MEHNAT */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "SEBI Regulated", d: "All mutual funds listed are SEBI registered. Mehnat is an AMFI registered mutual fund distributor. ARN: XXXXXXXX" },
            { t: "Zero Hidden Charges", d: "No account opening fee. No transaction charges. AMC expense ratio applies as per scheme documents." },
            { t: "Instant Withdrawal", d: "Liquid fund redemptions processed in T+1 working days. Emergency withdrawals available 24/7 to linked bank account." },
          ].map((c, i) => (
            <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-5 h-5 text-[#059669]" /><h4 className="font-bold">{c.t}</h4></div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="max-w-4xl mx-auto px-6 text-center border-t border-[#30363D] pt-10">
        <p className="text-[10px] text-gray-600 leading-relaxed">
          Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future returns. The NAV of schemes may go up or down depending upon factors and forces affecting securities markets. Mehnat is registered as a mutual fund distributor with AMFI. Registration No: ARN-XXXXXX. Fixed Deposit rates are indicative and subject to change without notice.
        </p>
      </section>
    </div>
  );
}
