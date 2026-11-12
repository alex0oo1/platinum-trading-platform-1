

import { Link } from "react-router-dom";
import MarketNews from "./components/MarketNews";
import { lazy, Suspense, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ShieldCheck,
  Globe2,
  Menu,
  X,
  ChevronDown,
  Activity,
  Layers3,
  LockKeyhole,
  Smartphone,
  Zap,
  CheckCircle2,
  TrendingUp,
  LineChart,
  CandlestickChart,
  Wallet,
  Headphones,
  Star,
} from "lucide-react";
import "./App.css";

const markets = [
  { symbol: "EUR/USD", name: "Euro / US Dollar", category: "Forex", price: "1.08452", change: "+0.42%", positive: true },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", category: "Forex", price: "1.26784", change: "+0.28%", positive: true },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", category: "Forex", price: "149.625", change: "-0.16%", positive: false },
  { symbol: "XAU/USD", name: "Gold / US Dollar", category: "Metals", price: "2,942.80", change: "+1.24%", positive: true },
  { symbol: "BTC/USD", name: "Bitcoin / US Dollar", category: "Crypto", price: "86,420.50", change: "+2.18%", positive: true },
  { symbol: "ETH/USD", name: "Ethereum / US Dollar", category: "Crypto", price: "2,186.75", change: "-0.74%", positive: false },
];


const InteractiveGlobe = lazy(
  () => import("./components/InteractiveGlobe")
);

const features = [
  {
    icon: CandlestickChart,
    title: "Professional trading charts",
    description: "Explore advanced charting interfaces with multiple timeframes, technical indicators, and a workspace built for focused analysis.",
  },
  {
    icon: Zap,
    title: "Real-time market experience",
    description: "A responsive market workspace designed to integrate streaming prices, price alerts, and continuously updating instruments.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first architecture",
    description: "Account protection, verification workflows, and transparent security controls designed into the platform from the beginning.",
  },
  {
    icon: Layers3,
    title: "One connected workspace",
    description: "Move between markets, account insights, watchlists, and trading tools without losing your workflow.",
  },
  {
    icon: Smartphone,
    title: "Designed for every screen",
    description: "A consistent experience across desktop, tablet, and mobile, with layouts that adapt to the way you work.",
  },
  {
    icon: Headphones,
    title: "Support when you need it",
    description: "A planned help center with guided assistance, account support, and clear answers to common questions.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Brand({ compact = false }) {
  return (
    <a className="brand" href="#home" aria-label="PLATINUM home">
      <span className="brand-mark">
        <span>P</span>
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>PLATINUM</strong>
          <small>TRADE WITH PRECISION</small>
        </span>
      )}
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Markets", href: "#markets" },
    { label: "Platform", href: "#platform" },
    { label: "Why PLATINUM", href: "#features" },
    { label: "Security", href: "#security" },
  ];

  return (
    <header className="site-header">
      <div className="nav-container">
        <Brand />

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <Link className="nav-signin" to="/login">
            Login
          </Link>

          <Link className="btn btn-gold nav-start" to="/register">
            Create Account <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="platinum-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="platinum-mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
          >
            Create Account
          </Link>
        </nav>
      )}
    </header>
  );
}


