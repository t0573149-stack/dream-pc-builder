import { useMemo, useState } from 'react'
import './App.css'

const categories = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooler']

const parts = [
  {
    id: 'cpu-7800x3d',
    category: 'CPU',
    name: 'Ryzen 7 7800X3D',
    company: 'AMD',
    price: 369,
    socket: 'AM5',
    power: 120,
    score: 96,
    tags: ['gaming', 'cool', 'x3d'],
    note: 'Elite gaming chip with low heat for quiet builds.',
  },
  {
    id: 'cpu-14700k',
    category: 'CPU',
    name: 'Core i7-14700K',
    company: 'Intel',
    price: 389,
    socket: 'LGA1700',
    power: 190,
    score: 92,
    tags: ['streaming', 'creator', 'hybrid'],
    note: 'Fast multitasking CPU for gaming and editing.',
  },
  {
    id: 'cpu-7600',
    category: 'CPU',
    name: 'Ryzen 5 7600',
    company: 'AMD',
    price: 189,
    socket: 'AM5',
    power: 88,
    score: 78,
    tags: ['value', 'efficient'],
    note: 'Smart value pick with a modern upgrade path.',
  },
  {
    id: 'cpu-7900x',
    category: 'CPU',
    name: 'Ryzen 9 7900X 12-Core',
    company: 'AMD',
    price: 339,
    socket: 'AM5',
    power: 170,
    score: 93,
    tags: ['my pc', '12 core', 'creator', 'gaming'],
    note: 'Your 12-core CPU, strong for gaming, streaming, and work.',
  },
  {
    id: 'cpu-7950x3d',
    category: 'CPU',
    name: 'Ryzen 9 7950X3D',
    company: 'AMD',
    price: 579,
    socket: 'AM5',
    power: 160,
    score: 99,
    tags: ['x3d', 'creator', 'flagship'],
    note: 'Top AMD chip for mixed high-end gaming and creation.',
  },
  {
    id: 'cpu-14900k',
    category: 'CPU',
    name: 'Core i9-14900K',
    company: 'Intel',
    price: 529,
    socket: 'LGA1700',
    power: 253,
    score: 97,
    tags: ['flagship', 'streaming', 'creator'],
    note: 'Very fast Intel flagship with high power needs.',
  },
  {
    id: 'gpu-4090',
    category: 'GPU',
    name: 'GeForce RTX 4090',
    company: 'NVIDIA',
    price: 1799,
    length: 336,
    power: 450,
    score: 100,
    tags: ['4k', 'ray tracing', 'creator'],
    note: 'Monster GPU for max settings and heavy rendering.',
  },
  {
    id: 'gpu-4080s',
    category: 'GPU',
    name: 'GeForce RTX 4080 Super',
    company: 'NVIDIA',
    price: 999,
    length: 310,
    power: 320,
    score: 91,
    tags: ['4k', 'ray tracing'],
    note: 'High-end 4K performance without the flagship price.',
  },
  {
    id: 'gpu-4070tis',
    category: 'GPU',
    name: 'GeForce RTX 4070 Ti SUPER',
    company: 'NVIDIA',
    price: 799,
    length: 305,
    power: 285,
    score: 84,
    tags: ['my pc', '1440p', 'ray tracing', '16gb'],
    note: 'Your GPU, excellent for 1440p ultra and strong ray tracing.',
  },
  {
    id: 'gpu-4070s',
    category: 'GPU',
    name: 'GeForce RTX 4070 SUPER',
    company: 'NVIDIA',
    price: 599,
    length: 244,
    power: 220,
    score: 77,
    tags: ['1440p', 'efficient'],
    note: 'Efficient card for high-refresh 1440p builds.',
  },
  {
    id: 'gpu-7900xtx',
    category: 'GPU',
    name: 'Radeon RX 7900 XTX',
    company: 'AMD',
    price: 899,
    length: 287,
    power: 355,
    score: 89,
    tags: ['4k', 'raster', '24gb'],
    note: 'Excellent raw FPS and generous memory.',
  },
  {
    id: 'gpu-4060ti',
    category: 'GPU',
    name: 'GeForce RTX 4060 Ti',
    company: 'NVIDIA',
    price: 379,
    length: 244,
    power: 165,
    score: 63,
    tags: ['1080p', 'efficient'],
    note: 'Compact card for cool, quiet 1080p gaming.',
  },
  {
    id: 'mb-b650',
    category: 'Motherboard',
    name: 'Aorus B650 Elite AX',
    company: 'Gigabyte',
    price: 209,
    socket: 'AM5',
    ramType: 'DDR5',
    form: 'ATX',
    power: 35,
    score: 84,
    tags: ['wifi', 'pcie 5'],
    note: 'Balanced AM5 board with Wi-Fi and strong VRMs.',
  },
  {
    id: 'mb-x670',
    category: 'Motherboard',
    name: 'TUF Gaming X670E-Plus WiFi',
    company: 'ASUS',
    price: 279,
    socket: 'AM5',
    ramType: 'DDR5',
    form: 'ATX',
    power: 42,
    score: 90,
    tags: ['my pc compatible', 'wifi', 'pcie 5', 'premium'],
    note: 'Strong AM5 board that pairs well with Ryzen 9 CPUs.',
  },
  {
    id: 'mb-b650m',
    category: 'Motherboard',
    name: 'PRO B650M-A WiFi',
    company: 'MSI',
    price: 159,
    socket: 'AM5',
    ramType: 'DDR5',
    form: 'Micro ATX',
    power: 30,
    score: 78,
    tags: ['wifi', 'compact', 'value'],
    note: 'Affordable AM5 board for smaller builds.',
  },
  {
    id: 'mb-z790',
    category: 'Motherboard',
    name: 'ROG Strix Z790-F',
    company: 'ASUS',
    price: 349,
    socket: 'LGA1700',
    ramType: 'DDR5',
    form: 'ATX',
    power: 45,
    score: 88,
    tags: ['wifi', 'overclock'],
    note: 'Premium Intel board for high-power CPUs.',
  },
  {
    id: 'ram-32-ddr5',
    category: 'RAM',
    name: 'Trident Z5 32GB DDR5-6000',
    company: 'G.Skill',
    price: 118,
    ramType: 'DDR5',
    capacity: 32,
    power: 12,
    score: 86,
    tags: ['rgb', 'fast'],
    note: 'Sweet spot memory for modern gaming builds.',
  },
  {
    id: 'ram-32-ddr5-mine',
    category: 'RAM',
    name: '32GB DDR5 Memory',
    company: 'Kingston',
    price: 99,
    ramType: 'DDR5',
    capacity: 32,
    power: 12,
    score: 82,
    tags: ['my pc', '32gb', 'ddr5'],
    note: 'Matches your 32.0 GB memory from the screenshot.',
  },
  {
    id: 'ram-16-ddr5',
    category: 'RAM',
    name: 'Vengeance 16GB DDR5-5600',
    company: 'Corsair',
    price: 59,
    ramType: 'DDR5',
    capacity: 16,
    power: 8,
    score: 68,
    tags: ['budget', 'ddr5'],
    note: 'Basic modern memory for starter gaming PCs.',
  },
  {
    id: 'ram-64-ddr5',
    category: 'RAM',
    name: 'Vengeance 64GB DDR5-5600',
    company: 'Corsair',
    price: 189,
    ramType: 'DDR5',
    capacity: 64,
    power: 16,
    score: 90,
    tags: ['creator', 'heavy apps'],
    note: 'Plenty of memory for editing, streaming, and mods.',
  },
  {
    id: 'ssd-2tb',
    category: 'Storage',
    name: '990 Pro 2TB NVMe',
    company: 'Samsung',
    price: 169,
    capacity: 2000,
    power: 9,
    score: 94,
    tags: ['fast', '2tb'],
    note: 'Very fast load times and room for a large library.',
  },
  {
    id: 'ssd-18tb-mine',
    category: 'Storage',
    name: 'SSD 1.8TB',
    company: 'Samsung',
    price: 139,
    capacity: 1800,
    power: 8,
    score: 88,
    tags: ['my pc', 'ssd', '1.8tb'],
    note: 'Matches your 1.8 TB SSD storage.',
  },
  {
    id: 'ssd-1tb',
    category: 'Storage',
    name: 'Crucial P3 Plus 1TB NVMe',
    company: 'Crucial',
    price: 69,
    capacity: 1000,
    power: 6,
    score: 74,
    tags: ['budget', '1tb'],
    note: 'Good entry storage for a clean budget build.',
  },
  {
    id: 'ssd-4tb',
    category: 'Storage',
    name: 'SN850X 4TB NVMe',
    company: 'WD Black',
    price: 299,
    capacity: 4000,
    power: 11,
    score: 96,
    tags: ['4tb', 'premium'],
    note: 'Big, fast storage for massive game installs.',
  },
  {
    id: 'psu-750',
    category: 'PSU',
    name: 'RM750e Gold',
    company: 'Corsair',
    price: 99,
    watts: 750,
    power: 0,
    score: 80,
    tags: ['gold', 'quiet'],
    note: 'Reliable supply for efficient midrange systems.',
  },
  {
    id: 'psu-850',
    category: 'PSU',
    name: 'RM850x Gold',
    company: 'Corsair',
    price: 139,
    watts: 850,
    power: 0,
    score: 88,
    tags: ['my pc compatible', 'gold', 'modular'],
    note: 'Comfortable power choice for Ryzen 9 and RTX 4070 Ti SUPER.',
  },
  {
    id: 'psu-1000',
    category: 'PSU',
    name: 'Prime GX-1000 Gold',
    company: 'Seasonic',
    price: 199,
    watts: 1000,
    power: 0,
    score: 93,
    tags: ['gold', 'modular'],
    note: 'Premium power headroom for high-end GPUs.',
  },
  {
    id: 'case-flow',
    category: 'Case',
    name: 'H7 Flow',
    company: 'NZXT',
    price: 129,
    gpuClearance: 400,
    form: 'ATX',
    power: 0,
    score: 86,
    tags: ['airflow', 'clean'],
    note: 'Airy mid tower with clean cable space.',
  },
  {
    id: 'case-4000d',
    category: 'Case',
    name: '4000D Airflow',
    company: 'Corsair',
    price: 104,
    gpuClearance: 360,
    form: 'ATX',
    power: 0,
    score: 84,
    tags: ['my pc compatible', 'airflow', 'popular'],
    note: 'Clean airflow case with room for your RTX 4070 Ti SUPER.',
  },
  {
    id: 'case-compact',
    category: 'Case',
    name: 'Meshify 2 Compact',
    company: 'Fractal',
    price: 139,
    gpuClearance: 341,
    form: 'ATX',
    power: 0,
    score: 83,
    tags: ['compact', 'mesh'],
    note: 'Smaller footprint with strong airflow.',
  },
  {
    id: 'cooler-aio',
    category: 'Cooler',
    name: 'Kraken 240 RGB',
    company: 'NZXT',
    price: 159,
    cooling: 220,
    power: 8,
    score: 88,
    tags: ['aio', 'rgb'],
    note: 'Clean liquid cooling for hot chips.',
  },
  {
    id: 'cooler-360',
    category: 'Cooler',
    name: 'Liquid Freezer III 360',
    company: 'Arctic',
    price: 119,
    cooling: 280,
    power: 9,
    score: 92,
    tags: ['my pc compatible', 'aio', 'quiet'],
    note: 'Strong cooling headroom for Ryzen 9 processors.',
  },
  {
    id: 'cooler-air',
    category: 'Cooler',
    name: 'Peerless Assassin 120',
    company: 'Thermalright',
    price: 42,
    cooling: 180,
    power: 3,
    score: 82,
    tags: ['air', 'value'],
    note: 'Excellent value air cooler.',
  },
]

const games = [
  { name: 'Cyberpunk 2077', load: 1.12 },
  { name: 'Fortnite', load: 0.82 },
  { name: 'Call of Duty', load: 0.96 },
  { name: 'Minecraft RTX', load: 0.76 },
  { name: 'Starfield', load: 1.04 },
]

const presets = {
  mypc: ['cpu-7900x', 'gpu-4070tis', 'mb-x670', 'ram-32-ddr5-mine', 'ssd-18tb-mine', 'psu-850', 'case-4000d', 'cooler-360'],
  balanced: ['cpu-7800x3d', 'gpu-4080s', 'mb-b650', 'ram-32-ddr5', 'ssd-2tb', 'psu-1000', 'case-flow', 'cooler-air'],
  creator: ['cpu-14700k', 'gpu-4090', 'mb-z790', 'ram-64-ddr5', 'ssd-4tb', 'psu-1000', 'case-flow', 'cooler-aio'],
  value: ['cpu-7600', 'gpu-4060ti', 'mb-b650', 'ram-32-ddr5', 'ssd-2tb', 'psu-750', 'case-compact', 'cooler-air'],
}

const settingMultipliers = {
  '1080p High': 1.35,
  '1440p Ultra': 1,
  '4K Ultra': 0.58,
}

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
