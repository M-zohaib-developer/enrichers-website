import React from 'react'

const MARKETS: { label: string; state: string; tone: 'blue' | 'green' }[] = [
  { label: 'PMEX', state: 'Active', tone: 'green' },
  { label: 'PSX', state: 'Live', tone: 'green' },
  { label: 'Commodities', state: 'Open', tone: 'blue' },
]

const DESKS: { title: string; value: string }[] = [
  { title: 'PSX / PMEX', value: 'Active Desk' },
  { title: 'Musharakah PE', value: 'Shariah-Aligned' },
  { title: 'Corporate Desk', value: 'Dedicated RM' },
]

const LoginAside: React.FC = () => {
  return (
    <aside aria-hidden="true" className="login-aside">
      <div className="login-aside__scrim" />

      <div className="login-aside__hud">
        <div className="login-aside__markets">
          {MARKETS.map((m) => (
            <span className="login-aside__market" key={m.label}>
              <i className={`login-aside__dot login-aside__dot--${m.tone}`} />
              {m.label}
              <b>{m.state}</b>
            </span>
          ))}
        </div>
        <span className="login-aside__badge">SECP Regulated Brokerage</span>
      </div>

      <div className="login-aside__card">
        <div className="login-aside__cardHead">
          <div>
            <span className="login-aside__chip">EIG Financial Ecosystem</span>
            <p className="login-aside__cardBrand">
              Enrichers Investment Group — Converting To Real-Wealth
            </p>
          </div>
          <span className="login-aside__cardIcon">
            <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
              <path
                d="M3 17l6-6 4 4 8-8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
              <path
                d="M16 7h5v5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </span>
        </div>

        <h2 className="login-aside__cardTitle">Pakistan&rsquo;s Premier Licensed Consortium</h2>
        <p className="login-aside__cardText">
          Direct trading and institutional advisory across PMEX, PSX, global commodities and
          Shariah-compliant Musharakah instruments.
        </p>

        <div className="login-aside__stat">
          <span className="login-aside__statNum">2011</span>
          <span className="login-aside__chip">Established</span>
          <span className="login-aside__trend">24/5 Advisory</span>
        </div>

        <div className="login-aside__axis">
          <span>PMEX Commodities</span>
          <span className="login-aside__axisMid">SECP Licensed</span>
          <span>Equity &amp; Forex</span>
        </div>

        <svg
          className="login-aside__spark"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 340 60"
        >
          <defs>
            <linearGradient id="eigSpark" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M0 45C30 40 50 48 80 32C110 16 140 38 170 24C200 10 230 28 260 14C290 2 310 10 340 4L340 60L0 60Z"
            fill="url(#eigSpark)"
          />
          <path
            d="M0 45C30 40 50 48 80 32C110 16 140 38 170 24C200 10 230 28 260 14C290 2 310 10 340 4"
            stroke="#38bdf8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </svg>

        <div className="login-aside__desks">
          {DESKS.map((d) => (
            <div className="login-aside__desk" key={d.title}>
              <span className="login-aside__deskTitle">{d.title}</span>
              <span className="login-aside__deskValue">{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <figure className="login-aside__quote">
        <blockquote className="login-aside__slogan">Converting To Real-Wealth</blockquote>
        <figcaption className="login-aside__brand">Enrichers Investment Group</figcaption>
      </figure>
    </aside>
  )
}

export default LoginAside
