"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SendHorizontal } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  sender: "ai" | "user";
  time: string;
  text?: string;
  voiceNote?: { duration: string; transcript: string };
  bullets?: string[];
}

// ── Pre-loaded conversation ────────────────────────────────────────────────────
const preloadedMessages: Message[] = [
  {
    id: 1,
    sender: "ai",
    time: "6:00 AM",
    text: "Namaste, Rajesh bhai \u{1F64F}",
  },
  {
    id: 2,
    sender: "ai",
    time: "6:00 AM",
    voiceNote: { duration: "0:14", transcript: "" },
    text: "\u{1F399}️ Aaj aap ₹420 tak kharch kar sakte ho. Friday hai aur mausam accha hai — expected kamai ₹780. Ride safe bhai!",
  },
  {
    id: 3,
    sender: "user",
    time: "8:23 AM",
    text: "Bhai aaj ₹600 chahiye, dost ki birthday hai \u{1F382}",
  },
  {
    id: 4,
    sender: "ai",
    time: "8:23 AM",
    text: "Samajh gaya! ₹600 ho sakta hai. But yaad rakho:",
    bullets: [
      "→ Kal ka allowance ₹340 ho jayega",
      "→ Emergency fund target is week poora nahi hoga",
    ],
  },
  {
    id: 5,
    sender: "user",
    time: "8:24 AM",
    text: "Haan bhai karo",
  },
  {
    id: 6,
    sender: "ai",
    time: "8:24 AM",
    text: "Done ✓ Aaj ₹600 use kar sakte ho. Birthday enjoy karo! Kal 6 AM milte hain \u{1F389}",
  },
];

// ── Canned responses ───────────────────────────────────────────────────────────
function getCannedResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("kitna kharch") || lower.includes("kharcha")) {
    return "Aaj ₹420 safe hai bhai. Abhi ₹80 bache hain. Koi badi zaroorat hai?";
  }
  if (lower.includes("loan")) {
    return "Aap ₹8,500 ke eligible hain. 4 minute mein transfer, EMI automatically Swiggy payout se kategi. Lena hai?";
  }
  if (lower.includes("insurance")) {
    return "Aapka ₹15/month plan active hai ✓ Income protection + ₹2L health cover. Koi claim karna hai?";
  }
  return "Yeh feature V2 mein aa raha hai! Abhi daily allowance, loans aur insurance ke liye poochho.";
}

// ── Waveform bars component ────────────────────────────────────────────────────
function VoiceWaveform() {
  const barHeights = [12, 20, 8, 18, 14, 22, 10];
  return (
    <div className="flex items-center gap-[3px]">
      {barHeights.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[3px] rounded-full bg-accent-purple"
          style={{
            animation: `waveform 1.2s ease-in-out ${i * 0.15}s infinite`,
            height: `${h}px`,
          }}
        />
      ))}
    </div>
  );
}

// ── Voice note bubble ──────────────────────────────────────────────────────────
function VoiceNoteBubble({ duration }: { duration: string }) {
  return (
    <div className="flex items-center gap-3 bg-navy-600 rounded-full px-4 py-2 w-fit mb-2">
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-purple text-white shrink-0">
        <Play size={14} className="ml-0.5" />
      </button>
      <VoiceWaveform />
      <span className="text-xs text-gray-400 ml-1 tabular-nums">{duration}</span>
    </div>
  );
}

// ── Typing indicator ───────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-accent-purple mt-3 shrink-0" />
      <div className="bg-navy-700 rounded-lg p-4">
        <p className="text-[11px] text-accent-purple font-medium mb-2">Mehnat AI</p>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-2 h-2 rounded-full bg-gray-400"
              style={{
                animation: `bounce-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Single message component ───────────────────────────────────────────────────
function ChatMessage({ message }: { message: Message }) {
  const isAI = message.sender === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}
    >
      {isAI ? (
        <div className="flex items-start gap-3 max-w-[85%]">
          <div className="w-2 h-2 rounded-full bg-accent-purple mt-3 shrink-0" />
          <div>
            <div className="bg-navy-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] text-accent-purple font-medium">Mehnat AI</p>
                <p className="text-[10px] text-gray-500 ml-4">{message.time}</p>
              </div>
              {message.voiceNote && (
                <VoiceNoteBubble duration={message.voiceNote.duration} />
              )}
              {message.text && (
                <p className="text-sm text-gray-200 leading-relaxed">{message.text}</p>
              )}
              {message.bullets && (
                <ul className="mt-2 space-y-1">
                  {message.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-gray-300">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {message.bullets && (
                <p className="text-sm text-gray-200 mt-2">Phir bhi karna hai?</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[85%]">
          <div className="bg-accent-green/20 border border-accent-green/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-accent-green font-medium">Rajesh</p>
              <p className="text-[10px] text-gray-500 ml-4">{message.time}</p>
            </div>
            {message.text && (
              <p className="text-sm text-gray-200 leading-relaxed">{message.text}</p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ChatPage() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dynamicMessages, setDynamicMessages] = useState<Message[]>([]);
  const [dynamicTyping, setDynamicTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(100);

  // Scroll only the messages container, not the page
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [visibleMessages, dynamicMessages, showTyping, dynamicTyping]);

  // Staggered mount animation for pre-loaded conversation
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let cumulativeDelay = 500; // initial delay

    preloadedMessages.forEach((msg, index) => {
      // Show typing indicator before each AI message
      if (msg.sender === "ai") {
        const typingTimeout = setTimeout(() => {
          setShowTyping(true);
        }, cumulativeDelay);
        timeouts.push(typingTimeout);
        cumulativeDelay += 1500; // typing visible for 1.5s
      }

      const msgTimeout = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, msg]);
      }, cumulativeDelay);
      timeouts.push(msgTimeout);

      cumulativeDelay += index < preloadedMessages.length - 1 ? 3000 : 0;
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Handle sending a message
  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: nextIdRef.current++,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      text,
    };

    setDynamicMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Show typing, then respond
    setDynamicTyping(true);
    setTimeout(() => {
      setDynamicTyping(false);
      const aiMsg: Message = {
        id: nextIdRef.current++,
        sender: "ai",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        text: getCannedResponse(text),
      };
      setDynamicMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes waveform {
          0%,
          100% {
            height: 8px;
          }
          50% {
            height: 22px;
          }
        }
        @keyframes bounce-dot {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-6px);
          }
        }
      `}</style>

      <div className="min-h-screen bg-navy-900 pt-24 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Tab header */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-gray-400 border-b-2 border-accent-purple pb-2">
              Chat
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-1">Mehnat AI</h1>
          <p className="text-gray-400 mb-6">Your personal financial partner</p>

          {/* Chat container */}
          <div className="bg-navy-800 border border-navy-600 rounded-xl overflow-hidden flex flex-col">
            {/* Messages area */}
            <div ref={messagesContainerRef} className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] min-h-[400px]">
              <AnimatePresence>
                {visibleMessages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {showTyping && <TypingIndicator />}

              <AnimatePresence>
                {dynamicMessages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {dynamicTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input box */}
            <div className="bg-navy-700 border-t border-navy-600 p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Kuch bhi pucho — kamai, kharcha, loan..."
                  className="flex-1 bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-accent-purple/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-purple hover:bg-accent-purple/80 text-white transition-colors shrink-0"
                >
                  <SendHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom label */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Powered by Mehnat AI &middot; 8 Indian languages supported in V2
          </p>
        </div>
      </div>
    </>
  );
}
