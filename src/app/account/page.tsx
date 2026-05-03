"use client";

import { motion } from "framer-motion";
import { Copy, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Download, ShieldCheck, CheckCircle2, Clock, PlusCircle, SendHorizontal, Building2, Smartphone } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="bg-[#0D1117] min-h-screen pt-20 pb-24 font-sans text-white">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Aapka Mehnat Account
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#8B949E] text-lg"
        >
          India's first bank account built for gig workers
        </motion.p>
      </section>

      {/* ─── BANK ACCOUNT DETAILS CARD ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-[#30363D] rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
            {/* Left side: Account Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-8">
                <span className="bg-[#2EA043]/20 text-[#2EA043] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
                <span className="bg-[#21262D] border border-[#30363D] text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                  Savings (Zero Balance)
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Account Holder</p>
                  <p className="text-xl md:text-2xl font-bold tracking-wide">Rajesh Kumar</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-lg tracking-wider">XXXX XXXX 4521</p>
                      <button className="text-gray-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">IFSC Code</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-lg tracking-wider">PTNR0001234</p>
                      <button className="text-gray-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">UPI ID</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#7C3AED]">rajesh.mehnat@partner</p>
                    <button className="text-gray-500 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Bank Logo & Actions */}
            <div className="w-full md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#30363D] pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="font-semibold text-white">Partner Bank</p>
                  <p className="text-xs text-gray-500">RBI Regulated</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] transition-colors border border-[#30363D] rounded-xl py-3 px-2">
                  <PlusCircle className="w-5 h-5 text-[#2EA043]" />
                  <span className="text-xs font-semibold">Add Money</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] transition-colors border border-[#30363D] rounded-xl py-3 px-2">
                  <SendHorizontal className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-semibold">Send</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] transition-colors border border-[#30363D] rounded-xl py-3 px-2">
                  <Download className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-semibold">Statement</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] transition-colors border border-[#30363D] rounded-xl py-3 px-2">
                  <CreditCard className="w-5 h-5 text-[#7C3AED]" />
                  <span className="text-xs font-semibold">Get Card</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── LINKED INVESTMENTS SUMMARY ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-[#8B949E]" /> Linked Investments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:border-[#2EA043]/50 transition-colors">
            <p className="text-gray-400 text-sm mb-2 font-medium">Aaj Ka Paisa</p>
            <p className="text-2xl font-bold text-white mb-2">₹2,340</p>
            <p className="text-xs font-medium text-[#2EA043] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +₹4.52 today
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:border-[#3b82f6]/50 transition-colors">
            <p className="text-gray-400 text-sm mb-2 font-medium">Hafte Ka Paisa</p>
            <p className="text-2xl font-bold text-white mb-2">₹5,000</p>
            <p className="text-xs font-medium text-[#3b82f6] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +₹9.86 today
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:border-[#f59e0b]/50 transition-colors">
            <p className="text-gray-400 text-sm mb-2 font-medium">Mahine Ka Paisa</p>
            <p className="text-2xl font-bold text-white mb-2">₹3,000</p>
            <p className="text-xs font-medium text-[#f59e0b] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +₹6.84 today
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 hover:border-[#a855f7]/50 transition-colors">
            <p className="text-gray-400 text-sm mb-2 font-medium truncate">Sapno Ka Paisa <span className="text-xs opacity-60">(Scooter)</span></p>
            <p className="text-2xl font-bold text-white mb-2">₹8,200</p>
            <p className="text-xs font-medium text-[#a855f7] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +₹22.19 today
            </p>
          </div>
        </div>
      </section>

      {/* ─── ACCOUNT BENEFITS BANNER ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <h2 className="text-xl font-bold mb-6">Why Mehnat + [Partner Bank] is different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-[#2EA043]/20 p-2 rounded-lg shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#2EA043]" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Zero balance required</p>
              <p className="text-xs text-gray-400">No penalties for low balances</p>
            </div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
              <Download className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Daily earnings credited</p>
              <p className="text-xs text-gray-400">Direct integration with Swiggy/Zomato</p>
            </div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-purple-500/20 p-2 rounded-lg shrink-0">
              <CreditCard className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Free VISA debit card</p>
              <p className="text-xs text-gray-400">With 2% cashback on fuel pumps</p>
            </div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-amber-500/20 p-2 rounded-lg shrink-0">
              <Smartphone className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Instant KYC</p>
              <p className="text-xs text-gray-400">Aadhaar-based opening in 5 minutes</p>
            </div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">DICGC Insured</p>
              <p className="text-xs text-gray-400">Protected up to ₹5 lakh by RBI</p>
            </div>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 flex items-start gap-3">
            <div className="bg-pink-500/20 p-2 rounded-lg shrink-0">
              <Clock className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Gig worker banking hours</p>
              <p className="text-xs text-gray-400">Priority support from 6 AM to 11 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MINI STATEMENT ─── */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <button className="text-sm text-[#7C3AED] hover:text-white transition-colors font-medium">View All</button>
        </div>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#21262D] border-b border-[#30363D] text-xs uppercase text-gray-400 tracking-wider">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                  <th className="px-6 py-4 font-semibold text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363D] text-sm">
                <tr className="hover:bg-[#21262D]/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap">Today, 11:42 AM</td>
                  <td className="px-6 py-4 font-medium">Swiggy Payout - Batch A</td>
                  <td className="px-6 py-4 text-right font-bold text-[#2EA043]">+₹340.00</td>
                  <td className="px-6 py-4 text-right text-gray-300">₹1,240.50</td>
                </tr>
                <tr className="hover:bg-[#21262D]/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap">Today, 9:15 AM</td>
                  <td className="px-6 py-4 font-medium">Auto-Sweep: Aaj Ka Paisa</td>
                  <td className="px-6 py-4 text-right text-white">-₹200.00</td>
                  <td className="px-6 py-4 text-right text-gray-300">₹900.50</td>
                </tr>
                <tr className="hover:bg-[#21262D]/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap">Yesterday</td>
                  <td className="px-6 py-4 font-medium">Indian Oil Fuel (Card ...4521)</td>
                  <td className="px-6 py-4 text-right text-white">-₹350.00</td>
                  <td className="px-6 py-4 text-right text-gray-300">₹1,100.50</td>
                </tr>
                <tr className="hover:bg-[#21262D]/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap">Yesterday</td>
                  <td className="px-6 py-4 font-medium text-[#2EA043] text-xs">↳ Fuel Cashback (2%)</td>
                  <td className="px-6 py-4 text-right font-bold text-[#2EA043]">+₹7.00</td>
                  <td className="px-6 py-4 text-right text-gray-300">₹1,450.50</td>
                </tr>
                <tr className="hover:bg-[#21262D]/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap">14 Oct 2026</td>
                  <td className="px-6 py-4 font-medium">Zomato Payout Weekly</td>
                  <td className="px-6 py-4 text-right font-bold text-[#2EA043]">+₹4,250.00</td>
                  <td className="px-6 py-4 text-right text-gray-300">₹1,443.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
