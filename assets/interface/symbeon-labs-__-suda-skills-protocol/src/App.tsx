import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, Zap, Code, Activity, Wallet, FileText, Key, Search, Network, ChevronRight, Settings, Coins, ShieldCheck, Eye, Brain, Languages } from 'lucide-react';

// --- Types ---
type Page = 'landing' | 'auth' | 'dashboard' | 'transaction' | 'settlement';

// --- Components ---

const Header = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <header className="flex items-center justify-between border-b border-primary/20 bg-background-dark/80 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
    <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('landing')}>
      <div className="text-primary">
        <Terminal size={32} />
      </div>
      <h2 className="text-primary text-sm md:text-lg font-bold tracking-tighter uppercase">
        SYMBEON LABS // SUDA-SKILLS PROTOCOL
      </h2>
    </div>
    <div className="hidden lg:flex flex-1 justify-end gap-6 items-center">
      <div className="flex gap-4 text-[10px] tracking-widest">
        <span className="border border-primary/30 px-2 py-1 text-primary/70">[ STATE: ALPHA v0.1 ]</span>
        <span className="border border-primary/30 px-2 py-1 text-primary/70">[ REACH: LOCAL-FIRST ]</span>
        <span className="border border-primary/30 px-2 py-1 text-primary/70">[ AUDIT: ZKP-READY ]</span>
      </div>
      <button 
        onClick={() => onNavigate('auth')}
        className="bg-primary text-background-dark px-4 py-2 text-xs font-bold hover:bg-white transition-colors uppercase"
      >
        [ ENTER SKILLVAULT TERMINAL ]
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer className="p-8 md:p-16 border-t border-primary/10 bg-neutral-900/50">
    <div className="flex flex-col md:flex-row justify-between gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="text-primary" size={24} />
          <span className="font-bold tracking-tighter text-slate-100">SYMBEON LABS</span>
        </div>
        <p className="text-slate-400 text-sm max-w-xs font-sans">
          Building the neural substrate for the next generation of autonomous digital entities.
        </p>
        <p className="text-primary text-xs font-mono italic">
          "First, Suda-Skills (Value). Next, SUDA (Memory)."
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-primary text-xs font-bold uppercase mb-4 tracking-widest">Protocol</h4>
          <ul className="text-slate-500 text-xs space-y-2 font-mono">
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills#readme" target="_blank" rel="noreferrer">[ Documentation ]</a></li>
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills/blob/main/SPEC.md" target="_blank" rel="noreferrer">[ Whitepaper ]</a></li>
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://symbeon-labs-suda-skills-protocol.vercel.app" target="_blank" rel="noreferrer">[ SkillVault ]</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary text-xs font-bold uppercase mb-4 tracking-widest">Community</h4>
          <ul className="text-slate-500 text-xs space-y-2 font-mono">
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs" target="_blank" rel="noreferrer">[ GitHub ]</a></li>
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills/discussions" target="_blank" rel="noreferrer">[ Discussions ]</a></li>
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills/issues" target="_blank" rel="noreferrer">[ Issues ]</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary text-xs font-bold uppercase mb-4 tracking-widest">Legal</h4>
          <ul className="text-slate-500 text-xs space-y-2 font-mono">
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills/blob/main/LICENSE" target="_blank" rel="noreferrer">[ MIT License ]</a></li>
            <li><a className="hover:text-primary transition-colors underline decoration-primary/20" href="https://github.com/symbeon-labs/suda-skills/blob/main/SECURITY.md" target="_blank" rel="noreferrer">[ Security Policy ]</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
      <a href="https://github.com/symbeon-labs" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">© 2026 SYMBEON LABS. ALL RIGHTS RESERVED.</a>
      <div className="flex gap-4">
        <a href="https://github.com/symbeon-labs/suda-skills" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GITHUB: SYMBEON-LABS/SUDA-SKILLS</a>
        <a href="https://symbeon-labs-suda-skills-protocol.vercel.app" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LIVE: VERCEL</a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const LandingPage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <div className="flex-1">
    <section className="relative border-b border-primary/10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-16 flex flex-col justify-center gap-8 border-r border-primary/10">
          <div className="space-y-4">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 text-xs border border-primary/20">
              SYSTEM_STATUS: OPERATIONAL &nbsp;·&nbsp; SURGE × OPENCLAW HACKATHON 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tighter text-slate-100 uppercase font-display">
              THE ECONOMIC PRIMITIVE FOR <span className="text-primary">SOVEREIGN AI AGENTS</span>
            </h1>
            <p className="text-slate-400 font-sans max-w-md text-lg leading-relaxed">
              Suda-Skills transforms AI capabilities into tokenized, on-chain assets. Register, discover and monetize agentic skills with zero intermediaries — powered by the x402 standard and the $SURGE network.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-primary text-background-dark px-8 py-4 font-bold hover:invert transition-all border border-primary uppercase text-sm"
            >
              [ EXPLORE SKILLVAULT ]
            </button>
            <button 
              onClick={() => onNavigate('transaction')}
              className="border border-primary text-primary px-8 py-4 font-bold hover:bg-primary/10 transition-all uppercase text-sm"
            >
              [ VIEW PROTOCOL SPEC ]
            </button>
          </div>
        </div>
        <div className="relative min-h-[400px] bg-neutral-900 overflow-hidden group">
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen bg-center bg-cover" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXVvTg-dq6QzfJ6Va-pFnXtlG_zNqlz-bQ2bfpaCyzlXmF6ThvW4uXSv5lP1YVGvwGcidVZ3n3PY89UTRaohkBamG_FiaBu3fuszOxCjw9nTNjn9H61_ARpgVujJYW78IfNciIspPLPS9SwWxhoDc5O1gqeJGCKKYATEdGGNfDB7qlCjea_Gx0CKsY3dJoMMunEsH6lyLMqEhB4uOhyODaQBPjextvrovwTlBxcMX0081uggGszFGrQfBGl6bd7i6vm9r71VqIyUY')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 p-4 bg-background-dark/90 border border-primary/20 font-mono text-[10px] text-primary/60">
            <p>&gt; BOOTING_SUDA_KERNEL...</p>
            <p>&gt; LOADING SKILL_VAULT_ENCRYPTOR...</p>
            <p>&gt; ESTABLISHING ZKP_HANDSHAKE... [SUCCESS]</p>
            <p>&gt; AGENT_IDENTITY_VERIFIED: 0x82...F92A</p>
          </div>
        </div>
      </div>
    </section>

    <section className="p-8 md:p-16 bg-neutral-900/50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-slate-100 mb-4 uppercase tracking-tighter font-display">The Three Pillars of Agentic Sovereignty</h2>
          <p className="text-slate-400 font-sans">A production-ready protocol stack for the $SURGE × OpenClaw ecosystem — where AI capabilities become verifiable, tradeable, and permanently auditable on-chain.</p>
        </div>
        <div className="text-primary text-xs opacity-50 font-mono">
          PROTOCOL: URTN v1.0 | X402 STANDARD
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-primary/10">
        <div className="p-8 border-b md:border-b-0 md:border-r border-primary/10 hover:bg-primary/5 transition-colors group">
          <div className="text-primary mb-6 flex items-center gap-2">
            <Code size={32} />
            <span className="text-[10px] font-mono opacity-50">#01</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3 uppercase tracking-tighter font-display">URTN Identity</h3>
          <p className="text-slate-400 font-sans text-sm leading-relaxed">
            Universal Resource Token Network. Each skill receives a globally unique on-chain identity — a tamper-proof <code className="text-primary/80">core.json</code> manifest signed with SHA-256 and optionally verified via ZKP.
          </p>
          <div className="mt-6 pt-6 border-t border-primary/5 text-[10px] text-primary/40 font-mono group-hover:text-primary transition-colors">
            STANDARD: URTN-v1 | ZKP-COMPATIBLE
          </div>
        </div>
        <div className="p-8 border-b md:border-b-0 md:border-r border-primary/10 hover:bg-primary/5 transition-colors group">
          <div className="text-primary mb-6 flex items-center gap-2">
            <Activity size={32} />
            <span className="text-[10px] font-mono opacity-50">#02</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3 uppercase tracking-tighter font-display">X402 Payments</h3>
          <p className="text-slate-400 font-sans text-sm leading-relaxed">
            HTTP-native micropayments. The server issues a standard <code className="text-primary/80">402 Payment Required</code> challenge. The agent pays in $SURGE and retries with the on-chain <code className="text-primary/80">tx_hash</code> as proof. Zero registration. Zero friction.
          </p>
          <div className="mt-6 pt-6 border-t border-primary/5 text-[10px] text-primary/40 font-mono group-hover:text-primary transition-colors">
            ENGINE: X402 | SPLIT: 80/10/10
          </div>
        </div>
        <div className="p-8 hover:bg-primary/5 transition-colors group">
          <div className="text-primary mb-6 flex items-center gap-2">
            <Shield size={32} />
            <span className="text-[10px] font-mono opacity-50">#03</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-3 uppercase tracking-tighter font-display">Local-First</h3>
          <p className="text-slate-400 font-sans text-sm leading-relaxed">
            Agents execute sensitive logic locally via the OpenClaw runtime, while validity proofs are broadcast to the SURGE network. Your data never touches a centralized server.
          </p>
          <div className="mt-6 pt-6 border-t border-primary/5 text-[10px] text-primary/40 font-mono group-hover:text-primary transition-colors">
            ARCHITECTURE: LOCAL-FIRST | ZKP-HARDENED
          </div>
        </div>
      </div>
    </section>

    {/* SDK Section */}
    <section className="p-8 md:p-16 border-t border-primary/10 bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-primary text-xs font-mono mb-2 uppercase tracking-widest">// FOR DEVELOPERS</p>
              <h2 className="text-4xl font-black text-slate-100 uppercase tracking-tighter font-display">Build on the<br/><span className="text-primary">Suda-Skills SDK</span></h2>
            </div>
            <p className="text-slate-400 font-sans leading-relaxed">
              The Suda-Skills SDK gives any developer the tools to register sovereign skills, handle x402 micropayments, and integrate seamlessly into the OpenClaw agent ecosystem. Five lines of code to become a node in the agentic economy.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code, title: 'TypeScript SDK', desc: 'Full type-safety with the OpenClaw Plugin API' },
                { icon: Shield, title: 'ZKP-Ready Auth', desc: 'Cryptographic signing built-in' },
                { icon: Zap, title: 'X402 Handler', desc: 'Automatic payment negotiation middleware' },
                { icon: Network, title: 'Multi-Network', desc: 'Base, Sepolia, and $SURGE mainnet' },
              ].map((f, i) => (
                <div key={i} className="border border-primary/10 p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <f.icon className="text-primary mb-2" size={20} />
                  <p className="text-white text-xs font-bold uppercase tracking-tight">{f.title}</p>
                  <p className="text-slate-500 text-[10px] mt-1 font-sans">{f.desc}</p>
                </div>
              ))}
            </div>
            <a href="https://github.com/symbeon-labs/suda-skills" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-primary text-primary px-6 py-3 text-xs font-bold hover:bg-primary hover:text-background-dark transition-all uppercase tracking-widest">
              <Code size={14} /> [ READ THE DOCS ON GITHUB ]
            </a>
          </div>
          <div className="bg-neutral-900 border border-primary/30 p-1">
            <div className="bg-black/60 p-4 border border-primary/10">
              <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-2">
                <div className="flex gap-2">
                  <div className="size-2 bg-red-500/50"></div>
                  <div className="size-2 bg-yellow-500/50"></div>
                  <div className="size-2 bg-primary/50"></div>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">suda-skills-sdk · agent.ts</span>
              </div>
              <div className="font-mono text-xs md:text-sm space-y-1 py-2">
                <p className="text-slate-500">{'// 1. Install the SDK'}</p>
                <p><span className="text-primary">$</span> <span className="text-slate-300">npm install @symbeon/suda-skills ethers</span></p>
                <br/>
                <p className="text-slate-500">{'// 2. Register your first Skill'}</p>
                <p><span className="text-slate-400">import</span> <span className="text-primary">{'{ SkillVault }'}</span> <span className="text-slate-400">from</span> <span className="text-green-400">'@symbeon/suda-skills'</span><span className="text-slate-400">;</span></p>
                <br/>
                <p><span className="text-slate-400">const</span> <span className="text-primary">vault</span> <span className="text-slate-400">=</span> <span className="text-slate-300">new SkillVault({'{'}</span></p>
                <p><span className="text-slate-300">&nbsp;&nbsp;network: </span><span className="text-green-400">'surge'</span><span className="text-slate-300">,</span></p>
                <p><span className="text-slate-300">&nbsp;&nbsp;privateKey: process.env.</span><span className="text-primary">AGENT_KEY</span></p>
                <p><span className="text-slate-300">{'})'}</span><span className="text-slate-400">;</span></p>
                <br/>
                <p><span className="text-slate-400">await</span> <span className="text-primary">vault</span><span className="text-slate-400">.register({'{'}</span></p>
                <p><span className="text-slate-300">&nbsp;&nbsp;name: </span><span className="text-green-400">'deep-translation-v2'</span><span className="text-slate-300">,</span></p>
                <p><span className="text-slate-300">&nbsp;&nbsp;price: </span><span className="text-primary">2.5</span><span className="text-slate-300">, currency: </span><span className="text-green-400">'SURGE'</span></p>
                <p><span className="text-slate-300">{'})'}</span><span className="text-slate-400">; // txHash returned ✓</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="p-8 md:p-16 border-t border-primary/10 bg-black/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-primary/20"></div>
          <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-tighter font-display">X402 Integration in 3 Steps</h2>
          <div className="h-[1px] flex-1 bg-primary/20"></div>
        </div>
        <div className="bg-neutral-900 border border-primary/30 p-1">
          <div className="bg-black/50 p-4 border border-primary/10">
            <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-2">
              <div className="flex gap-2">
                <div className="size-2 bg-red-500/50"></div>
                <div className="size-2 bg-yellow-500/50"></div>
                <div className="size-2 bg-primary/50"></div>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">suda-skills · quickstart.sh</span>
            </div>
            <div className="font-mono text-sm md:text-base space-y-3 py-4">
              <div className="flex gap-4">
                <span className="text-primary/40 select-none">01</span>
                <p className="text-slate-400"><span className="text-primary">$</span> npm install @symbeon/suda-skills ethers dotenv</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary/40 select-none">02</span>
                <p className="text-slate-400"><span className="text-primary">$</span> suda register --name <span className="text-primary">"my-skill"</span> --price <span className="text-primary">2.5 SURGE</span></p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary/40 select-none">03</span>
                <p className="text-slate-400"><span className="text-primary">$</span> suda vault --sync <span className="text-slate-500">// Auto-listens for x402 challenges</span></p>
              </div>
              <div className="pt-2 border-t border-primary/10 text-[10px] text-primary/50 font-mono">
                ✓ Skill registered · ✓ X402 middleware active · ✓ SURGE payments flowing
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <a href="https://github.com/symbeon-labs/suda-skills" target="_blank" rel="noreferrer" className="bg-primary/10 border border-primary text-primary px-4 py-2 text-xs font-bold hover:bg-primary hover:text-background-dark transition-all">
                [ VIEW FULL DOCUMENTATION ]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AuthPage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-[80vh]">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-full w-full pointer-events-none"></div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-2xl z-10"
    >
      <div className="border border-primary/30 bg-terminal-bg/90 backdrop-blur-md shadow-[0_0_40px_rgba(0,255,64,0.1)]">
        <header className="flex items-center justify-between border-b border-primary/30 px-6 py-4 bg-primary/5">
          <div className="flex items-center gap-3">
            <Shield className="text-primary" size={20} />
            <h1 className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
              ACCESS GATEWAY // SYMBEON-SECURE-V1
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="h-3 w-3 border border-primary/50"></div>
            <div className="h-3 w-3 border border-primary/50 bg-primary/20"></div>
          </div>
        </header>
        <div className="p-8 space-y-8">
          <div className="space-y-2 text-center border-b border-primary/10 pb-6">
            <p className="text-[10px] text-primary/60 uppercase tracking-widest">Local Node SHA-256 Fingerprint</p>
            <div className="font-mono text-xs break-all bg-primary/5 p-3 border border-primary/20 text-primary/80">
              8F4E6A21B90D7C4F...E5A912C3D4B5A6F7
            </div>
            <p className="text-[10px] text-primary flex items-center justify-center gap-2 mt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              STATUS: ENCRYPTED_CONNECTION_ESTABLISHED
            </p>
          </div>
          <div className="bg-primary/10 border border-primary/40 p-3 text-center">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">⚡ DEMO ACCESS — HACKATHON REVIEW MODE</p>
            <p className="text-[10px] text-primary/70 mt-1">ID: <span className="font-mono">AGENT_0x_SYMBEON_DEMO</span> · KEY: <span className="font-mono">SURGE_TRIAL_KEY_2026</span></p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-tighter uppercase text-primary/70">
                &gt; AGENT_ID
              </label>
              <div className="relative">
                <input 
                  className="w-full bg-primary/5 border border-primary/30 text-primary p-4 focus:ring-0 focus:border-primary outline-none placeholder:text-primary/20 text-sm" 
                  defaultValue="AGENT_0x_SYMBEON_DEMO"
                  type="text"
                />
                <Terminal className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-tighter uppercase text-primary/70">
                &gt; SIGNATURE_KEY
              </label>
              <div className="relative">
                <input 
                  className="w-full bg-primary/5 border border-primary/30 text-primary p-4 focus:ring-0 focus:border-primary outline-none placeholder:text-primary/20 text-sm" 
                  defaultValue="SURGE_TRIAL_KEY_2026"
                  type="password"
                />
                <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
              </div>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full bg-primary text-background-dark font-bold py-4 text-sm tracking-[0.3em] hover:bg-primary/90 transition-colors uppercase"
            >
              AUTHENTICATE
            </button>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button className="flex items-center justify-center gap-2 border border-primary/30 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-primary/10 transition-colors">
                <Wallet size={14} />
                Connect Hardware Wallet
              </button>
              <button className="flex items-center justify-center gap-2 border border-primary/30 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-primary/10 transition-colors">
                <FileText size={14} />
                Load Private Key
              </button>
            </div>
          </div>
        </div>
        <footer className="border-t border-primary/30 px-6 py-4 bg-primary/5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-primary/60">
            <div className="flex items-center">
              <span className="text-primary mr-2">!</span>
              UNAUTHORIZED ACCESS IS LOGGED ON THE SURGE NETWORK
              <span className="inline-block w-1.5 h-3 bg-primary ml-1 blink"></span>
            </div>
            <div className="flex gap-4">
              <span>LATENCY: 12ms</span>
              <span>V.4.2.0</span>
            </div>
          </div>
        </footer>
      </div>
      <div className="mt-8 flex justify-between items-center px-4">
        <div className="flex flex-col gap-1">
          <div className="h-1 w-24 bg-primary/20"></div>
          <div className="h-1 w-16 bg-primary/10"></div>
        </div>
        <div className="text-[10px] text-primary/40 flex items-center gap-4 uppercase font-bold">
          <span>SkillVault Dashboard</span>
          <Network size={12} />
          <span>Suda-Skills OS</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <div className="h-1 w-24 bg-primary/20"></div>
          <div className="h-1 w-16 bg-primary/10"></div>
        </div>
      </div>
    </motion.div>
  </div>
);

const DashboardPage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <div className="flex-1 p-12 relative">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center gap-4 mb-8 text-[9px] tracking-widest text-primary/50 font-bold uppercase">
        <span>Directory</span>
        <ChevronRight size={10} />
        <span className="text-primary">SkillVault_Registry</span>
        <span className="ml-auto text-primary/30">Uptime: 99.998%</span>
      </div>

      <div className="mb-12 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 border-b border-primary/10 pb-10">
        <div className="space-y-4">
          <h2 className="text-7xl font-black text-primary font-display tracking-tighter uppercase leading-none">SkillVault</h2>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            Decoupled intelligence primitives for sovereign autonomous agents. Secure, local-first registry of verified cryptographic skill modules.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('settlement')}
            className="border border-primary text-primary px-8 py-3 text-xs font-bold hover:bg-primary/10 transition-all uppercase tracking-widest active:scale-95"
          >
            [ REGISTER_NEW_SKILL ]
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[
          { title: 'Deep-Translation-v2', desc: 'LLM-agnostic semantic mapping cluster.', icon: Languages, id: '0x82f913d944e8c12a664e12e11a3b942', price: '2.5 $SURGE/ex' },
          { title: 'Neural-Optic-Parser', desc: 'Multimodal spatial analysis and object persistence.', icon: Eye, id: '0x44d188b22a11b98cc6e0011b22e131', price: '1.8 $SURGE/ex' },
          { title: 'Logic-Gate-Alpha', desc: 'High-order reasoning constraints for ethical alignment.', icon: Brain, id: '0x11c772f44b01e2229944c11b02a991', price: '4.0 $SURGE/ex', pending: true },
        ].map((skill, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-black/40 border border-primary/20 group hover:border-primary/60 transition-all p-6 flex flex-col gap-6 relative overflow-hidden cinematic-glow"
          >
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-10">
              <Coins className="text-primary -mr-4 -mt-4" size={64} />
            </div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 bg-primary/5 flex items-center justify-center text-primary border border-primary/20">
                <skill.icon size={32} />
              </div>
              <div className="flex flex-col items-end gap-2">
                {skill.pending ? (
                  <div className="text-[9px] border border-primary/40 text-primary font-black px-2 py-0.5 tracking-tighter">
                    VALIDATION_PENDING
                  </div>
                ) : (
                  <div className="text-[9px] bg-primary text-background-dark font-black px-2 py-0.5 flex items-center gap-1.5 tracking-tighter">
                    <ShieldCheck size={12} /> ZKP_VERIFIED
                  </div>
                )}
                <span className="text-primary font-mono text-xs font-bold">{skill.price}</span>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl uppercase tracking-tight group-hover:text-primary transition-colors font-display">{skill.title}</h3>
              <p className="text-slate-400 text-xs mt-2 font-medium">{skill.desc}</p>
            </div>
            <div className="bg-black/60 p-3 border border-primary/10 font-mono text-[9px] text-primary/50 break-all leading-tight">
              <span className="text-primary/30">ID:</span> {skill.id}
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold py-3 uppercase hover:bg-primary hover:text-background-dark transition-all tracking-widest">Inspect_Core</button>
              <button className="px-3 bg-neutral-800 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-colors">
                <Settings size={14} />
              </button>
            </div>
          </motion.div>
        ))}
        <div className="border-2 border-dashed border-primary/20 hover:border-primary/50 p-6 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer transition-all hover:bg-primary/5 min-h-[320px]">
          <div className="w-16 h-16 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary transition-all">
            < Brain size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Initialize New Asset</p>
            <p className="text-primary/40 text-[10px] uppercase font-mono tracking-widest">EXECUTE: REGISTER_SKILL_01</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TransactionPage = () => (
  <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-12">
    <section className="mb-20">
      <div className="border-l-4 border-primary pl-6 py-4">
        <p className="font-mono text-primary text-sm mb-2">// URTN PROTOCOL v1.0 — OPENCLAW × SURGE HACKATHON 2026</p>
        <h1 className="text-4xl lg:text-7xl font-black uppercase leading-none tracking-tighter max-w-4xl font-display">
          HOW AN <span className="text-primary">AI AGENT</span> BUYS A SKILL
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-slate-400 max-w-2xl font-light">
          A step-by-step breakdown of the x402 protocol flow — from skill discovery to atomic settlement on the $SURGE network. No intermediaries, no API keys, no billing dashboards.
        </p>
      </div>
    </section>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <section className="lg:col-span-8 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/20"></div>
        <div className="space-y-12">
          {[
            { phase: '01', title: 'DISCOVERY', icon: Search, desc: "Agent A queries the URTN index for 'deep-translation-v2'. The SkillVault returns a signed core.json manifest with pricing, availability, and the ZKP proof-of-execution hash." },
            { phase: '02', title: 'X402 CHALLENGE', icon: Network, desc: "Agent A calls the skill endpoint. The server (Rust/Axum) responds with HTTP 402 and an X-Payment-Request header specifying the $SURGE amount, destination wallet, and chain ID (e.g., Base 8453)." },
            { phase: '03', title: 'PAY & PROVE', icon: Shield, desc: "Agent A executes the micropayment on-chain and retries the request with the X-402-Payment-Proof header containing the transaction hash. The server validates and executes the skill." },
            { phase: '04', title: 'SETTLEMENT', icon: Wallet, desc: "The smart contract atomically splits the payment: 80% creator, 10% Symbeon governance, 10% community collective. The URTN transaction log is updated on-chain, immutably." },
          ].map((step, i) => (
            <div key={i} className="relative flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="size-12 neon-border bg-black flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <step.icon size={20} />
                </div>
                {i < 3 && <div className="w-px h-full bg-primary/30 mt-2"></div>}
              </div>
              <div className={`pb-12 ${i < 3 ? 'border-b border-primary/10' : ''} w-full`}>
                <span className="font-mono text-primary text-xs uppercase tracking-[0.2em] mb-2 block">Phase {step.phase}</span>
                <h3 className="text-2xl font-bold uppercase mb-3 font-display">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed font-mono text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="lg:col-span-4 space-y-6 sticky top-24">
        <div className="neon-border bg-black p-1">
          <div className="flex items-center justify-between px-3 py-2 border-b border-primary/20">
            <span className="font-mono text-[10px] text-primary/60">LIVE_PAYLOAD_VIEWER</span>
            <div className="flex gap-1.5">
              <div className="size-2 bg-red-500/50"></div>
              <div className="size-2 bg-yellow-500/50"></div>
              <div className="size-2 bg-primary/50"></div>
            </div>
          </div>
          <div className="p-4 font-mono text-sm bg-black overflow-x-auto">
            <pre className="text-primary/90"><code>{`{
  "protocol": "x402-v1",
  "agent_id": "0x9f...123",
  "skill_hash": "sha256:8f2...",
  "value": "2.5 $SURGE",
  "status": "TRANSMITTING...",
  "timestamp": "2024-05-21T...Z"
}`}</code></pre>
          </div>
        </div>
        <div className="p-6 bg-primary/5 neon-border">
          <h4 className="font-mono font-bold text-sm mb-4 border-b border-primary/20 pb-2">NETWORK STATUS</h4>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">TPS:</span>
              <span className="text-primary">12,402</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Gas Price:</span>
              <span className="text-primary">0.0004 SURGE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 uppercase">Latency:</span>
              <span className="text-primary">14ms</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
);

const SettlementPage = () => (
  <div className="flex-1 flex flex-col items-center px-4 py-10 md:px-20 lg:px-40">
    <div className="layout-content-container flex flex-col max-w-[1200px] w-full gap-12">
      <div className="flex flex-col gap-4 border-l-4 border-primary pl-6">
        <h1 className="text-primary text-5xl font-black leading-tight tracking-tighter font-mono uppercase">
          Atomic Settlement Architecture
        </h1>
        <p className="text-slate-400 text-lg font-normal leading-normal max-w-2xl">
          Deterministic distribution logic for autonomous value routing. The X402 standard ensures zero-latency revenue partitioning across decentralized identities.
        </p>
      </div>

      <div className="relative w-full border border-primary/20 bg-background-dark/40 p-12 overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="w-32 h-32 border-2 border-primary flex items-center justify-center bg-background-dark shadow-[0_0_15px_rgba(0,255,64,0.3)]">
              <span className="text-primary font-mono font-bold text-xl">INPUT</span>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl font-bold font-mono">2.5 $SURGE</p>
              <p className="text-primary text-xs font-mono tracking-widest">TRANSACTION_ID: 0x8a...2c</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full md:w-[400px]">
            <div className="group flex flex-col gap-2 p-4 border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-primary text-xs font-mono font-bold">CHANNEL_01 // 80%</span>
                <Zap className="text-primary" size={14} />
              </div>
              <p className="text-white text-lg font-bold font-mono">CREATOR WALLET</p>
              <div className="flex justify-between items-end">
                <p className="text-primary text-2xl font-bold font-mono">2.00 $SURGE</p>
                <p className="text-slate-500 text-[10px] font-mono">ID: AUTH_SPLIT_v1</p>
              </div>
            </div>
            <div className="group flex flex-col gap-2 p-4 border border-slate-700 bg-slate-900/40 hover:border-primary/40 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-mono font-bold">CHANNEL_02 // 10%</span>
                <Settings className="text-slate-400" size={14} />
              </div>
              <p className="text-white text-lg font-bold font-mono uppercase">Governance DAO</p>
              <div className="flex justify-between items-end">
                <p className="text-slate-200 text-2xl font-bold font-mono">0.25 $SURGE</p>
                <p className="text-slate-500 text-[10px] font-mono">ID: DAO_TREASURY</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-primary font-mono text-sm tracking-widest flex items-center gap-2">
            <span className="size-2 bg-primary"></span> [TABLE_01] PERFORMANCE_METRICS
          </h3>
          <div className="border border-primary/20 font-mono text-sm overflow-hidden">
            <div className="grid grid-cols-2 border-b border-primary/20 bg-primary/5">
              <div className="p-4 text-slate-400 uppercase tracking-tighter">Parameter</div>
              <div className="p-4 text-slate-400 uppercase tracking-tighter">Verified Metric</div>
            </div>
            <div className="grid grid-cols-2 border-b border-primary/10">
              <div className="p-4 text-white">Function</div>
              <div className="p-4 text-primary font-bold">split_payment_v1</div>
            </div>
            <div className="grid grid-cols-2 border-b border-primary/10">
              <div className="p-4 text-white">Gas Efficiency</div>
              <div className="p-4 text-primary font-bold">&lt; 45,000 units</div>
            </div>
            <div className="grid grid-cols-2 border-b border-primary/10">
              <div className="p-4 text-white">Settlement Time</div>
              <div className="p-4 text-primary font-bold">&lt; 1.2s (Surge Mainnet)</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-primary font-mono text-sm tracking-widest flex items-center gap-2">
            <span className="size-2 bg-primary"></span> [SCRIPT_01] CORE_LOGIC
          </h3>
          <div className="bg-black/80 border border-primary/30 p-6 font-mono text-sm relative">
            <pre className="text-primary/90"><code>{`async function split_payment_v1(amount: bigint) {
  const creator_share = (amount * 80n) / 100n;
  const dao_share = (amount * 10n) / 100n;
  const pool_share = amount - (creator_share + dao_share);

  await SurgeProtocol.atomicTransfer([
    { to: CREATOR_ADDR, value: creator_share },
    { to: DAO_ADDR, value: dao_share },
    { to: POOL_ADDR, value: pool_share }
  ]);
}`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('landing');

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <div className="scanline"></div>
      
      <Header onNavigate={setCurrentPage} />
      
      <main className="flex-1 flex flex-col">
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'auth' && <AuthPage onNavigate={setCurrentPage} />}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={setCurrentPage} />}
        {currentPage === 'transaction' && <TransactionPage />}
        {currentPage === 'settlement' && <SettlementPage />}
      </main>

      <Footer />

      {/* Decorative Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none border-[20px] border-background-dark z-50"></div>
    </div>
  );
}
