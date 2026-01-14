# The Library App

## Task

The task description is available at: [Open task](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view")

---

## How to run the app

### Development mode

1. Clone repository:

```bash
git clone https://github.com/W0x3R/The-Library.git
```

2. Change branch:

```bash
git checkout dev-page
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open the app in the browser:

```bash
http://localhost:3000/The-Library/
```

### Production build

1. Build the optimized version of the app

```bash
npm run build
```

2. The production-ready files will be generated in the `dist` folder.
   The build contains:

- `index.html`
- `main.js`
- `assets/` directory with static assets

### Project structure

```text
assets/             # Static assets (icons, images, favicons)
src/
├── api/            # Functions for working with external APIs (Open Library)
├── constants/      # Application constants (error messages)
├── storage/        # LocalStorage logic (favorites, theme)
├── styles/         # Global styles and normalize.css
├── ui/             # UI logic split by features (search, books, favorites, errors)
├── utils/          # Utility functions (debounce, URL helpers, normalization)
├── initApp.js      # Application initialization logic
└── index.js         # Application entry point
```

### Notes
- The app is built using Vite.
- CSS is bundled and injected via JavaScript to meet the build requirements.
- The app uses the Open Library API to fetch book data.
- Favorites and theme settings stored in `localStorage`
