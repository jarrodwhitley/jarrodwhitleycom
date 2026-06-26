# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Contact Form Setup

The Music page contact form posts to the backend contact API and uses Google reCAPTCHA v2.

Create a local `.env` file and add:

- `VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key`
- `VITE_CONTACT_API_BASE_URL=https://your-backend-host.example`
- `VITE_CONTACT_API_PROXY_TARGET=http://localhost:3001`

Leave `VITE_CONTACT_API_BASE_URL` empty if the frontend and backend are served from the same origin.
Set `VITE_CONTACT_API_PROXY_TARGET` when running the frontend locally against a separate backend so `/api/contact` is proxied in Vite dev.
