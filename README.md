# 🚀 Chrome Extension Boilerplate with React + Webpack

This boilerplate simplifies developing Chrome Extensions using **React** and **Webpack**. Perfect for creating modern, modular, and scalable extensions.

## ✨ Features

- ✅ Firefox support (via WebExtension API compatibility)

- ✅ React
- ✅ Webpack bundler
- ✅ Support for `manifest v3`
- ✅ Organized folder structure
- ✅ Content Script & Background Script support
- ✅ Tailwind CSS (optional)
- ✅ ShadCN UI (optional)

---

## 📁 Folder Structure

```
my-extension/
├── public/                         # Static files (icon, manifest.json)
├── src/
│   ├── background/                 # Background service worker
│   ├── content-scripts/            # Content scripts (injected into pages)
│   ├── extension/       
|   |   |── manifest.chrome.json    # manifest for chrome
|   |   |── manifest.firefox.json   # manifest for firefox
│   ├── libs/                       # helper function, variables, and hooks 
│   └── styles/                     # Global styles (optional)
├── webpack.config.js               # Webpack configuration
├── package.json
└── README.md
```

---

## 🌐 Browser Support

This boilerplate is compatible with both **Chrome** and **Firefox** using the WebExtension API.
To load the extension in Firefox:
 ```bash
   pnpm run dev:firefox
   # the browser will automatically launch in Developer Tools mode
   ```


---

## 🚀 Getting Started (Development)

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run the development server**
   ```bash
   pnpm run start
   ```

3. **Load into Chrome**
   - Open `chrome://extensions`
   - Enable **Developer Mode**
   - Click **Load unpacked**
   - Select the `dist/[env]/[browser]/[version]` folder

---

## 🛠️ Build for Production

```bash
pnpm run build
```

The output will be in the `dist/[env]/[browser]/[version]` folder, ready to be zipped and uploaded to the Chrome Web Store.

---

## ⚙️ Scripts

Below is the list of available scripts in this project:

| Script                  | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| `pnpm run dev`          | Runs Webpack in development mode for **Chrome** with watch enabled         |
| `pnpm run build`        | Builds the extension for **Chrome** in production mode                     |
| `pnpm run dev:firefox`  | Builds the extension for **Firefox** in development mode with watch using `web-ext` |
| `pnpm run build:firefox`| Builds the extension for **Firefox** in production mode                    |
| `pnpm run check:firefox`| Launches the extension in Firefox Developer mode using `web-ext run`       |
| `pnpm run tscheck`      | Runs TypeScript type-checking without building                             |

💡 When running `pnpm run dev:firefox`, the Firefox browser will automatically open in Developer Tools mode via `web-ext`, making it easier to debug during development.

---

## 📦 Technologies

- [React](https://reactjs.org)
- [Webpack](https://webpack.js.org)
- [Babel](https://babeljs.io)
- [Chrome Extension Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/)
