# Portfolio Automation Workspace

A personal tool designed to work alongside the [aLxVa-portfolio](https://github.com/Douk1NG/aLxVa-portfolio) repository. Its main purpose is to let you modify your portfolio content, create CV files, and update your portfolio site automatically without doing it manually.

---

## 1. Setup

### Download the Portfolio Repository

Because this tool is intended to work with a specific portfolio structure, you must first clone the portfolio repository:

```bash
git clone https://github.com/Douk1NG/aLxVa-portfolio.git
```

### Prerequisites

This tool uses the [GitHub CLI (`gh`)](https://cli.github.com/) to update repository secrets and trigger deployments.

1. **Install GitHub CLI**: Install `gh` on your system (e.g., `winget install --id GitHub.cli` on Windows).
2. **Authenticate**: Run `gh auth login` and follow the prompts to authenticate with your GitHub account.

### Configure Environment Variables

You need to set up your environment variables. Copy `.env.example` to `.env` and fill in your values, making sure to set the path to the portfolio repository you just downloaded.

```bash
cp .env.example .env
```

### Set Up Your Profile File

The profile file is where your data will be saved. Copy the example file to create your own profile:

```bash
cp src/data/profile.example.json src/data/profile.json
```

_(Note: `profile.json` is gitignored so your personal data is kept local)._

---

## 2. Usage Guide

### Core Concepts

The tool provides a user-friendly interface to manage your portfolio content without manually editing code.

- **`profile.json`**: This is the single source of truth for your data, your changes are automatically saved when you change between sections or click the save button.

### Step-by-Step Workflow

1. **Start the Application**
   Run the development server (e.g., `npm run dev`) and open the provided localhost URL in your browser.

2. **Update Your Profile**
   Use the web interface to edit your personal information, experience, and projects. All changes are instantly persisted to `profile.json`.

3. **Generate Your CV (Optional but Recommended)**
   Click the **Generate CV** button to compile fresh, beautifully formatted PDF resumes from your latest profile data.

4. **Deploy Your Portfolio**
   When you're ready to publish, click the **Deploy** button. This fully automates the release process:
   - Reads your latest data from `profile.json`.
   - **Uploads CVs to Cloud Storage**: (Requires prior CV generation and valid cloud provider credentials in `.env`).
   - **Generates Data Files**: Creates `portfolio.private.json`, the core data source for your portfolio site.
   - **Processes Data**: Runs internal portfolio scripts to prepare the final site content.
   - **Updates GitHub Secrets**: Securely pushes the new data to the `PORTFOLIO_DATA` secret in your repository via the `gh` CLI. _(Note: This secret must be created beforehand)._
   - **Triggers Deployment**: Dispatches your GitHub Actions workflow (`gh workflow run`) to build and publish the live site. _(Note: Workflow name must be configured in `.env`)._

---

## 3. Improvements & Developer Guide

This section is for developers who want to add features, fix bugs, or understand the project architecture.

### Project Architecture

The workspace is divided into two main parts: the React UI (Vite) and the local Node.js automation server (Express).

```text
src/
├── components/        # React UI components (pure UI — no business logic)
├── hooks/             # Custom React hooks (all business logic lives here)
├── services/          # API calls to the local server & SSE streaming client
├── store/             # Zustand global state (UI state, data cache)
├── scripts/           # Node.js automation scripts (run via tsx)
│   ├── update-portfolio/  # Data mapping, GitHub Secrets updater, and deployment triggers
│   ├── generate-cv/       # LaTeX CV generation logic
│   └── workflow/          # Orchestrator (`orchestrator.ts`)
├── types/             # All TypeScript types, organized by domain
└── data/              # JSON files (profile.json, raw data)
server.ts              # Express server: endpoints that trigger scripts via `spawn`
```

### How It Works Under the Hood

1. The **UI** (React) reads/writes to `profile.json` using the local Express server endpoints.
2. The **Express Server** (`server.ts`) listens for actions (e.g., `/api/publish`) and spawns child processes running the TypeScript scripts in `src/scripts/` using `tsx`.
3. **SSE (Server-Sent Events)** stream the `stdout` from the running scripts directly back to the UI's console component so the user sees live logs.

### Adding a New Feature

**Example: Adding a new field (e.g., "Hobbies")**

1. **Types**: Add the new field to the global types in `src/types/`.
2. **UI**: Create a new form component in `src/components/sections/` and hook it up to the Zustand store.
3. **Scripts**: Update the mapper logic in `src/scripts/update-portfolio/utils/portfolio-mapper.ts` to include the new field in the `portfolio.private.json` data, which gets pushed as a GitHub Secret.

### Fixing Bugs

- **UI Bugs**: If the form or state isn't updating correctly, look in `src/hooks/` and `src/store/`. The components themselves should contain purely UI and layout logic.
- **Automation/Script Bugs**: If generation, LaTeX compilation, secret updating, or workflow triggering fails, look at the files in `src/scripts/`. You can run these scripts directly using `tsx` from your terminal to isolate the issue without the UI.
- **Server Bugs**: If the UI console says "Failed to fetch" or logs aren't streaming, check `server.ts`.

### Strict Code Conventions

When contributing, you must adhere strictly to these rules:

- **One component per file**: Extract all logic into a custom hook in `src/hooks/`.
- **No `any` or `unknown`**: TypeScript strict mode is enforced. No `as unknown as T` casts.
- **No `interface`**: Use only the `type` keyword for definitions.
- **No abbreviations**: Spell out all variable names, function names, and file names (e.g., avoid `btn`, `err`, `ctx`).
- **No barrel files**: Do not create or use `index.ts` files for re-exporting. Import directly from the source.
- **Keep files small**: Aim for under 150 lines. Split logic if it exceeds 200 lines.
- **Extract JSX**: Do not leave complex UI blocks inline. Extract them into named top-level components.
