# Google AI Studio Platform Guide

This document outlines the environment facts, constraints, and platform specifications for running and deploying applications within **Google AI Studio Build**.

---

## 1. Runtime & Sandbox Environment

- **Container Environment**: The application runs inside a Linux Cloud Run container.
- **Port 3000 Constraint**: Port `3000` is the **ONLY externally accessible port** through the platform's Nginx reverse proxy layer. All dev servers and production servers must bind to `0.0.0.0:3000`.
- **HMR Behavior**: Hot Module Replacement (HMR) is disabled by platform policy (`DISABLE_HMR=true`) to avoid unstable intermediate preview states while the agent edits files.
- **Live Preview**: The platform hosts a real-time preview iframe synced to the dev server on port 3000.

---

## 2. Application Types & Build Pipeline

### Client-Side SPA (Current Setup)
- **Framework**: Vite + React + TypeScript.
- **Build Command**: `npm run build` generates optimized production static assets into `/dist`.
- **Production Server**: In production deployments, AI Studio automatically injects a static file server to serve `/dist`. No custom Node or Express server is required.
- **`package.json` scripts**:
  - `"dev": "vite"` (binds to port 3000 via `vite.config.ts`)
  - `"build": "tsc -b && vite build"`
  - `"lint": "tsc --noEmit"`

---

## 3. Metadata & Frame Permissions

The root `metadata.json` file controls core applet settings:
```json
{
  "name": "EddiPRINCE",
  "description": "Personal digital archive and headquarters of EddiPRINCE — Creator, Builder, Learner, and Founder-in-progress. Building from scratch.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
```

### HTML Meta Synchronization Rules
Whenever `metadata.json` is modified:
- Update `<title>` and `<meta property="og:title">` in `index.html` to match.
- Update `<meta name="description">` and `<meta property="og:description">` in `index.html` to match.

---

## 4. Secret & Environment Variable Management

- **No Custom UI for Keys**: Never build custom user input forms for entering API keys or secrets unless explicitly requested.
- **Documentation**: All new environment variables must be declared in `.env.example`.
- **Client vs Server Secrets**:
  - Variables prefixed with `VITE_` are publicly accessible in client bundles.
  - Non-prefixed variables are strictly server-side.

---

## 5. Standard AI Studio Tooling

- `lint_applet`: Runs `npm run lint` (`tsc --noEmit`) for fast feedback.
- `compile_applet`: Runs `npm run build` to confirm production asset compilation.
- `restart_dev_server`: Reboots the Vite development server on port 3000.
