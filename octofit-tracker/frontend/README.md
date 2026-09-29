# React + Vite

## Octofit API configuration

When running in Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Use the value of `CODESPACE_NAME` from the Codespaces terminal. Vite reads this variable when it starts, so restart the frontend after changing `.env.local`. The frontend uses `https://<name>-8000.app.github.dev/api/<resource>/` when configured. If it is unset, a forwarded Codespaces hostname is detected safely; local development falls back to `http://localhost:8000/api/<resource>/`.

Start the frontend with `npm --prefix octofit-tracker/frontend run dev`. Start the backend separately on port `8000`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
