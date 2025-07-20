# ChatGPT Canvas

A ChatGPT Canvas-like interface built with Next.js, React, and Tailwind CSS.

## Features

- Split-screen interface with chat on the left and canvas on the right
- Real-time message exchange
- Editable canvas area for documents/code
- Responsive design
- Modern UI with smooth animations

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## Usage

1. Type a message in the chat input
2. Send the message to trigger the canvas to appear
3. Edit content directly in the canvas area
4. Use the toolbar buttons for additional actions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **JavaScript** - Modern ES6+ syntax
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Project Structure

```
apps/chatgpt-canvas/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.js       # Root layout
│   └── page.js         # Home page
├── components/         # React components
│   └── ChatInterface.js
├── package.json
├── tailwind.config.js
└── jsconfig.json
```

## Customization

- Modify the UI colors in `tailwind.config.js`
- Add new features in `components/ChatInterface.js`
- Customize the canvas content format
- Add API integration for real AI responses