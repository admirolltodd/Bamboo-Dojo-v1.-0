# Bamboo Dojo

Bamboo Dojo is a fast-paced, WarioWare-style microgame trainer themed around working the line at a sushi restaurant. You're thrown through a rapid sequence of quick-reflex minigames — dodge the coworker, spot the sharp object, name that roll, and more — each lasting only a few seconds, with score, combo, and lives tracked as you go. Survive as many rounds as you can, climb the rank ladder, and land on the leaderboard.

When you're not dodging chef's knives, the "Bamboo Oracle" — a Gemini-powered chatbot with zero patience for foolish questions — is on hand to answer sushi and kitchen trivia.

## Features

- **Rapid-fire microgames**, including dodge-the-coworker, spot-the-sharp-object, name-that-roll, memory recall, sauce matching, and more.
- **Score, combo, and lives tracking** — combos increase the points earned per successful round; three missed rounds and it's over.
- **Rank system & local leaderboard** — your final score earns a rank, and top scores are saved between sessions.
- **The Bamboo Oracle** — a Gemini-powered chatbot (with image support) for sushi and kitchen trivia questions, in character as an impatient sushi master.
- **Animated, arcade-style UI** built with Framer Motion.

## Tech Stack

- TypeScript, React 19, Vite 6
- Tailwind CSS
- Framer Motion (`motion`) for animations
- Gemini API (`@google/genai`) for the Bamboo Oracle chatbot

## Requirements

- Node.js
- A **Gemini API key** ([Google AI Studio](https://aistudio.google.com/)) — only required for the Bamboo Oracle chatbot. The microgames, scoring, and leaderboard all work without a key; only asking the Oracle a question needs one.

## How to Run

```bash
npm install
```

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to your Gemini API key (skip this if you don't need the Oracle chatbot).

```bash
npm run dev
```

This starts the Vite dev server, by default at `http://localhost:3000`.

## License

MIT — see [LICENSE](LICENSE).
