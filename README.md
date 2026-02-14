# Password Generator Web App

A modern, visually stunning password generator built with React 19, TypeScript, and Tailwind CSS v4.

## Features

- **Secure Password Generation**: Uses `crypto.getRandomValues()` for cryptographically secure random passwords
- **Configurable Options**: Adjust password length (8-64 characters) and toggle character types
- **Visual Strength Indicator**: Real-time entropy-based password strength visualization
- **One-Click Copy**: Copy passwords to clipboard with visual feedback
- **Password History**: Keep track of the last 5 generated passwords
- **Modern UI**: Dark mode with glassmorphism, neon gradients, and smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The static files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your GitHub repository

3. Enable GitHub Pages in repository settings, pointing to the `dist/` folder

## Tech Stack

- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Vite

## License

MIT
