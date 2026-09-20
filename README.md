# Dream Components — Custom PC Builder

Dream Components is an interactive custom gaming PC builder made with React and Vite. It helps users explore PC parts, create a build, review compatibility warnings, estimate gaming performance, and simulate the process of reserving a custom computer.

The project is designed to make PC building easier to understand for beginners while still giving experienced users a fast way to compare parts and experiment with different configurations.

## Preview


> ![Dream Components landing page](https://i.imgur.com/NgV51ud.png)



## What this project does

Dream Components presents the entire PC-building experience in one responsive interface:

- Browse a catalog of CPUs, GPUs, motherboards, RAM, storage, power supplies, cases, and coolers.
- Search parts by name, manufacturer, category, or tags such as `4K`, `DDR5`, `ray tracing`, and `value`.
- Filter the catalog by component category and company.
- Add one part from each category to create a custom build.
- Load ready-made presets for different goals: My PC, Balanced, Creator, and Value.
- See the current build's estimated price, power load, and compatibility score.
- Check common compatibility concerns, including CPU socket, memory type, case GPU clearance, PSU capacity, and cooler capacity.
- Select a game and graphics setting to view an estimated average FPS, 1% low FPS, and ray-tracing FPS.
- Enter an order name and move through a simulated custom-build order timeline.


> ![Parts catalog and PC build summary](https://i.imgur.com/hVv03gl.png)

## Main features

### Build presets

Presets let users start quickly without selecting every component manually:

| Preset | Intended use |
| --- | --- |
| My PC | A high-performance build based on the project's featured configuration |
| Balanced | A strong all-around gaming system |
| Creator | A higher-memory build for editing, streaming, and demanding workloads |
| Value | A more affordable build for efficient 1080p gaming |

### Parts catalog

The catalog uses local JavaScript data, so the application works without a backend or external product API. Each part includes information such as:

- Category and company
- Price
- Performance score
- Estimated power draw
- Compatibility metadata
- Search tags
- A short description

### Compatibility checker

The compatibility score starts at 100 and is reduced when the selected parts have a potential issue. The checker currently looks at:

1. CPU and motherboard socket matching
2. RAM type and motherboard memory support
3. GPU length and case clearance
4. Estimated system load and PSU capacity
5. CPU power requirements and cooler capacity

The result is presented as an easy-to-read status: `Excellent fit`, `Check these details`, or `Needs changes`.

> The compatibility and performance results are educational estimates based on the sample data in the project. They should not replace manufacturer specifications or a full hardware compatibility check before purchasing parts.

### Game performance preview

Users can choose from the games included in the local data set and compare settings such as 1080p, 1440p, and 4K performance. The app calculates an estimated result using the selected CPU, GPU, RAM capacity, game load, and graphics-setting multiplier.


> ![Estimated game performance checker](https://i.imgur.com/jlHldHv.png)

### Simulated order tracking

The order section demonstrates how a future PC-building service could guide a customer through the fulfillment process:

`Parts reserved` → `Assembly` → `Benchmark test` → `Ready to ship`

This is currently a front-end demo. It does not submit an order, process payment, contact a customer, or connect to an inventory system.

## Tech stack

- [React](https://react.dev/) — UI components and application state
- [Vite](https://vite.dev/) — development server and production build tooling
- JavaScript — application logic and local component data
- CSS — responsive layout, animations, dark theme, and visual styling
- ESLint — code quality checks

## Getting started

### Requirements

Make sure you have the following installed:

- Node.js 18 or newer
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/dream-pc-builder.git
   cd dream-pc-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in your terminal. Vite usually serves the app at `http://localhost:5173`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Checks the project with ESLint |

## Project structure

```text
dream-pc-builder/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── hero.png
│   ├── data/
│   │   ├── categories.js
│   │   ├── games.js
│   │   ├── parts.js
│   │   ├── presets.js
│   │   └── settingMulipliers.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Where to customize the app

- `src/data/parts.js` — add or edit component data.
- `src/data/games.js` — add games and their load factors.
- `src/data/presets.js` — create or update build presets.
- `src/data/categories.js` — change the component categories shown in the builder.
- `src/data/settingMulipliers.js` — adjust the performance multiplier for each graphics setting.
- `src/App.jsx` — update the application behavior and page sections.
- `src/App.css` and `src/index.css` — change the layout, colors, typography, and animations.

## Adding your screenshots

Create this folder in the repository:

```text
docs/images/
```

Then add screenshots with these suggested names:

```text
docs/images/hero.png
docs/images/builder.png
docs/images/performance.png
```

The suggested filenames make it easy to replace the black placeholders above. You can also add more images for mobile layouts, preset comparisons, or the order tracker.

## Current limitations

- Parts and pricing are sample data stored locally in JavaScript.
- Prices are illustrative and are not live market prices.
- FPS values are estimates from a simple calculation, not benchmark results.
- Compatibility checks cover the rules implemented in the demo, not every real-world hardware constraint.
- The order flow is visual only and has no backend, authentication, payment, shipping, or notification system.
- There are no user accounts or saved builds yet.

## Possible future improvements

- Connect to a live parts and pricing API.
- Add persistent saved builds using a database or browser storage.
- Add product images, detailed specifications, and links to retailers.
- Add more compatibility rules, including BIOS support, motherboard form factor, cooler mounting, and storage interfaces.
- Add user accounts and shareable build URLs.
- Add real benchmark data and GPU/CPU comparison charts.
- Add checkout, inventory, shipping, and order-management functionality.
- Add automated component recommendations based on budget and target resolution.

## Contributing

Contributions and suggestions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-improvement
   ```

3. Make your changes and run the checks:

   ```bash
   npm run lint
   npm run build
   ```

4. Commit your work and open a pull request with a clear description of the change.

## License

No license has been selected for this project yet. If you plan to make the repository open source, add a license file such as MIT before publishing it publicly.

## Author

Created by **YOUR NAME**.

Replace the author name and repository URL above with your own information before publishing the project on GitHub.
