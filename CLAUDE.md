# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Open Canvas is a monorepo application that combines a Next.js frontend with LangGraph AI agents. It provides an interactive document/code editing interface powered by multiple LLM providers.

## Development Commands

### Monorepo Commands (from root)
```bash
yarn install        # Install all dependencies
yarn build          # Build all packages
yarn lint           # Lint all packages
yarn lint:fix       # Fix linting issues
yarn format         # Format code with Prettier
```

### Running the Application
Start both services for local development:
```bash
# Terminal 1: Start LangGraph agents (port 54367)
cd apps/agents && yarn dev

# Terminal 2: Start Next.js frontend (port 3000)
cd apps/web && yarn dev
```

### Testing
```bash
# Run evaluations
cd apps/web && yarn eval
```

## Architecture

### Monorepo Structure
- `apps/agents/` - LangGraph AI agents handling all LLM interactions
- `apps/web/` - Next.js frontend with real-time editor
- `packages/shared/` - Shared types and utilities
- `packages/evals/` - Evaluation utilities

### Key Technologies
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand
- **Editor**: @blocknote (documents), CodeMirror (code)
- **AI**: LangGraph, LangChain, multiple LLM providers (Claude, GPT, Gemini)
- **Auth/DB**: Supabase
- **Build**: Turbo, Yarn workspaces

### Agent Architecture
The agents directory contains specialized graphs:
- `open-canvas/` - Main agent orchestrating document/code operations
- `reflection/` - Memory and user preference management
- `summarizer/` - Document summarization
- `thread-title/` - Conversation title generation
- `web-search/` - Web search and scraping

Each agent is defined in `langgraph.json` and exposed as an API endpoint.

### Frontend Architecture
- Uses Next.js App Router with server/client components
- Canvas component handles document/code editing with version control
- Chat interface communicates with LangGraph agents via API
- Web workers handle heavy computations (e.g., markdown processing)

## Environment Configuration

Two `.env` files are required:
1. Root `.env` - Agent configuration (LLM API keys, LangSmith, Supabase)
2. `apps/web/.env` - Frontend configuration (feature flags, public keys)

Copy from `.env.example` files and configure required services.

## Authentication

Authentication is handled via Supabase with support for email/password and OAuth (Google/GitHub).

### Key Auth Files
- `lib/supabase/client.ts` - Browser client for frontend auth
- `lib/supabase/server.ts` - Server client for SSR/API routes
- `middleware.ts` - Route protection and session management
- `contexts/UserContext.tsx` - User state throughout the app

### Working with Authentication
- **Protected Routes**: Middleware automatically redirects unauthenticated users to `/auth/login`
- **API Routes**: Use `verifyUserAuthenticated()` to check auth before processing
- **Client Components**: Access user via `useUserContext()` hook
- **Server Components**: Use `createClient()` and `verifyUserAuthenticated()`

### Common Patterns
```typescript
// In API routes
const { user } = await verifyUserAuthenticated();
if (!user) return new Response("Unauthorized", { status: 401 });

// In client components
const { user, loading } = useUserContext();
if (!user) return <LoginPrompt />;

// User data filtering
const threads = await getThreadsByUser(user.id);
```

All user data is isolated by `supabase_user_id` ensuring secure multi-tenancy.

## Key Development Patterns

### Working with Agents
- Agent logic lives in `apps/agents/src/[agent-name]/`
- Each agent has a graph definition, prompts, and state management
- Use LangSmith for debugging agent execution

### Working with Frontend
- Components in `apps/web/src/components/`
- Canvas-related logic in `components/canvas/`
- State management with Zustand stores in `contexts/`
- API communication through `hooks/use-graph/`

### Adding New Features
1. For AI capabilities: Modify or create agents in `apps/agents/`
2. For UI changes: Work in `apps/web/src/components/`
3. For shared types: Update `packages/shared/`
4. Run `yarn build` from root after making cross-package changes

## Important Files
- `langgraph.json` - Defines all agent graphs and endpoints
- `apps/web/src/contexts/store.tsx` - Main application state
- `apps/agents/src/open-canvas/index.ts` - Core agent logic
- `apps/web/src/components/canvas/canvas.tsx` - Main editor component