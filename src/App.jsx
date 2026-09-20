import { useMemo, useState } from 'react'
import './App.css'
import {games} from "./data/games.js";
import {parts} from "./data/parts.js";
import {categories} from "./data/categories.js";
import {presets} from "./data/presets.js";
import {settingMultipliers} from "./data/settingMulipliers.js";


function App() {
  const [selected, setSelected] = useState(() => buildPreset('mypc'))
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [company, setCompany] = useState('All')
  const [game, setGame] = useState(games[0].name)
  const [settings, setSettings] = useState('1440p Ultra')
  const [orderName, setOrderName] = useState('')
  const [orderStage, setOrderStage] = useState(1)

  const companies = useMemo(() => ['All', ...new Set(parts.map((part) => part.company))], [])
  const selectedParts = categories.map((item) => selected[item]).filter(Boolean)
  const total = selectedParts.reduce((sum, part) => sum + part.price, 0)
  const wattage = selectedParts.reduce((sum, part) => sum + part.power, 0)
  const compatibility = getCompatibility(selected)
  const performance = getPerformance(selected, game, settings)

  const filteredParts = parts.filter((part) => {
    const searchText = `${part.name} ${part.company} ${part.category} ${part.tags.join(' ')}`.toLowerCase()
    return (
      (category === 'All' || part.category === category) &&
      (company === 'All' || part.company === company) &&
      searchText.includes(query.toLowerCase())
    )
  })

  function choosePart(part) {
    setSelected((current) => ({ ...current, [part.category]: part }))
  }

  function loadPreset(name) {
    setSelected(buildPreset(name))
    setOrderStage(1)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#builder" aria-label="Dream Components home">
          <span className="brand-mark">DC</span>
          <span>Dream Components</span>
        </a>
        <nav aria-label="Main sections">
          <a href="#builder">Builder</a>
          <a href="#performance">Games</a>
          <a href="#order">Order</a>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Custom gaming PCs</p>
          <h1>Build the dream PC before you buy it.</h1>
          <p>
            Search components, check if they fit together, preview game performance, pick favorite
            companies, and place a custom order for the exact machine you want.
          </p>
          <div className="hero-actions" aria-label="Build presets">
            <button type="button" onClick={() => loadPreset('mypc')}>My PC</button>
            <button type="button" onClick={() => loadPreset('balanced')}>Balanced</button>
            <button type="button" onClick={() => loadPreset('creator')}>Creator</button>
            <button type="button" onClick={() => loadPreset('value')}>Value</button>
          </div>
        </div>
        <div className="rig-preview" aria-label="Current build preview">
          <div className="case-frame">
            <span className="fan fan-one"></span>
            <span className="fan fan-two"></span>
            <span className="gpu-bar"></span>
            <span className="ram-stick"></span>
            <span className="cooler-ring"></span>
          </div>
          <div className="preview-stats">
            <span>{compatibility.score}% fit</span>
            <span>${total.toLocaleString()}</span>
            <span>{performance.average} FPS</span>
          </div>
        </div>
      </section>

      <section id="builder" className="builder-grid">
        <aside className="panel summary-panel">
          <div className="section-heading">
            <p className="eyebrow">Selected build</p>
            <h2>Your PC</h2>
          </div>

          <div className="totals">
            <div>
              <span>Total</span>
              <strong>${total.toLocaleString()}</strong>
            </div>
            <div>
              <span>Load</span>
              <strong>{wattage}W</strong>
            </div>
            <div>
              <span>Fit</span>
              <strong>{compatibility.score}%</strong>
            </div>
          </div>

          <div className="chosen-list">
            {categories.map((item) => (
              <div className="chosen-row" key={item}>
                <span>{item}</span>
                <strong>{selected[item]?.name ?? 'Choose part'}</strong>
              </div>
            ))}
          </div>

          <div className={`compatibility ${compatibility.level}`}>
            <strong>{compatibility.title}</strong>
            {compatibility.messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        </aside>

        <section className="panel catalog-panel">
          <div className="section-heading">
            <p className="eyebrow">Search components</p>
            <h2>Parts catalog</h2>
          </div>

          <div className="filters">
            <label>
              <span>Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="GPU, AMD, 4K, DDR5..."
              />
            </label>
            <label>
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>All</option>
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Company</span>
              <select value={company} onChange={(event) => setCompany(event.target.value)}>
                {companies.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="part-grid">
            {filteredParts.map((part) => (
              <article className="part-card" key={part.id}>
                <div>
                  <p>{part.category} - {part.company}</p>
                  <h3>{part.name}</h3>
                  <span>{part.note}</span>
                </div>
                <div className="part-meta">
                  <strong>${part.price}</strong>
                  <span>{part.score}/100</span>
                </div>
                <button type="button" onClick={() => choosePart(part)}>
                  {selected[part.category]?.id === part.id ? 'Selected' : 'Add to build'}
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section id="performance" className="performance-section">
        <div className="panel performance-controls">
          <div className="section-heading">
            <p className="eyebrow">Game preview</p>
            <h2>Performance checker</h2>
          </div>
          <div className="filters">
            <label>
              <span>Game</span>
              <select value={game} onChange={(event) => setGame(event.target.value)}>
                {games.map((item) => <option key={item.name}>{item.name}</option>)}
              </select>
            </label>
            <label>
              <span>Settings</span>
              <select value={settings} onChange={(event) => setSettings(event.target.value)}>
                {Object.keys(settingMultipliers).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="panel fps-panel">
          <div className="fps-number">{performance.average}</div>
          <div>
            <h2>Estimated FPS</h2>
            <p>{performance.verdict}</p>
          </div>
          <div className="bars">
            {performance.rows.map((row) => (
              <div className="bar-row" key={row.label}>
                <span>{row.label}</span>
                <div><span style={{ width: `${Math.min(row.value, 180) / 1.8}%` }}></span></div>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="order-section">
        <div className="section-heading">
          <p className="eyebrow">Dream order</p>
          <h2>Reserve your custom PC</h2>
        </div>
        <div className="order-layout">
          <div className="panel order-form">
            <label>
              <span>Name for the order</span>
              <input
                value={orderName}
                onChange={(event) => setOrderName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <button type="button" onClick={() => setOrderStage((stage) => Math.min(stage + 1, 4))}>
              Place dream order
            </button>
            <p>
              {orderName || 'Your build'} is quoted at ${total.toLocaleString()} before shipping.
              We assemble, test, benchmark, and send updates while you wait.
            </p>
          </div>
          <div className="panel order-track">
            {['Parts reserved', 'Assembly', 'Benchmark test', 'Ready to ship'].map((step, index) => (
              <div className={index < orderStage ? 'active step' : 'step'} key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function buildPreset(name) {
  return presets[name].reduce((build, partId) => {
    const part = parts.find((item) => item.id === partId)
    return { ...build, [part.category]: part }
  }, {})
}

function getCompatibility(selected) {
  const messages = []
  let score = 100
  const cpu = selected.CPU
  const board = selected.Motherboard
  const ram = selected.RAM
  const gpu = selected.GPU
  const psu = selected.PSU
  const pcCase = selected.Case
  const cooler = selected.Cooler
  const wattage = Object.values(selected).reduce((sum, part) => sum + (part?.power ?? 0), 0)

  if (cpu && board && cpu.socket !== board.socket) {
    score -= 36
    messages.push(`${cpu.name} needs ${cpu.socket}, but the board is ${board.socket}.`)
  }

  if (ram && board && ram.ramType !== board.ramType) {
    score -= 26
    messages.push(`${ram.name} is ${ram.ramType}, but this board wants ${board.ramType}.`)
  }

  if (gpu && pcCase && gpu.length > pcCase.gpuClearance) {
    score -= 22
    messages.push(`${gpu.name} is too long for ${pcCase.name}.`)
  }

  if (psu && wattage > psu.watts * 0.78) {
    score -= 20
    messages.push(`${psu.name} is tight for a ${wattage}W estimated load.`)
  }

  if (cpu && cooler && cpu.power > cooler.cooling) {
    score -= 14
    messages.push(`${cooler.name} may run hot with ${cpu.name}.`)
  }

  if (messages.length === 0) {
    messages.push('Sockets, memory, case clearance, cooling, and power all look good.')
  }

  const clamped = Math.max(8, score)
  return {
    score: clamped,
    level: clamped > 84 ? 'great' : clamped > 64 ? 'watch' : 'bad',
    title: clamped > 84 ? 'Excellent fit' : clamped > 64 ? 'Check these details' : 'Needs changes',
    messages,
  }
}

function getPerformance(selected, gameName, settingsName) {
  const cpu = selected.CPU?.score ?? 45
  const gpu = selected.GPU?.score ?? 45
  const ram = selected.RAM?.capacity >= 32 ? 1 : 0.9
  const selectedGame = games.find((item) => item.name === gameName)
  const raw = ((gpu * 1.45 + cpu * 0.55) * ram * settingMultipliers[settingsName]) / selectedGame.load
  const average = Math.round(raw)
  const rows = [
    { label: 'Average', value: average },
    { label: '1% low', value: Math.round(average * 0.72) },
    { label: 'Ray tracing', value: Math.round(average * 0.58) },
  ]

  return {
    average,
    rows,
    verdict:
      average >= 120
        ? 'Smooth high-refresh gameplay with room for streaming.'
        : average >= 75
          ? 'Comfortable gaming performance for this setting.'
          : 'Playable, but lower settings or a stronger GPU would help.',
  }
}

export default App
