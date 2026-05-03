"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, MessageCircle, Zap, Shield, Battery, Wifi, Signal, Play, 
  SendHorizontal, ArrowUpRight, ArrowDownRight, Clock, MapPin, 
  Coffee, CircleDollarSign, LineChart, User, Settings, HelpCircle, 
  CheckCircle2, Download, Menu, X
} from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ───────────────────── Interfaces ───────────────────── */
type Tab = "home" | "invest" | "loans" | "insurance" | "account" | "chat" | "settings" | "help";

interface ChatMsg {
  id: string;
  sender: "ai" | "user";
  type: "text" | "voice";
  content: string;
  time: string;
}

/* ───────────────────── Custom Hooks ───────────────────── */
function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}

/* ───────────────────── Sub-Screens ───────────────────── */

function HomeScreen({ onMenuClick }: { onMenuClick: () => void }) {
  const count = useCountUp(420, 1500);
  const [ticker, setTicker] = useState(287);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5 pb-24 h-full overflow-y-auto bg-[#0D1117] text-white no-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <Menu size={20} className="text-white" />
          </button>
          <p className="text-sm text-gray-400 mt-1">Namaste, Rajesh bhai 🙏</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
          R
        </div>
      </div>

      {/* Quick Summary Scrollable Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar scroll-smooth">
        <div className="min-w-[160px] bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-3 shrink-0 flex flex-col justify-center">
          <p className="text-[10px] text-emerald-400 font-medium mb-1 flex items-center gap-1"><CircleDollarSign size={12}/> Total invested</p>
          <p className="text-lg font-bold text-white">₹18,540</p>
        </div>
        <div className="min-w-[160px] bg-blue-900/30 border border-blue-500/30 rounded-xl p-3 shrink-0 flex flex-col justify-center">
          <p className="text-[10px] text-blue-400 font-medium mb-1 flex items-center gap-1"><Shield size={12}/> Insurance</p>
          <p className="text-lg font-bold text-white">Active ✓</p>
        </div>
        <div className="min-w-[160px] bg-orange-900/30 border border-orange-500/30 rounded-xl p-3 shrink-0 flex flex-col justify-center">
          <p className="text-[10px] text-orange-400 font-medium mb-1 flex items-center gap-1"><Zap size={12}/> Loan</p>
          <p className="text-lg font-bold text-white">₹8,500 eligible</p>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#238636] to-[#1e5c33] p-6 rounded-2xl shadow-lg relative overflow-hidden shrink-0 mt-2"
      >
        <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <p className="text-white/80 text-sm font-medium mb-1">Aaj ka safe kharcha</p>
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">₹{count}</h1>
        <p className="text-white/70 text-xs mb-5">94% confidence · Friday surge expected</p>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-medium py-2 rounded-full backdrop-blur-sm">
            Override
          </button>
          <button className="flex-1 bg-white text-[#1e5c33] text-sm font-medium py-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            Details
          </button>
        </div>
      </motion.div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-xl flex flex-col justify-between">
          <p className="text-gray-400 text-xs mb-2">Aaj ki kamai</p>
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-white">₹{ticker}</span>
            <span className="w-2 h-2 rounded-full bg-[#2EA043] animate-pulse mb-1.5" />
          </div>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-xl flex flex-col justify-between">
          <p className="text-gray-400 text-xs mb-2">Is hafte bachaya</p>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-white">₹1,240</span>
            <ArrowUpRight className="w-4 h-4 text-[#2EA043]" />
          </div>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-xl flex flex-col justify-between">
          <p className="text-gray-400 text-xs mb-2">Loan eligible</p>
          <span className="text-xl font-bold text-white">₹8,500</span>
        </div>
        <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-xl flex flex-col justify-between">
          <p className="text-gray-400 text-xs mb-2">Insurance</p>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#2EA043]" />
            <span className="text-sm font-bold text-[#2EA043]">Active</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-2 shrink-0">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Aapki activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FC8019]/20 flex items-center justify-center">
                <CircleDollarSign className="w-4 h-4 text-[#FC8019]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Swiggy payout</p>
                <p className="text-xs text-gray-500">11:42 AM</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-[#2EA043]">+₹287</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Petrol</p>
                <p className="text-xs text-gray-500">9:30 AM</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-white">-₹120</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Chai + nashta</p>
                <p className="text-xs text-gray-500">8:15 AM</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-white">-₹45</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestScreen({ onMenuClick }: { onMenuClick: () => void }) {
  const [yieldTicker, setYieldTicker] = useState(43.21);

  useEffect(() => {
    const interval = setInterval(() => {
      setYieldTicker((prev) => prev + 0.01);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0D1117] text-white p-5 pb-32 overflow-y-auto relative no-scrollbar">
      {/* Header */}
      <div className="mb-6 pt-2 shrink-0 flex items-start gap-3">
        <button onClick={onMenuClick} className="hover:bg-white/10 p-1.5 rounded-full transition-colors mt-0.5">
          <Menu size={20} className="text-white" />
        </button>
        <div>
          <h2 className="text-xl font-bold">Apna Paisa Kaam Pe Lagao 💹</h2>
          <p className="text-gray-400 text-xs mt-1">All SEBI-regulated. Withdraw anytime.</p>
        </div>
      </div>

      {/* TOTAL INVESTED */}
      <div className="bg-gradient-to-r from-[#1e4620] to-[#161B22] border border-[#2EA043]/30 rounded-2xl p-5 mb-6 shrink-0 relative overflow-hidden">
        <div className="absolute right-[-20%] top-[-50%] w-40 h-40 bg-[#2EA043]/20 rounded-full blur-2xl"></div>
        <p className="text-sm text-gray-300 mb-1">Kul Invested</p>
        <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">₹18,540</h3>
        <p className="text-sm font-medium text-[#45b75a] mb-1">Aaj ka yield: +₹{yieldTicker.toFixed(2)} 🟢</p>
        <p className="text-[10px] text-gray-400">Across all 4 buckets</p>
      </div>

      {/* BUCKET CARDS */}
      <div className="space-y-4 shrink-0">
        {/* Card 1 */}
        <div className="bg-[#161B22] border border-[#30363D] border-l-4 border-l-[#2EA043] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-base font-bold flex items-center gap-2">💧 Aaj Ka Paisa</h4>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">INSTANT • 6.8% p.a.</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹2,340</p>
              <p className="text-xs text-[#2EA043] font-medium">+₹4.37 today</p>
            </div>
          </div>
          <div className="w-full bg-[#30363D] rounded-full h-1.5 mb-2 mt-4">
            <div className="bg-[#2EA043] h-1.5 rounded-full w-full"></div>
          </div>
          <p className="text-[10px] text-gray-400 mb-4">Liquid — withdraw in 30 min</p>
          <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] transition-colors py-2 rounded-lg text-xs font-semibold">
            Add Money
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#161B22] border border-[#30363D] border-l-4 border-l-[#3b82f6] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-base font-bold flex items-center gap-2">📅 Hafte Ka Paisa</h4>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">7 DAYS • 7.2% p.a.</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹5,000</p>
              <p className="text-xs text-[#3b82f6] font-medium">+₹9.86 today</p>
            </div>
          </div>
          <div className="w-full bg-[#30363D] rounded-full h-1.5 mb-4 mt-4">
            <div className="bg-[#3b82f6] h-1.5 rounded-full w-full"></div>
          </div>
          <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] transition-colors py-2 rounded-lg text-xs font-semibold">
            Add Money
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#161B22] border border-[#30363D] border-l-4 border-l-[#f59e0b] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-base font-bold flex items-center gap-2">🎯 Mahine Ka Paisa</h4>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">30 DAYS • 8.1% p.a.</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹3,000</p>
              <p className="text-xs text-[#f59e0b] font-medium">+₹6.84 today</p>
            </div>
          </div>
          <div className="w-full bg-[#30363D] rounded-full h-1.5 mb-4 mt-4">
            <div className="bg-[#f59e0b] h-1.5 rounded-full w-full"></div>
          </div>
          <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] transition-colors py-2 rounded-lg text-xs font-semibold">
            Add Money
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-[#161B22] border border-[#30363D] border-l-4 border-l-[#a855f7] rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-base font-bold flex items-center gap-2">🚀 Sapno Ka Paisa</h4>
              <span className="text-[10px] text-gray-400 font-medium tracking-wide">90 DAYS • 11.2% p.a.</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹8,200</p>
              <p className="text-xs text-[#a855f7] font-medium">+₹22.19 today</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mb-2 mt-1">Goal: Naya scooter by March 2027</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-[#30363D] rounded-full h-1.5">
              <div className="bg-[#a855f7] h-1.5 rounded-full" style={{ width: '18%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400">18% of 45k</span>
          </div>
          <button className="w-full bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] transition-colors py-2 rounded-lg text-xs font-semibold mt-2">
            Add Money
          </button>
        </div>
      </div>

      {/* Inline Yield Ticker at bottom */}
      <div className="bg-gradient-to-r from-[#1e4620] to-[#238636] border border-[#2EA043] rounded-xl p-4 shadow-lg flex items-center justify-between mt-4 mb-8 shrink-0">
        <span className="text-sm font-medium text-white flex items-center gap-2">✨ Aaj aapne sote hue kamaye:</span>
        <span className="font-mono font-bold text-white text-lg">₹{yieldTicker.toFixed(2)}</span>
      </div>
    </div>
  );
}

function AccountScreen({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#0D1117] text-white p-5 pb-24 overflow-y-auto no-scrollbar">
      
      {/* Header */}
      <div className="mb-2 pt-2 shrink-0 flex items-center gap-3">
        <button onClick={onMenuClick} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
          <Menu size={20} className="text-white" />
        </button>
        <h2 className="text-xl font-bold">Profile & Settings</h2>
      </div>

      {/* Top section — Bank account card */}
      <div className="bg-[#161B22] border-t-4 border-t-[#2EA043] border-x border-b border-[#30363D] rounded-xl p-5 mb-6 shrink-0 relative shadow-md mt-2">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Aapka Mehnat Account</h3>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="font-mono text-xl tracking-wider font-bold mb-1">XXXX 4521</p>
            <p className="text-xs text-[#7C3AED] font-medium">rajesh.mehnat@partner</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
            <span className="text-gray-900 font-bold text-sm">MB</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-[#2EA043]/20 text-[#2EA043] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Active
          </span>
          <span className="text-[10px] text-gray-400">Zero Balance Account</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center gap-1.5">
            <div className="bg-[#21262D] p-2.5 rounded-full"><ArrowUpRight className="w-4 h-4 text-white" /></div>
            <span className="text-[10px]">Send</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="bg-[#21262D] p-2.5 rounded-full"><ArrowDownRight className="w-4 h-4 text-white" /></div>
            <span className="text-[10px]">Receive</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="bg-[#21262D] p-2.5 rounded-full"><Download className="w-4 h-4 text-white" /></div>
            <span className="text-[10px]">Statement</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="bg-[#21262D] p-2.5 rounded-full"><CircleDollarSign className="w-4 h-4 text-white" /></div>
            <span className="text-[10px]">Card</span>
          </button>
        </div>
      </div>

      {/* MIDDLE — Insurance section */}
      <div className="mb-6 shrink-0">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          🛡️ Aapka Insurance
        </h3>
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#30363D]">
            <span className="text-sm font-medium">Status</span>
            <span className="text-sm font-bold text-[#2EA043] flex items-center gap-1">Active <CheckCircle2 className="w-4 h-4"/></span>
          </div>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Income protection</span>
              <span className="text-white flex items-center gap-1">21 days <CheckCircle2 className="w-3 h-3 text-[#2EA043]"/></span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Health cover</span>
              <span className="text-white flex items-center gap-1">₹2L <CheckCircle2 className="w-3 h-3 text-[#2EA043]"/></span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Family benefit</span>
              <span className="text-white flex items-center gap-1">₹5L <CheckCircle2 className="w-3 h-3 text-[#2EA043]"/></span>
            </div>
          </div>
          <button className="w-full text-xs text-[#7C3AED] font-semibold bg-[#7C3AED]/10 py-2 rounded-lg">View Details</button>
        </div>
      </div>

      {/* BOTTOM — KYC & Profile section */}
      <div className="shrink-0">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Aapki Profile</h3>
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">RK</div>
            <div>
              <p className="font-bold text-white text-sm">Rajesh Kumar</p>
              <p className="text-xs text-gray-400">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center text-xs bg-[#0D1117] p-2.5 rounded-lg border border-[#30363D]">
              <span className="text-gray-400">KYC Status</span>
              <span className="text-white font-medium flex items-center gap-1 text-[#2EA043]"><CheckCircle2 className="w-3 h-3"/> Verified (Aadhaar)</span>
            </div>
            <div className="flex justify-between items-center text-xs bg-[#0D1117] p-2.5 rounded-lg border border-[#30363D]">
              <span className="text-gray-400">Platforms Linked</span>
              <span className="text-white font-medium flex items-center gap-1">Swiggy <CheckCircle2 className="w-3 h-3 text-[#2EA043]"/> Zomato <CheckCircle2 className="w-3 h-3 text-[#2EA043]"/></span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-[#21262D] border border-[#30363D] py-2 rounded-lg text-[10px] font-semibold hover:bg-[#30363D] transition-colors">Edit Profile</button>
            <button className="bg-[#21262D] border border-[#30363D] py-2 rounded-lg text-[10px] font-semibold hover:bg-[#30363D] transition-colors">Linked Apps</button>
            <button className="bg-[#21262D] border border-[#30363D] py-2 rounded-lg text-[10px] font-semibold hover:bg-[#30363D] transition-colors text-gray-300">Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ onMenuClick }: { onMenuClick: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Initial staggered sequence
    let isMounted = true;
    const seq = async () => {
      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { id: "1", sender: "ai", type: "text", content: "Namaste Rajesh bhai 🙏", time: "6:00 AM" }]);
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { id: "2", sender: "ai", type: "voice", content: "Aaj ₹420 safe hai. Friday + accha mausam = ₹780 expected. Ride safe bhai!", time: "6:00 AM" }]);
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { id: "3", sender: "user", type: "text", content: "Bhai loan chahiye ₹5000, bike puncture 🔧", time: "8:23 AM" }]);
      await new Promise(r => setTimeout(r, 800));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1200));
      setMessages(prev => [...prev, { id: "4", sender: "ai", type: "text", content: "Samajh gaya! Aap ₹8,500 eligible hain.\n₹5,000 transfer karoon?\n↳ Repayment: ₹100/day auto\n↳ Duration: 52 days\nConfirm karo?", time: "8:23 AM" }]);
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { id: "5", sender: "user", type: "text", content: "Haan bhai", time: "8:24 AM" }]);
      await new Promise(r => setTimeout(r, 600));
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1000));
      setIsTyping(false);
      setMessages(prev => [...prev, { id: "6", sender: "ai", type: "text", content: "Done ✓ ₹5,000 transfer ho raha hai\n⏱ 4 minutes mein account mein\n🏍️ Bike theek karo, ride safe!", time: "8:24 AM" }]);
    };
    seq();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q) return;
    
    const newMsg: ChatMsg = { id: Date.now().toString(), sender: "user", type: "text", content: q, time: "Now" };
    const currentMessages = [...messages, newMsg];
    
    setMessages(currentMessages);
    setInput("");
    setIsTyping(true);

    try {
      const apiMessages = currentMessages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: "ai", 
        type: "text", 
        content: data.reply || "Sorry bhai, mujhe thoda confusion ho gaya. Wapas poocho?", 
        time: "Now" 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: "ai", 
        type: "text", 
        content: "Sorry bhai, thoda network issue lag raha hai. Try again later.", 
        time: "Now" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1117] relative no-scrollbar">
      {/* Background Pattern Mock */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "12px 12px" }}></div>

      {/* Header */}
      <div className="bg-[#21262D] px-4 py-3 border-b border-[#30363D] flex items-center gap-3 z-10 pt-4 shrink-0">
        <button onClick={onMenuClick} className="hover:bg-white/10 p-1.5 rounded-full transition-colors -ml-2">
          <Menu size={20} className="text-white" />
        </button>
        <div className="w-10 h-10 rounded-full bg-[#161B22] border border-[#30363D] flex items-center justify-center relative overflow-hidden">
          <div className="text-xl">🤖</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white">Mehnat AI</h2>
            <div className="w-2 h-2 rounded-full bg-[#2EA043]" />
          </div>
          <p className="text-xs text-gray-400">Your financial partner</p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 z-10 scroll-smooth no-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${msg.sender === "user" ? "bg-[#2EA043] text-white rounded-br-sm" : "bg-[#21262D] border border-[#30363D] text-gray-200 rounded-bl-sm shadow-sm"}`}>
                {msg.type === "voice" ? (
                  <div className="flex items-center gap-3 w-48">
                    <button className="w-8 h-8 rounded-full bg-white text-[#21262D] flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                    <div className="flex-1 flex items-center gap-0.5 opacity-50">
                      {[4,8,6,3,7,9,5,4,2,6,8,5,3,4].map((h, i) => (
                        <div key={i} className="w-1 bg-white rounded-full" style={{ height: `${h * 2}px` }} />
                      ))}
                    </div>
                    <span className="text-xs font-mono">0:14</span>
                  </div>
                ) : (
                  msg.content
                )}
                <div className={`text-[10px] mt-1 text-right ${msg.sender === "user" ? "text-white/70" : "text-gray-500"}`}>{msg.time}</div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
              <div className="bg-[#21262D] border border-[#30363D] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center h-10 shadow-sm">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="absolute bottom-[80px] md:bottom-[0px] left-0 right-0 p-3 bg-[#0D1117] border-t border-[#30363D] z-20">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Kuch bhi pucho..." 
            className="flex-1 bg-[#161B22] border border-[#30363D] text-white text-sm rounded-full px-4 py-2.5 focus:outline-none focus:border-[#7C3AED]"
          />
          <button onClick={handleSend} className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0 shadow-md">
            <SendHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function LoansScreen({ onMenuClick }: { onMenuClick: () => void }) {
  const [val, setVal] = useState(5000);
  const daily = Math.round((val * 1.04) / 52);
  const total = Math.round(val * 1.04);

  return (
    <div className="flex flex-col h-full bg-[#0D1117] text-white p-5 pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="mb-6 pt-2 shrink-0 flex items-start gap-3">
        <button onClick={onMenuClick} className="hover:bg-white/10 p-1.5 rounded-full transition-colors mt-0.5">
          <Menu size={20} className="text-white" />
        </button>
        <div>
          <h2 className="text-xl font-bold">Instant Micro-Loans</h2>
          <p className="text-gray-400 text-sm">Bina salary slip, bina branch</p>
        </div>
      </div>

      {/* Eligibility Card */}
      <div className="bg-[#161B22] border border-[#2EA043]/50 rounded-xl p-5 mb-6 relative overflow-hidden shadow-[0_0_20px_rgba(46,160,67,0.1)] shrink-0">
        <div className="absolute top-0 right-0 bg-[#2EA043] text-xs font-bold px-2 py-1 rounded-bl-lg">Pre-approved</div>
        <p className="text-sm text-gray-300 mb-1">Aap eligible hain</p>
        <h3 className="text-4xl font-bold text-white mb-2">₹8,500</h3>
        <p className="text-xs text-gray-500 mb-4">Based on 90 days earnings history</p>
        <button className="w-full bg-[#2EA043] text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm">
          Apply Now — 4 Minutes
        </button>
      </div>

      {/* Calculator */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 mb-6 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium">Kitna chahiye?</label>
          <span className="text-lg font-bold text-[#7C3AED]">₹{val}</span>
        </div>
        <input 
          type="range" 
          min="1000" max="8500" step="100" 
          value={val} 
          onChange={e => setVal(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#7C3AED] mb-6"
        />
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Loan:</span>
            <span className="font-semibold text-white">₹{val}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Daily repayment:</span>
            <span className="font-semibold text-[#2EA043]">₹{daily} <span className="text-xs text-gray-500">(Auto)</span></span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total repayment:</span>
            <span className="font-semibold text-white">₹{total}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-[#30363D]">
            <span className="text-gray-400">In account:</span>
            <span className="font-semibold text-white flex items-center gap-1"><Clock className="w-3 h-3 text-[#A855F7]"/> 4 minutes</span>
          </div>
        </div>
      </div>

      {/* Loan Types */}
      <div className="shrink-0">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Popular purposes</h3>
        <div className="space-y-3 mb-6">
          <div className="bg-[#21262D] border border-[#30363D] rounded-lg p-3 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 text-lg">🔧</div>
            <div>
              <h4 className="text-sm font-bold">Bike Repair · Up to ₹15,000</h4>
              <p className="text-xs text-gray-400">Bike toot gayi? Kal se band mat raho</p>
            </div>
          </div>
          <div className="bg-[#21262D] border border-[#30363D] rounded-lg p-3 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 text-lg">🏥</div>
            <div>
              <h4 className="text-sm font-bold">Emergency · Up to ₹10,000</h4>
              <p className="text-xs text-gray-400">Medical ya family emergency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ───────────────────── Main Demo Page Component ───────────────────── */

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SIDEBAR_ITEMS = [
    { id: "home", label: "Home", icon: Home },
    { id: "invest", label: "Invest", icon: LineChart },
    { id: "loans", label: "Loans", icon: Zap },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "account", label: "Account", icon: User },
    { id: "chat", label: "AI Chat", icon: MessageCircle },
    { id: "divider" },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ] as const;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Back to Home Button */}
      <Link 
        href="/"
        className="absolute top-4 left-4 md:top-8 md:left-8 z-[60] flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
      >
        <ArrowLeft size={18} />
        <span className="font-medium text-sm">Back</span>
      </Link>

      <div className="flex gap-6 items-stretch h-[min(96vh,844px)] max-w-full w-full justify-center px-4">


        {/* Phone Frame */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-full aspect-[440/844] w-auto max-w-[calc(100vw-32px)] bg-[#1C1C1E] rounded-[40px] md:rounded-[55px] shadow-2xl overflow-hidden border-[6px] md:border-[8px] border-[#30363D] shrink-0 flex flex-col"
        >
          {/* Fake Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 z-50 flex items-center justify-between px-6 pointer-events-none">
            <span className="text-white text-xs font-semibold tracking-wide">9:41</span>
            <div className="flex items-center gap-1.5 text-white">
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={16} />
            </div>
          </div>
          
          {/* Notch Area Block (for realism) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#30363D] rounded-b-3xl z-50 pointer-events-none"></div>

          {/* Content Area - pad top for status bar */}
          <div className="flex-1 pt-12 relative bg-[#0D1117] overflow-hidden">
            {activeTab === "home" && <HomeScreen onMenuClick={() => setIsSidebarOpen(true)} />}
            {activeTab === "invest" && <InvestScreen onMenuClick={() => setIsSidebarOpen(true)} />}
            {activeTab === "loans" && <LoansScreen onMenuClick={() => setIsSidebarOpen(true)} />}
            {activeTab === "insurance" && <div className="p-8 text-white text-center mt-20"><Shield className="w-12 h-12 text-[#2EA043] mx-auto mb-4"/>Insurance is now managed inside the Account tab.</div>}
            {activeTab === "account" && <AccountScreen onMenuClick={() => setIsSidebarOpen(true)} />}
            {activeTab === "chat" && <ChatScreen onMenuClick={() => setIsSidebarOpen(true)} />}
            {activeTab === "settings" && <div className="p-8 text-white text-center mt-20"><Settings className="w-12 h-12 text-gray-500 mx-auto mb-4"/>Settings Page Mock</div>}
            {activeTab === "help" && <div className="p-8 text-white text-center mt-20"><HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4"/>Help Center Mock</div>}
          </div>

          {/* Bottom Tab Bar (Visible on all devices) */}
          <div className="h-[80px] bg-[#1C1C1E]/95 backdrop-blur-md border-t border-[#30363D] flex items-start justify-around px-2 pt-3 z-50 shrink-0 relative">
            <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-[#7C3AED]" : "text-[#6B7280]"}`}>
              <Home size={22} className={activeTab === "home" ? "fill-[#7C3AED]/20" : ""} />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button onClick={() => setActiveTab("invest")} className={`flex flex-col items-center gap-1 ${activeTab === "invest" ? "text-[#7C3AED]" : "text-[#6B7280]"}`}>
              <LineChart size={22} className={activeTab === "invest" ? "fill-[#7C3AED]/20" : ""} />
              <span className="text-[10px] font-medium">Invest</span>
            </button>
            <button onClick={() => setActiveTab("chat")} className={`flex flex-col items-center gap-1 ${activeTab === "chat" ? "text-[#7C3AED]" : "text-[#6B7280]"}`}>
              <MessageCircle size={22} className={activeTab === "chat" ? "fill-[#7C3AED]/20" : ""} />
              <span className="text-[10px] font-medium">Chat</span>
            </button>
            <button onClick={() => setActiveTab("loans")} className={`flex flex-col items-center gap-1 ${activeTab === "loans" ? "text-[#7C3AED]" : "text-[#6B7280]"}`}>
              <Zap size={22} className={activeTab === "loans" ? "fill-[#7C3AED]/20" : ""} />
              <span className="text-[10px] font-medium">Loans</span>
            </button>
            <button onClick={() => setActiveTab("account")} className={`flex flex-col items-center gap-1 ${activeTab === "account" ? "text-[#7C3AED]" : "text-[#6B7280]"}`}>
              <User size={22} className={activeTab === "account" ? "fill-[#7C3AED]/20" : ""} />
              <span className="text-[10px] font-medium">Account</span>
            </button>

            {/* Home indicator bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full pointer-events-none"></div>
          </div>

          {/* Internal Side Menu Drawer */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 z-[70] bg-black/60 backdrop-blur-sm flex"
              >
                <motion.div 
                  initial={{ x: "-100%" }} 
                  animate={{ x: 0 }} 
                  exit={{ x: "-100%" }} 
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="w-[260px] h-full bg-[#161B22] shadow-2xl flex flex-col p-6 relative overflow-y-auto no-scrollbar"
                >
                  <button onClick={() => setIsSidebarOpen(false)} className="absolute top-12 right-4 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-10 mt-10">
                    <div className="w-10 h-10 rounded-full bg-[#2EA043] flex items-center justify-center text-white font-bold text-lg shadow-lg">M</div>
                    <span className="text-white font-bold text-2xl tracking-tight">Mehnat</span>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    {SIDEBAR_ITEMS.map((item, idx) => {
                      if (item.id === "divider") {
                        return <div key={idx} className="h-px bg-[#30363D] my-4 w-full"></div>;
                      }
                      const Icon = item.icon as any;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id as Tab);
                            setIsSidebarOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                            isActive 
                              ? "bg-[#7C3AED] text-white shadow-md" 
                              : "text-[#8B949E] hover:text-white hover:bg-[#21262D]"
                          }`}
                        >
                          <Icon size={20} className={isActive ? "text-white" : ""} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
                <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
