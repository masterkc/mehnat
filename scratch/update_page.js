const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Update imports
content = content.replace(
  /import {\s*TrendingUp,\s*Zap,\s*Shield,\s*Bell,\s*Clock,\s*Rocket,\s*Quote,\s*SendHorizontal,\s*} from "lucide-react";/s,
  `import {
  TrendingUp,
  Zap,
  Shield,
  Bell,
  Clock,
  Rocket,
  Quote,
  SendHorizontal,
  MessageSquare,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";`
);

// Add chart data
content = content.replace(
  /\/\* ═══════════════════════ PAGE ═══════════════════════ \*\//,
  `/* ───────────────────── Chart Data ───────────────────── */
const chartData = [
  { day: 'Oct 15', actual: 400 },
  { day: 'Oct 16', actual: 450 },
  { day: 'Oct 17', actual: 390 },
  { day: 'Oct 18', actual: 500 },
  { day: 'Oct 19', actual: 650 },
  { day: 'Oct 20', actual: 700 },
  { day: 'Oct 21', actual: 420 },
  { day: 'Oct 22', actual: 410 },
  { day: 'Oct 23', actual: 380 },
  { day: 'Oct 24', actual: 200, predicted: 220 },
  { day: 'Today', actual: 287, predicted: 780 },
  { day: 'Oct 26', predicted: 800 },
  { day: 'Oct 27', predicted: 850 },
  { day: 'Oct 28', predicted: 450 },
  { day: 'Oct 29', predicted: 460 },
  { day: 'Oct 30', predicted: 500 },
  { day: 'Oct 31', predicted: 900 },
  { day: 'Nov 01', predicted: 1200 },
  { day: 'Nov 02', predicted: 1300 },
  { day: 'Nov 03', predicted: 1100 },
];

/* ═══════════════════════ PAGE ═══════════════════════ */`
);

// Replace everything after MARQUEE with the new sections
const marqueeMarker = "{/* ─── PARTNER MARQUEE STRIP ─── */}";
if (content.indexOf(marqueeMarker) === -1) {
  console.error("Marquee marker not found!");
  process.exit(1);
}

const beforeMarquee = content.substring(0, content.indexOf(marqueeMarker));

