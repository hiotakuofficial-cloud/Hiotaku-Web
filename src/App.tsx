import Countdown from './components/Countdown'
import Scene from './components/Scene'

function App() {
  return (
    <div className="app">
      <div className="bg" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="nav">
        <div className="brand">
          <span className="brandDot" aria-hidden="true" />
          <span className="brandName">Hiotaku</span>
        </div>
        <nav className="navLinks">
          <a href="#features">Features</a>
          <a href="#preview">Preview</a>
          <a href="#countdown">Launch</a>
        </nav>
        <a className="pill" href="#countdown">
          Coming Soon
        </a>
      </header>

      <main className="container">
        <section className="hero" id="top">
          <div className="heroText">
            <div className="badge">Anime OTT Platform</div>
            <h1 className="title">
              <span className="titleGlow">Hiotaku</span>
              <span className="titleSub">Streaming, but premium neon.</span>
            </h1>
            <p className="subtitle">
              Curated anime drops, clean UI, and a vibe-first experience. We’re building an OTT platform for people who want
              the best discovery + the smoothest watch flow.
            </p>

            <div className="ctaRow">
              <a className="ctaPrimary" href="#countdown">
                Get notified
              </a>
              <a className="ctaGhost" href="#preview">
                See preview
              </a>
            </div>

            <div className="stats">
              <div className="statCard">
                <div className="statNum">4K</div>
                <div className="statLabel">Quality-ready</div>
              </div>
              <div className="statCard">
                <div className="statNum">Ultra</div>
                <div className="statLabel">Low-latency player</div>
              </div>
              <div className="statCard">
                <div className="statNum">Neon</div>
                <div className="statLabel">UI aesthetic</div>
              </div>
            </div>
          </div>

          <div className="heroVisual" id="preview">
            <div className="glass">
              <div className="glassTop">
                <div className="signal">
                  <span /> <span /> <span />
                </div>
                <div className="glassTitle">Hiotaku Preview</div>
              </div>
              <div className="glassBody">
                <div className="chip">New • Neon</div>
                <div className="chips">
                  <span className="chipAlt">Watchlist</span>
                  <span className="chipAlt">Dub/Sub</span>
                  <span className="chipAlt">Downloads</span>
                </div>
                <div className="bars">
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                </div>
                <div className="hint">3D neon models running in background.</div>
              </div>
            </div>

            <div className="canvasWrap" aria-hidden="true">
              <Scene />
            </div>
          </div>
        </section>

        <section className="featureSection" id="features">
          <h2 className="h2">Designed for binge. Built for vibe.</h2>
          <div className="grid">
            <article className="feature">
              <h3>Neon-first UI</h3>
              <p>Premium dark mode with glow accents, glass cards, and smooth transitions.</p>
            </article>
            <article className="feature">
              <h3>Smart discovery</h3>
              <p>Fast search, quick filters, and clean categories to find the next obsession.</p>
            </article>
            <article className="feature">
              <h3>Player built right</h3>
              <p>Low-latency playback, subtitle controls, and session sync across devices.</p>
            </article>
          </div>
        </section>

        <section className="countdownSection" id="countdown">
          <div className="countdownCard">
            <div className="countdownHeader">
              <div>
                <div className="kicker">Launch countdown</div>
                <h2 className="h2">Releasing 17 Feb • 12:00 IST</h2>
              </div>
              <div className="timezone">Timezone: Asia/Kolkata (IST)</div>
            </div>
            <Countdown />
            <div className="finePrint">If the date has passed, it automatically rolls to next year.</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerInner">
          <span>© {new Date().getFullYear()} Hiotaku</span>
          <span className="sep">•</span>
          <span>Coming soon</span>
        </div>
      </footer>
    </div>
  )
}

export default App
