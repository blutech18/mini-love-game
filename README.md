# Mini Love Game

## Project info

Mini Love Game is a small web game built with React and Vite. Use it to explore simple game mechanics around choices, affection, and outcomes.

## How can I run and edit this code?

There are several ways of working on this application locally.

**Use your preferred IDE**

Clone this repository and work in your favorite editor.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to get started:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/blutech18/mini-love-game.git

# Step 2: Navigate to the project directory.
cd mini-love-game

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

You can also edit files directly in GitHub or use GitHub Codespaces if you prefer a cloud-based development environment.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this Vite/React app to any static hosting provider (for example Netlify, Vercel, GitHub Pages, or your own infrastructure).

At a high level:

1. Run `npm run build` to create a production build in the `dist` directory.
2. Configure your hosting provider to serve the contents of `dist`.
3. Make sure client-side routing for `react-router-dom` is configured to fallback to `index.html`.
