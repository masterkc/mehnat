"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  CheckCircle2,
  X,
} from "lucide-react";

// ─── Platform data ───────────────────────────────────────────────
const platforms = [
  { name: "Swiggy", bg: "bg-[#FC8019]", text: "text-white", border: "" },
  { name: "Zomato", bg: "bg-[#E23744]", text: "text-white", border: "" },
  {
    name: "Ola",
    bg: "bg-[#1C1C1C]",
    text: "text-white",
    border: "border border-gray-600",
  },
  { name: "Rapido", bg: "bg-[#FFCC00]", text: "text-black", border: "" },
  {
    name: "Urban Company",
    bg: "bg-[#00B4A2]",
    text: "text-white",
    border: "",
  },
];

// ─── Onboarding overlay ──────────────────────────────────────────
function OnboardingOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [aaConsent, setAaConsent] = useState(false);

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-navy-800 border border-navy-600 rounded-2xl p-8 shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="text-accent-green" size={28} />
          <h2 className="text-2xl font-bold text-white">
            Connect your earning platforms
          </h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          Select the platforms you work with so we can personalise your
          experience.
        </p>

        {/* Platform pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {platforms.map((p) => {
            const active = selected.has(p.name);
            return (
              <button
                key={p.name}
                onClick={() => toggle(p.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active
                    ? "bg-accent-purple/20 border-accent-purple text-accent-purple"
                    : "bg-navy-700 border-navy-600 text-gray-300 hover:border-gray-400"
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Account Aggregator toggle */}
        <div className="mb-6">
          <button
            onClick={() => setAaConsent(!aaConsent)}
            className="flex items-start gap-3 w-full text-left"
          >
            <div
              className={`mt-0.5 w-10 h-6 rounded-full flex items-center transition-colors shrink-0 ${
                aaConsent ? "bg-accent-green" : "bg-navy-600"
              }`}
            >
              <motion.div
                animate={{ x: aaConsent ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-white rounded-full shadow"
              />
            </div>
            <span className="text-sm text-gray-200">
              Allow Mehnat to read your earnings data via Account Aggregator
            </span>
          </button>
          <div className="flex items-start gap-2 mt-3 ml-[52px]">
            <Shield size={14} className="text-accent-green shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              This is safe. We use RBI&apos;s Account Aggregator framework. We
              can never move your money.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-3 rounded-lg bg-accent-green hover:bg-accent-green-hover text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          Continue to Dashboard
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── OTP Input ───────────────────────────────────────────────────
function OtpInput({
  onComplete,
}: {
  onComplete: (otp: string) => void;
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < 3) {
      refs[index + 1].current?.focus();
    }

    if (next.every((d) => d !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-14 h-14 text-center text-xl font-bold rounded-lg bg-navy-700 border border-navy-600 text-white
                     focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple
                     transition-shadow shadow-[0_0_0_0_transparent] focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        />
      ))}
    </div>
  );
}

// ─── Partner Login (left) ────────────────────────────────────────
function PartnerLogin({
  onVerified,
}: {
  onVerified: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setStep("otp");
    setResendTimer(30);
  };

  const verifyOtp = (_otp?: string) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    onVerified();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-navy-800 border border-navy-600 rounded-xl p-8 w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-1">
        Welcome back, partner
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Sign in to your Mehnat account
      </p>

      {/* ── Phone / OTP ── */}
      <AnimatePresence mode="wait">
        {step === "phone" ? (
          <motion.div
            key="phone-step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <label className="block text-sm text-gray-300 mb-2">
              Phone number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg bg-navy-700 border border-r-0 border-navy-600 text-gray-400 text-sm">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter 10-digit number"
                className="flex-1 rounded-r-lg bg-navy-700 border border-navy-600 text-white px-4 py-3 text-sm
                           placeholder:text-gray-500
                           focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple
                           transition-shadow focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={phone.length < 10}
              className="mt-4 w-full py-3 rounded-lg bg-accent-green hover:bg-accent-green-hover disabled:opacity-40 disabled:cursor-not-allowed
                         text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Send OTP
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <p className="text-sm text-gray-300 mb-4 text-center">
              Enter the 4-digit code sent to{" "}
              <span className="text-white font-medium">+91 {phone}</span>
            </p>

            <OtpInput onComplete={verifyOtp} />

            <button
              onClick={() => verifyOtp("")}
              className="mt-4 w-full py-3 rounded-lg bg-accent-green hover:bg-accent-green-hover text-white font-semibold text-sm transition-colors"
            >
              Verify OTP
            </button>

            <div className="flex items-center justify-between mt-3 text-xs">
              <button
                onClick={() => setStep("phone")}
                className="text-gray-400 hover:text-white transition"
              >
                Change number
              </button>
              {resendTimer > 0 ? (
                <span className="text-gray-500">
                  Resend in {resendTimer}s
                </span>
              ) : (
                <button
                  onClick={() => {
                    setResendTimer(30);
                  }}
                  className="text-accent-purple hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OR divider ── */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-navy-600" />
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          or
        </span>
        <div className="flex-1 h-px bg-navy-600" />
      </div>

      {/* ── Platform buttons ── */}
      <div className="space-y-3">
        {platforms.map((p) => (
          <button
            key={p.name}
            className={`w-full py-3 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 ${p.bg} ${p.text} ${p.border}`}
          >
            Continue with {p.name === "Urban Company" ? "Urban Company" : `${p.name} Account`}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        New partner?{" "}
        <button className="text-accent-purple hover:underline">
          Sign up in 2 minutes
        </button>
      </p>
    </motion.div>
  );
}

// ─── Platform Partner Login (right) ──────────────────────────────
function PlatformLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-navy-800 border border-navy-600 rounded-xl p-8 w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-1">
        Platform Partner Access
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        For Swiggy, Zomato, Ola representatives
      </p>

      {/* Email */}
      <label className="block text-sm text-gray-300 mb-2">Email</label>
      <div className="relative mb-4">
        <Mail
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-navy-700 border border-navy-600 text-white text-sm
                     placeholder:text-gray-500
                     focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple
                     transition-shadow focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        />
      </div>

      {/* Password */}
      <label className="block text-sm text-gray-300 mb-2">Password</label>
      <div className="relative mb-6">
        <Lock
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-navy-700 border border-navy-600 text-white text-sm
                     placeholder:text-gray-500
                     focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-accent-purple
                     transition-shadow focus:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        />
      </div>

      {/* Sign In */}
      <button className="w-full py-3 rounded-lg border border-navy-600 text-white font-semibold text-sm hover:bg-navy-700 transition-colors">
        Sign In
      </button>

      <p className="mt-4 text-center text-sm">
        <button className="text-accent-purple hover:underline">
          Request platform partnership
        </button>
      </p>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function LoginPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left — Partner Login */}
        <PartnerLogin onVerified={() => setShowOnboarding(true)} />

        {/* Right — Platform / Corporate Login */}
        <PlatformLogin />
      </div>

      {/* Onboarding overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingOverlay onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