function MarketTicker() {
  const items = [...markets, ...markets];

  return (
    <div className="market-ticker" aria-label="Sample market prices">
      <div className="ticker-label">
        <span className="live-dot" />
        MARKET PREVIEW
      </div>
      <div className="ticker-window">
        <div className="ticker-track">
          {items.map((market, index) => (
            <div className="ticker-item" key={`${market.symbol}-${index}`}>
              <strong>{market.symbol}</strong>
              <span>{market.price}</span>
              <span className={market.positive ? "positive" : "negative"}>
                {market.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {market.change}
              </span>
            </div>
          ))}
        </div>
      </div>
      <span className="ticker-disclaimer">Illustrative data</span>
    </div>
  );
}

function MiniChart() {
  const candles = [
    [34, 58, 28, 72], [56, 45, 38, 64], [44, 65, 35, 77],
    [65, 81, 57, 90], [80, 68, 60, 91], [68, 91, 62, 98],
    [90, 108, 82, 120], [108, 99, 91, 119], [100, 121, 94, 130],
    [120, 137, 110, 147], [138, 127, 119, 149], [127, 150, 120, 161],
    [151, 171, 143, 182], [171, 160, 150, 183], [160, 179, 153, 192],
    [179, 196, 170, 206], [196, 184, 178, 210], [184, 209, 179, 221],
    [210, 230, 201, 239], [230, 218, 208, 241], [218, 239, 212, 251],
    [239, 258, 229, 269], [258, 246, 237, 272], [246, 267, 241, 280],
  ];

  return (
    <div className="chart-visual">
      <div className="chart-grid" />
      <svg viewBox="0 0 720 320" preserveAspectRatio="none" aria-label="Illustrative candlestick chart">
        <defs>
          <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d7b474" stopOpacity=".16" />
            <stop offset="100%" stopColor="#d7b474" stopOpacity="0" />
          </linearGradient>
        </defs>
        {candles.map(([open, close, low, high], i) => {
          const x = 26 + i * 28;
          const up = close >= open;
          const y1 = 300 - open;
          const y2 = 300 - close;
          const top = Math.min(y1, y2);
          const height = Math.max(3, Math.abs(y1 - y2));
          const color = up ? "#36c9a0" : "#ee6b78";

          return (
            <g key={i}>
              <line
                x1={x} x2={x}
                y1={300 - high} y2={300 - low}
                stroke={color} strokeWidth="2"
              />
              <rect
                x={x - 6} y={top} width="12" height={height}
                rx="1.5" fill={color}
              />
            </g>
          );
        })}
        <line x1="0" x2="720" y1="76" y2="76" stroke="#d7b474" strokeDasharray="5 5" opacity=".45" />
      </svg>
      <span className="chart-price-label">1.08452</span>
    </div>
  );
}

function TradingPreview() {
  const [selected, setSelected] = useState("EUR/USD");
  const [timeframe, setTimeframe] = useState("1H");

  return (
    <div className="trading-preview">
      <div className="preview-topbar">
        <div className="preview-window-controls">
          <span /><span /><span />
        </div>
        <div className="preview-title">
          <Activity size={14} /> PLATINUM TERMINAL
        </div>
        <span className="preview-demo-label">INTERACTIVE PREVIEW</span>
      </div>

      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="preview-sidebar-title">
            <span>Watchlist</span>
            <Star size={15} />
          </div>
          {markets.slice(0, 5).map((market) => (
            <button
              key={market.symbol}
              type="button"
              className={`preview-market ${selected === market.symbol ? "selected" : ""}`}
              onClick={() => setSelected(market.symbol)}
            >
              <span>
                <strong>{market.symbol}</strong>
                <small>{market.category}</small>
              </span>
              <span className={market.positive ? "positive" : "negative"}>
                {market.price}
              </span>
            </button>
          ))}
        </aside>

        <div className="preview-main">
          <div className="preview-chart-header">
            <div>
              <strong>{selected}</strong>
              <span>Market overview · Illustrative</span>
            </div>
            <div className="preview-timeframes">
              {["15M", "1H", "4H", "1D"].map((frame) => (
                <button
                  key={frame}
                  type="button"
                  className={timeframe === frame ? "active" : ""}
                  onClick={() => setTimeframe(frame)}
                >
                  {frame}
                </button>
              ))}
            </div>
          </div>

          <MiniChart />

          <div className="preview-bottom">
            <span><span className="status-dot" /> Chart preview</span>
            <span>{timeframe} selected</span>
            <span>Not connected to live markets</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="container hero-layout">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={fadeUp} className="eyebrow-pill">
            <span className="live-dot" />
            INTRODUCING PLATINUM 
            <ArrowUpRight size={14} />
          </motion.div>

          <motion.h1 variants={fadeUp}>
            A higher standard
            <br />
            for the <span>modern trader.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-description">
            Discover a beautifully engineered trading workspace
            designed to bring market intelligence, powerful tools,
            and complete clarity into one seamless experience.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-buttons">
            <a className="btn btn-gold btn-large" href="#platform">
              Explore the platform <ArrowUpRight size={19} />
            </a>
            <a className="btn btn-outline btn-large" href="#features">
              Discover our features <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-highlights">
            <div><CheckCircle2 size={17} /> Advanced interface</div>
            <div><CheckCircle2 size={17} /> Built for every screen</div>
            <div><CheckCircle2 size={17} /> Security-minded design</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="floating-label floating-label-top">
            <BarChart3 size={17} />
            <span>Advanced market workspace</span>
          </div>
          <TradingPreview />
          <div className="floating-label floating-label-bottom">
            <ShieldCheck size={18} />
            <span>Built around clarity and control</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom-fade" />
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}


function GlobalExperienceSection() {
  return (
    <section className="section global-experience-section" id="global">
      <div className="container global-experience-layout">
        <div className="global-experience-copy">
          <span className="section-eyebrow">
            CONNECTED TO THE WORLD
          </span>

          <h2>
            Global markets.
            <br />
            <span>One extraordinary perspective.</span>
          </h2>

          <p>
            Explore a world of financial opportunities through
            an interactive global experience designed for
            modern traders.
          </p>

          <p>
            Move your cursor across the globe or drag to explore
            different regions.
          </p>

          <a className="btn btn-gold btn-large" href="#markets">
            Explore global markets <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="global-experience-visual">
          
<Suspense
  fallback={
    <div
      className="globe-loading"
      role="status"
    >
      Preparing global experience...
    </div>
  }
>
  <InteractiveGlobe />
</Suspense>

        </div>
      </div>
    </section>
  );
}


function MarketsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Forex", "Crypto", "Metals"];
  const filtered = filter === "All" ? markets : markets.filter((m) => m.category === filter);

  return (
    <section className="section markets-section" id="markets">
      <div className="container">
        <div className="section-top-row">
          <SectionHeading
            eyebrow="GLOBAL MARKETS"
            title={<>Discover the markets.<br /><span>Find your opportunity.</span></>}
            description="Explore a carefully designed market discovery experience, with intuitive filters and clear instrument information."
          />
          <div className="market-filters" role="group" aria-label="Filter markets">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="market-table-wrap">
          <div className="market-table-header">
            <span>INSTRUMENT</span>
            <span>MARKET</span>
            <span>REFERENCE PRICE</span>
            <span>ILLUSTRATIVE CHANGE</span>
          </div>
          {filtered.map((market) => (
            <div className="market-table-row" key={market.symbol}>
              <div className="market-instrument">
                <span className="instrument-icon"><TrendingUp size={18} /></span>
                <div>
                  <strong>{market.symbol}</strong>
                  <small>{market.name}</small>
                </div>
              </div>
              <span className="market-category">{market.category}</span>
              <strong className="market-price">{market.price}</strong>
              <span className={`market-change ${market.positive ? "positive" : "negative"}`}>
                {market.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {market.change}
              </span>
            </div>
          ))}
          <div className="market-table-note">
            All prices and changes on this page are illustrative.
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="BUILT FOR WHAT'S NEXT"
          title={<>Every detail.<br /><span>Designed with purpose.</span></>}
          description="From market discovery to account management, PLATINUM is being designed as a connected, intuitive financial experience."
          center
        />

        <div className="features-grid">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              className="feature-card"
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: (index % 3) * 0.08 }}
            >
              <div className="feature-icon"><Icon size={24} strokeWidth={1.7} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <ArrowUpRight className="feature-arrow" size={18} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="section platform-section" id="platform">
      <div className="container platform-layout">
        <div className="platform-copy">
          <span className="section-eyebrow">THE PLATINUM EXPERIENCE</span>
          <h2>Everything you need.<br /><span>One powerful workspace.</span></h2>
          <p>
            Creating a trading environment that brings your market
            watchlists, charting tools, account information, and trading
            workflow together in one refined interface.
          </p>
          <div className="platform-benefits">
            <div><LineChart size={21} /><span>Interactive multi-timeframe charting</span></div>
            <div><Globe2 size={21} /><span>Unified market discovery</span></div>
            <div><Wallet size={21} /><span>Clear account and portfolio views</span></div>
            <div><LockKeyhole size={21} /><span>Security-focused account controls</span></div>
          </div>
          <a className="btn btn-outline btn-large" href="#security">
            Explore our approach <ArrowRight size={18} />
          </a>
        </div>

        <div className="platform-visual">
          <TradingPreview />
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="section security-section" id="security">
      <div className="container security-panel">
        <div className="security-emblem"><ShieldCheck size={48} strokeWidth={1.3} /></div>
        <span className="section-eyebrow">SECURITY BY DESIGN</span>
        <h2>Confidence begins<br />with <span>the right foundation.</span></h2>
        <p>
          We believe a professional trading experience should prioritize
          transparency, thoughtful safeguards, and clear communication.
          Our production security and financial integrations are validated.
        </p>
        <div className="security-points">
          <span><CheckCircle2 size={17} /> Transparent account information</span>
          <span><CheckCircle2 size={17} /> Planned authentication safeguards</span>
          <span><CheckCircle2 size={17} /> Clear transaction statuses</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              A premium financial technology experience,
              thoughtfully designed for the next generation of traders.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <a href="#markets">Markets</a>
              <a href="#platform">Platform</a>
              <a href="#features">Features</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#home">Home</a>
              <a href="#security">Security</a>
              <a href="mailto:support@example.com">Contact (placeholder)</a>
            </div>
            <div>
              <h4>Platform</h4>
              <a href="#platform">Trading workspace</a>
              <a href="#markets">Market overview</a>
              <a href="#security">Account protection</a>
            </div>
          </div>
        </div>

        <div className="footer-disclaimer">
          PLATINUM IS COMING SOON.
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PLATINUM. All rights reserved.</span>
          <span>TRADE WITH PRECISION</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <MarketTicker />
        <Hero />
<GlobalExperienceSection />
<MarketsSection />
<MarketNews />
        <FeaturesSection />
        <PlatformSection />
        <SecuritySection />
      </main>
      <Footer />
    </>
  );
}
