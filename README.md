# Webflow Designer Extension + React + TypeScript + Vite + TailwindCSS Starter

This template provides a minimal setup to get started building Webflow Designer Extensions using TypeScript, Vite, React, and TailwindCSS. It combines the power of modern web development tools with Webflow's Designer Extension capabilities.

<img width="873" alt="Screenshot 2025-04-30 at 3 16 44 PM" src="https://github.com/user-attachments/assets/3c166681-1309-4674-9226-e625f279e9af" />

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- 🔷 [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- 🎨 [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🔌 [Webflow Designer Extension](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) - Build powerful tools directly in the Webflow Designer
- 🔥 [Hot Reloading](https://www.npmjs.com/package/@xatom/wf-app-hot-reload) - Seamless hot reloading for Webflow applications during development

## Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- npm or yarn
- A Webflow account with Designer Extension development access

## Getting Started

1. Clone this repository:
```bash
git clone [repository-url]
cd wf-ext-vite-react-tailwind-starter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```
This will generate a `bundle.zip` file that you can upload to Webflow.

## Important Documentation

- [Getting Started with Designer Extensions](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) - Learn how to set up and create your first Designer Extension
- [Design Guidelines](https://developers.webflow.com/designer/docs/design-guidelines) - Best practices for designing Webflow Apps
- [Publishing your Designer Extension](https://developers.webflow.com/designer/docs/publishing-your-app) - Guide to publishing your extension

## Project Structure

```
├── src/               # Source files
├── public/           # Static assets
├── webflow.config.js # Webflow extension configuration
├── vite.config.ts    # Vite configuration
└── tailwind.config.js # TailwindCSS configuration
```

## Development Notes

- Utilizes Vite (can utilize Vite's plugin ecosystem)
- Hot Reloading provided by [@Xatom's wf-app-hot-reload package](https://www.npmjs.com/package/@xatom/wf-app-hot-reload)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