const newSections = `
      {/* ─── SECTION 2: THE INSIGHT ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6 border-t border-[#21262D]">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#2a1215] border border-[#5c1e22] rounded-xl p-8 flex flex-col items-center text-center">
            <h3 className="text-5xl font-bold text-[#f85149] mb-4">89%</h3>
            <p className="text-gray-300">of gig workers have ZERO emergency savings</p>
            <p className="text-xs text-gray-500 mt-4">Source: Economic Survey 2025-26</p>
          </div>
          <div className="bg-[#2a1215] border border-[#5c1e22] rounded-xl p-8 flex flex-col items-center text-center">
            <h3 className="text-5xl font-bold text-[#f85149] mb-4">₹50,000</h3>
            <p className="text-gray-300">lost annually per trader to bad financial decisions</p>
            <p className="text-xs text-gray-500 mt-4">due to zero planning infrastructure</p>
          </div>
          <div className="bg-[#122b1c] border border-[#1e5c33] rounded-xl p-8 flex flex-col items-center text-center">
            <h3 className="text-5xl font-bold text-[#2EA043] mb-4">30 Crore</h3>
            <p className="text-gray-300">Indians earning without a single financial product built for how they actually earn</p>
          </div>
        </div>
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
            Every existing fintech assumes you get paid on the 1st. <br className="hidden md:block"/>
            Gig workers get paid in ₹200 chunks at random times. <br className="hidden md:block"/>
            Nobody built for that. <span className="text-[#A855F7]">Until now.</span>
          </p>
        </div>
      </section>

      {/* ─── SECTION 3: THE PRODUCT ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">One product. Four problems solved.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <motion.div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative overflow-hidden group" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}}>
            <div className="absolute top-6 right-6 bg-[#238636] text-xs font-bold px-2 py-1 rounded text-white">V1 — Live</div>
            <div className="w-12 h-12 rounded-lg bg-[#238636]/20 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#2EA043]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Aaj Kitna Kharch Karoon?</h3>
            <p className="text-gray-400 leading-relaxed">
              Every morning at 6 AM, Mehnat sends a WhatsApp voice note telling the worker exactly how much they can safely spend today. AI analyzes 90 days of UPI earnings, predicts next 30 days using weather + festival + demand data, subtracts fixed costs, gives one number. Auto-adjusts daily.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative overflow-hidden group" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1}}>
            <div className="absolute top-6 right-6 bg-[#238636] text-xs font-bold px-2 py-1 rounded text-white">V1 — Live</div>
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Loan Bina Salary Slip</h3>
            <p className="text-gray-400 leading-relaxed">
              Banks need Form 16. We need 90 days of earnings. Bike repair loan in 4 minutes. Auto-repaid from daily payouts. 14% interest vs 36% from moneylenders. No paperwork, no branch visit, no guarantor.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative overflow-hidden group" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.2}}>
            <div className="absolute top-6 right-6 bg-[#238636] text-xs font-bold px-2 py-1 rounded text-white">V1 — Live</div>
            <div className="w-12 h-12 rounded-lg bg-[#A855F7]/20 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#A855F7]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">₹15/month. Auto-claimed.</h3>
            <p className="text-gray-400 leading-relaxed">
              Income protection + ₹2L health cover + ₹5L death benefit. If a rider stops working due to injury, AI detects it, verifies automatically, pays out in 24 hours. No forms, no calls, no rejection.
            </p>
          </motion.div>
          {/* Feature 4 */}
          <motion.div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative overflow-hidden group" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.3}}>
            <div className="absolute top-6 right-6 bg-[#238636] text-xs font-bold px-2 py-1 rounded text-white">V1 — Live</div>
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Baat Karo, Kaam Ho Jayega</h3>
            <p className="text-gray-400 leading-relaxed">
              WhatsApp-first. No app download. Worker asks in Hindi, Bhojpuri, Tamil — whatever their language. AI understands intent, responds conversationally, executes actions. Override allowance, apply for loan, check insurance — all via chat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: LIVE DEMO ─── */}
      <section className="py-24 max-w-3xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">Try Mehnat AI</h2>
        <p className="text-gray-400 text-center mb-16">Type in Hindi or English — exactly how a rider would</p>
        
        <div className="w-full flex justify-center">
          <MiniChat />
        </div>
      </section>

      {/* ─── SECTION 5: AI EARNINGS FORECAST ─── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Mehnat AI — Agle 30 Din Ki Prediction</h2>
        
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 md:p-8 mb-8">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2EA043" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2EA043" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => \`₹\${val}\`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <ReferenceLine x="Today" stroke="#8b949e" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#8b949e', fontSize: 12 }} />
                
                <ReferenceLine x="Oct 24" stroke="#f85149" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Rain forecast: -40% 🌧️', fill: '#f85149', fontSize: 12 }} />
                <ReferenceLine x="Nov 01" stroke="#A855F7" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Diwali Week: +35% 🎆', fill: '#A855F7', fontSize: 12 }} />
                
                <Area type="monotone" dataKey="actual" stroke="#2EA043" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" stroke="#A855F7" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">This month predicted</p>
            <p className="text-2xl font-bold text-white">₹19,400</p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Last month actual</p>
            <p className="text-2xl font-bold text-white">₹18,650 <span className="text-[#2EA043] text-sm ml-2">✓ (AI was 96% accurate)</span></p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Today's allowance basis</p>
            <p className="text-2xl font-bold text-white">₹420 <span className="text-sm font-normal ml-1 text-gray-400">safe to spend</span></p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          AI trains on your UPI history + Mumbai weather API + Swiggy/Zomato demand patterns + festival calendar
        </p>
      </section>

      {/* ─── SECTION 6: WHY NOW ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Why is this only possible in 2026?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-t-2 border-[#238636] pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Account Aggregator</h3>
            <p className="text-gray-400 leading-relaxed">
              RBI's AA framework (matured 2023-25) lets workers share UPI + bank data with one tap consent. We can see ALL their platform earnings in real time. Previously impossible.
            </p>
          </div>
          <div className="border-t-2 border-[#A855F7] pt-6">
            <h3 className="text-xl font-bold text-white mb-4">UPI + WhatsApp API</h3>
            <p className="text-gray-400 leading-relaxed">
              900M+ UPI users. WhatsApp Business API allows proactive messages. We reach workers where they already are — no app download barrier.
            </p>
          </div>
          <div className="border-t-2 border-[#58A6FF] pt-6">
            <h3 className="text-xl font-bold text-white mb-4">AI Cashflow Forecasting</h3>
            <p className="text-gray-400 leading-relaxed">
              LLMs + time-series models can now predict irregular income with 94% accuracy. Rules-based systems couldn't do this. AI can.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: GLOBAL VALIDATION ─── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">This Works. We Have Proof.</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#2EA043] text-white text-xs font-bold px-3 py-1 rounded-full">Our inspiration</div>
            <h3 className="text-2xl font-bold text-white mb-2">Bank Jago × Gojek</h3>
            <p className="text-[#8b949e] text-sm mb-6">Indonesia · 2021</p>
            <p className="text-gray-300 leading-relaxed">
              Embedded banking directly into gig app. Allowed 61.7% unbanked Indonesians to open accounts within their earning platform. Same model. Different country.
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#A855F7] text-white text-xs font-bold px-3 py-1 rounded-full">Indian validation</div>
            <h3 className="text-2xl font-bold text-white mb-2">Karmalife · India</h3>
            <p className="text-[#8b949e] text-sm mb-6">Early stage proof</p>
            <p className="text-gray-300 leading-relaxed">
              India-based startup doing earned wage access for gig workers. Proves demand exists. Mehnat goes 10x deeper with AI forecasting, insurance, and full financial OS.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: TAM + BUSINESS MODEL ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">The Market Opportunity</h2>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* TAM Pyramid */}
          <div className="flex-1 w-full max-w-md flex flex-col items-center gap-2">
            <div className="w-full bg-[#30363D] rounded-t-xl py-4 text-center text-white font-semibold">30 Crore <span className="text-sm font-normal text-gray-400 block">Total gig + informal workers</span></div>
            <div className="w-11/12 bg-[#2EA043] py-4 text-center text-white font-semibold">10 Crore <span className="text-sm font-normal text-white/80 block">Smartphone + UPI enabled</span></div>
            <div className="w-9/12 bg-[#A855F7] py-4 text-center text-white font-semibold">3 Crore <span className="text-sm font-normal text-white/80 block">3-year realistic capture</span></div>
            <div className="w-7/12 bg-[#58A6FF] rounded-b-xl py-4 text-center text-white font-semibold">1 Crore <span className="text-sm font-normal text-white/80 block">Year 1 target</span></div>
          </div>

          {/* Revenue Model Table */}
          <div className="flex-1 w-full">
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#21262D] border-b border-[#30363D]">
                  <tr>
                    <th className="p-4 text-white font-semibold">Product</th>
                    <th className="p-4 text-white font-semibold">Revenue source</th>
                    <th className="p-4 text-white font-semibold text-right">Per user/year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  <tr>
                    <td className="p-4 text-gray-300">Daily Allowance</td>
                    <td className="p-4 text-gray-400">Free (acquisition)</td>
                    <td className="p-4 text-white font-mono text-right">₹0</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Micro Loans</td>
                    <td className="p-4 text-gray-400">Interest spread</td>
                    <td className="p-4 text-[#2EA043] font-mono text-right">₹800</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Insurance</td>
                    <td className="p-4 text-gray-400">Commission</td>
                    <td className="p-4 text-[#2EA043] font-mono text-right">₹180</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Premium features</td>
                    <td className="p-4 text-gray-400">Subscription</td>
                    <td className="p-4 text-[#2EA043] font-mono text-right">₹200</td>
                  </tr>
                </tbody>
                <tfoot className="bg-[#0D1117] border-t-2 border-[#30363D]">
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-white font-bold text-lg">
                      At 1 crore users: <span className="text-[#A855F7]">~₹500 crore ARR</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: PARTNERSHIPS ─── */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">How We Reach 30 Crore Workers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Platform B2B2C</h3>
            <p className="text-sm text-[#A855F7] mb-4">Swiggy, Zomato, Ola, Rapido, UC</p>
            <p className="text-gray-400 leading-relaxed text-sm">
              We pitch to platforms as a rider retention tool. 60%+ annual churn costs them crores. Mehnat reduces it. They embed us. We get free distribution to 30M riders overnight.
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Physical Distribution</h3>
            <p className="text-sm text-[#A855F7] mb-4">Petrol pumps, service centers, chai spots</p>
            <p className="text-gray-400 leading-relaxed text-sm">
              QR codes at petrol pumps, bike service centers, rider chai spots. ₹100 fuel credit for sign-up. CAC under ₹50.
            </p>
          </div>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-2">Champion Model</h3>
            <p className="text-sm text-[#A855F7] mb-4">WhatsApp groups, Telegram communities</p>
            <p className="text-gray-400 leading-relaxed text-sm">
              Existing riders earn ₹200 for every active referral. Rider WhatsApp groups + Telegram communities are our growth engine. Zero paid ads needed.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: ROADMAP ─── */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">What We're Building</h2>
        <div className="relative border-l-2 border-[#30363D] ml-4 md:ml-0 md:border-l-0 md:border-t-2 md:flex justify-between pt-8">
          {[
            { tag: "V1 NOW", title: "Daily allowance · Micro loans · ₹15 insurance · AI chat" },
            { tag: "V2 Q3 2026", title: "Auto-buckets · Goal savings · Income smoothing" },
            { tag: "V3 Q1 2027", title: "Full credit underwriting · Family OS · 8 languages" },
            { tag: "V4 2028", title: "30 crore users · ₹500cr ARR · India's gig worker bank" },
          ].map((item, i) => (
            <div key={i} className="mb-12 md:mb-0 md:w-1/4 md:pr-6 pl-8 md:pl-0 relative">
              {/* Timeline node */}
              <div className="absolute left-[-41px] md:left-0 md:top-[-41px] w-4 h-4 rounded-full bg-[#2EA043] border-4 border-[#0D1117]"></div>
              <div className="font-mono text-[#A855F7] text-sm font-bold mb-2">{item.tag}</div>
              <div className="text-white font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 11: FOOTER ─── */}
      <footer className="py-12 border-t border-[#21262D] text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-xl font-bold text-white mb-2">Mehnat — Aapki Kamai, Aapka Control</p>
          <p className="text-sm text-gray-500 mb-1">Built for Zupee Case Study · May 2026</p>
          <p className="text-sm text-gray-500">Krishna · +91 7337211721</p>
        </div>
      </footer>
    </main>
  );
}
`

const finalContent = beforeMarquee + newSections;
fs.writeFileSync(pagePath, finalContent, 'utf8');
console.log("Successfully updated page.tsx!");
